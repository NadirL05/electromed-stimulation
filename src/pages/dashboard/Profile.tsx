export default function Profile() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Profil</h1>
      <p className="text-sm text-zinc-400">
        Informations utilisateur. Connectez Supabase (table user_profiles) pour afficher et éditer les données.
      </p>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-zinc-300">Aucune donnée. Branchez Supabase pour afficher le profil.</p>
      </div>
    </div>
  )
}

