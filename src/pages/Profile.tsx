import { useState } from 'react'
import { User, Mail, Phone, Shield, Camera, CheckCircle2 } from 'lucide-react'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'

export default function Profile() {
  const { user } = useAuthStore()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mon profil</h1>
        <p className="mt-1 text-sm text-zinc-400">Gérez vos informations personnelles et vos préférences</p>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {/* Avatar */}
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-3xl font-bold text-white shadow-lg shadow-orange-500/25">
              {(user?.full_name || user?.email || 'U')[0].toUpperCase()}
            </div>
            <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-zinc-300 ring-4 ring-zinc-800 transition hover:bg-zinc-600">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-white">
              {user?.full_name || 'Utilisateur'}
            </h2>
            <p className="mt-0.5 text-sm text-zinc-400">{user?.email}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
                <Shield className="h-3 w-3" />
                {user?.role || 'client'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Compte vérifié
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal info */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
            <User className="h-5 w-5 text-orange-400" />
            Informations personnelles
          </h3>
          <div className="space-y-4">
            <Input 
              label="Nom complet" 
              defaultValue={user?.full_name || ''} 
              placeholder="Votre nom complet"
              variant="dark"
            />
            <Input 
              label="Téléphone" 
              defaultValue={user?.phone || ''} 
              placeholder="+33 6 12 34 56 78"
              variant="dark"
            />
          </div>
        </div>

        {/* Account info */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
            <Mail className="h-5 w-5 text-blue-400" />
            Informations du compte
          </h3>
          <div className="space-y-4">
            <Input 
              label="Email" 
              defaultValue={user?.email || ''} 
              disabled
              variant="dark"
              hint="L'email ne peut pas être modifié"
            />
            <Input 
              label="Rôle" 
              defaultValue={user?.role || 'client'} 
              disabled
              variant="dark"
            />
          </div>
        </div>

        {/* Contact preferences */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
            <Phone className="h-5 w-5 text-emerald-400" />
            Préférences de contact
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-xl bg-zinc-900/50 p-4">
              <div>
                <p className="font-medium text-white">Notifications email</p>
                <p className="text-xs text-zinc-500">Recevoir les rappels de séances</p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-zinc-600 bg-zinc-700 text-orange-500 focus:ring-orange-500" />
            </label>
            <label className="flex items-center justify-between rounded-xl bg-zinc-900/50 p-4">
              <div>
                <p className="font-medium text-white">Notifications SMS</p>
                <p className="text-xs text-zinc-500">Alertes importantes uniquement</p>
              </div>
              <input type="checkbox" className="h-5 w-5 rounded border-zinc-600 bg-zinc-700 text-orange-500 focus:ring-orange-500" />
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-white/5 bg-zinc-800/50 p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
            <Shield className="h-5 w-5 text-purple-400" />
            Sécurité
          </h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Mot de passe</p>
                  <p className="text-xs text-zinc-500">Dernière modification il y a 3 mois</p>
                </div>
                <Button variant="ghost" size="sm" className="text-orange-400">
                  Modifier
                </Button>
              </div>
            </div>
            <div className="rounded-xl bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Authentification 2FA</p>
                  <p className="text-xs text-zinc-500">Non activée</p>
                </div>
                <Button variant="ghost" size="sm" className="text-orange-400">
                  Activer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center justify-end gap-4">
        {saved && (
          <span className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Modifications enregistrées
          </span>
        )}
        <Button variant="secondary">Annuler</Button>
        <Button onClick={handleSave}>
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}

