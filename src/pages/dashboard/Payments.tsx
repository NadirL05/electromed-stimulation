export default function Payments() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Paiements</h1>
      <p className="text-sm text-zinc-400">
        Suivi des paiements et intents Stripe. Connectez Supabase (table payments) pour afficher les transactions.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-zinc-300">Aucune donnée. Branchez Supabase pour afficher les paiements.</p>
      </div>
    </div>
  )
}



