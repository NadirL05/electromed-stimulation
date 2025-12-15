import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export default function Sessions() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Mes séances</h1>
        <p className="text-sm text-zinc-400">Séances planifiées. Connectez Supabase (table sessions) pour les données.</p>
      </div>

      <Card title="Séances à venir">
        <div className="space-y-3 text-sm text-zinc-200">
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3">
            <div>
              <div className="font-semibold text-white">Séance EMS - Coach Sarah</div>
              <div className="text-xs text-zinc-400">Aujourd'hui • 16:00 • 20 min</div>
            </div>
            <Badge variant="success">Confirmée</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3">
            <div>
              <div className="font-semibold text-white">Séance EMS - Coach Max</div>
              <div className="text-xs text-zinc-400">Demain • 10:00 • 20 min</div>
            </div>
            <Badge variant="warning">En attente</Badge>
          </div>
        </div>
      </Card>
    </div>
  )
}



