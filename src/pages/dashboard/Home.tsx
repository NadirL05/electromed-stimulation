export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/20 via-orange-500/5 to-zinc-900 p-6 shadow-xl shadow-orange-500/10">
        <h1 className="text-2xl font-bold text-white">Bienvenue sur ElectroMed</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Surveillez les franchises, les séances, les abonnements et les paiements en un coup d’œil.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Séances à venir', value: '12' },
          { label: 'Abonnements actifs', value: '48' },
          { label: 'Revenus (mois)', value: '12 400 €' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20"
          >
            <div className="text-sm text-zinc-400">{item.label}</div>
            <div className="text-2xl font-semibold text-white">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-semibold text-white">Activité récente</h2>
          <p className="mt-2 text-sm text-zinc-400">Connectez Supabase pour afficher les données en temps réel.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <p className="mt-2 text-sm text-zinc-400">Les notifications clients apparaîtront ici.</p>
        </div>
      </div>
    </div>
  )
}

