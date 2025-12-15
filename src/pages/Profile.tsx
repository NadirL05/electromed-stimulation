import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../stores/authStore'

export default function Profile() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Profil</h1>
        <p className="text-sm text-zinc-400">Informations utilisateur. Connectez Supabase (user_profiles) pour sauvegarder.</p>
      </div>

      <Card title="Informations" description="Modifiez vos informations et sauvegardez-les.">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nom complet" defaultValue={user?.full_name} placeholder="Votre nom" />
          <Input label="Email" defaultValue={user?.email} placeholder="email" disabled />
          <Input label="Téléphone" defaultValue={user?.phone} placeholder="+33..." />
          <Input label="Rôle" defaultValue={user?.role} disabled />
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Enregistrer</Button>
        </div>
      </Card>
    </div>
  )
}

