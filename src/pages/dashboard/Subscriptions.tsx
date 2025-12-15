export default function Subscriptions() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Abonnements</h1>
      <p className="text-sm text-zinc-400">
        Abonnements actifs et crédits restants. Connectez Supabase (table subscriptions) pour les données réelles.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-zinc-300">Aucune donnée. Branchez Supabase pour lister les abonnements.</p>
      </div>
    </div>
  )
}



