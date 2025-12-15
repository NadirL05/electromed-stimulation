// Edge Function Supabase : Création d'utilisateur coach
// Cette fonction permet aux franchise_owner et admin de créer des comptes coachs
// avec authentification complète et insertion dans la table coaches

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreateCoachRequest {
  email: string
  password: string
  full_name: string
  phone?: string
  bio?: string
  specialties?: string[]
  availability?: Record<string, string[]>
  franchise_id: string
}

serve(async (req) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Récupérer le token d'authentification depuis les headers
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Token d\'authentification manquant' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialiser le client Supabase avec la service role key (accès admin)
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Variables d\'environnement Supabase manquantes')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Vérifier que l'utilisateur est authentifié et a les permissions
    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Token invalide ou expiré' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Vérifier que l'utilisateur est franchise_owner ou admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Profil utilisateur non trouvé' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const userRole = profile.role
    if (userRole !== 'franchise_owner' && userRole !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Permissions insuffisantes. Seuls les franchise_owner et admin peuvent créer des coachs.' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Parser le body de la requête
    let body: CreateCoachRequest
    try {
      body = await req.json()
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Body JSON invalide' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Vérifier que la franchise appartient bien à l'utilisateur (si franchise_owner)
    if (userRole === 'franchise_owner') {
      const { data: franchise, error: franchiseError } = await supabaseAdmin
        .from('franchises')
        .select('id, owner_id')
        .eq('id', body.franchise_id)
        .single()

      if (franchiseError || !franchise) {
        return new Response(
          JSON.stringify({ error: 'Franchise non trouvée' }),
          {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }

      if (franchise.owner_id !== user.id) {
        return new Response(
          JSON.stringify({ error: 'Vous n\'êtes pas propriétaire de cette franchise' }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
    }

    // Validation des données requises
    if (!body.email || !body.password || !body.full_name || !body.franchise_id) {
      return new Response(
        JSON.stringify({
          error: 'Données manquantes : email, password, full_name et franchise_id sont requis',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Vérifier si l'email existe déjà
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const emailExists = existingUser.users.some((u) => u.email === body.email)

    if (emailExists) {
      return new Response(
        JSON.stringify({ error: 'Cet email est déjà utilisé' }),
        {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Créer l'utilisateur dans Supabase Auth
    const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true, // Confirmer automatiquement l'email
      user_metadata: {
        full_name: body.full_name,
        role: 'coach',
      },
    })

    if (createUserError || !newUser.user) {
      console.error('Erreur création utilisateur:', createUserError)
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la création de l\'utilisateur',
          details: createUserError?.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const userId = newUser.user.id

    // Le trigger handle_new_user() devrait créer automatiquement le profil
    // Mais on s'assure qu'il existe avec un upsert
    const { error: profileUpsertError } = await supabaseAdmin
      .from('user_profiles')
      .upsert(
        {
          id: userId,
          email: body.email,
          full_name: body.full_name,
          phone: body.phone || null,
          role: 'coach',
        },
        { onConflict: 'id' }
      )

    if (profileUpsertError) {
      console.error('Erreur création profil:', profileUpsertError)
      // Nettoyer l'utilisateur créé si le profil échoue
      await supabaseAdmin.auth.admin.deleteUser(userId)
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la création du profil',
          details: profileUpsertError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Créer l'entrée dans la table coaches
    const { data: coach, error: coachError } = await supabaseAdmin
      .from('coaches')
      .insert({
        user_id: userId,
        franchise_id: body.franchise_id,
        bio: body.bio || null,
        specialties: body.specialties || [],
        availability: body.availability || {},
        is_active: true,
      })
      .select()
      .single()

    if (coachError || !coach) {
      console.error('Erreur création coach:', coachError)
      // Nettoyer l'utilisateur et le profil si la création du coach échoue
      await supabaseAdmin.auth.admin.deleteUser(userId)
      return new Response(
        JSON.stringify({
          error: 'Erreur lors de la création de l\'entrée coach',
          details: coachError?.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Retourner le succès avec l'ID du coach créé
    return new Response(
      JSON.stringify({
        success: true,
        coach_id: coach.id,
        user_id: userId,
        message: 'Coach créé avec succès',
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Erreur inattendue:', error)
    return new Response(
      JSON.stringify({
        error: 'Erreur serveur',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

