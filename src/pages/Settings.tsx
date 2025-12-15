import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

export default function Settings() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Paramètres</h1>
        <p className="text-sm text-zinc-400">Personnalisez vos préférences. Connectez Supabase pour les sauvegarder.</p>
      </div>

      <Card title="Notifications" description="Activez/désactivez les notifications.">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Email de notification" placeholder="email@exemple.com" />
          <Input label="Téléphone (SMS)" placeholder="+33..." />
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="primary">Enregistrer</Button>
        </div>
      </Card>
    </div>
  )
}

