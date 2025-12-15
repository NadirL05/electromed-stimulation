export default function Notifications() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Notifications</h1>
      <p className="text-sm text-zinc-400">
        Flux des notifications utilisateurs. Connectez Supabase (table notifications) pour afficher les alertes.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-zinc-300">Aucune notification pour le moment.</p>
      </div>
    </div>
  )
}



