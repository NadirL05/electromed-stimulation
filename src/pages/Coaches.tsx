import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'

export default function Coaches() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Coachs</h1>
        <p className="text-sm text-zinc-400">Gestion des coachs. Connectez Supabase (table coaches) pour les données.</p>
      </div>

      <Card title="Équipe EMS">
        <div className="space-y-3 text-sm text-zinc-200">
          {[
            { name: 'Sarah Dupont', specialty: 'Perte de poids', status: 'Actif' },
            { name: 'Maxime Leroy', specialty: 'Renforcement', status: 'Actif' },
          ].map((coach) => (
            <div
              key={coach.name}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar name={coach.name} size="sm" />
                <div>
                  <div className="font-semibold text-white">{coach.name}</div>
                  <div className="text-xs text-zinc-400">{coach.specialty}</div>
                </div>
              </div>
              <Badge variant="success">{coach.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}



