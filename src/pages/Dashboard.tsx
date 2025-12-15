import { StatsCard } from '../components/dashboard/StatsCard'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Card
        title="Bienvenue sur votre tableau de bord"
        description="Surveillez les séances, les abonnements et les paiements en un coup d’œil."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm">
            Réserver une séance
          </Button>
          <Button variant="secondary" size="sm">
            Voir l'agenda
          </Button>
          <Button variant="ghost" size="sm">
            Contacter un coach
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Séances à venir" value="12" hint="Semaine en cours" />
        <StatsCard label="Prochaine séance" value="Jeu 14:00" hint="Coach Martin" />
        <StatsCard label="Crédits restants" value="18" hint="Plan Ultimate" />
        <StatsCard label="Revenus (mois)" value="12 400 €" hint="Données fictives" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Séances récentes">
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

        <Card title="Notifications">
          <div className="space-y-2 text-sm text-zinc-200">
            <div className="rounded-lg border border-white/5 bg-white/5 p-3">
              <div className="font-semibold text-white">Renouvellement abonnement</div>
              <div className="text-xs text-zinc-400">Votre plan Ultimate expire dans 3 jours.</div>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/5 p-3">
              <div className="font-semibold text-white">Nouvelle séance ajoutée</div>
              <div className="text-xs text-zinc-400">Coach Sarah a proposé un créneau Samedi 11:00.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

