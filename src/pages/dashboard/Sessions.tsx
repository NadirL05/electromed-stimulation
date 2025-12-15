export default function Sessions() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Séances</h1>
      <p className="text-sm text-zinc-400">Liste des séances planifiées. Connectez Supabase pour afficher les données.</p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-zinc-300">Aucune donnée. Branchez Supabase (table sessions) pour afficher les réservations.</p>
      </div>
    </div>
  )
}



