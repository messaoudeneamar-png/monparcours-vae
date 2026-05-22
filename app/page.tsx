export default function AccueilPage() {
  return (
    <div className="min-h-screen bg-background px-4 pt-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Bonjour 👋</h1>
        <p className="text-muted text-sm mt-1">Votre parcours VAE</p>
      </header>

      <section className="space-y-4">
        {/* Progression card */}
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">Progression globale</h2>
            <span className="text-accent font-bold text-lg">0%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div className="bg-accent h-2 rounded-full w-0 transition-all" />
          </div>
          <p className="text-muted text-xs mt-2">0 / 0 blocs complétés</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-accent/10 rounded-2xl p-4 border border-accent/20">
            <div className="w-8 h-8 bg-accent rounded-lg mb-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">Nouveau bloc</p>
          </div>
          <div className="bg-orange/10 rounded-2xl p-4 border border-orange/20">
            <div className="w-8 h-8 bg-orange rounded-lg mb-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">Continuer</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-surface rounded-2xl p-5 border border-border shadow-sm">
          <h2 className="font-semibold text-foreground mb-3">Activité récente</h2>
          <p className="text-muted text-sm text-center py-6">
            Aucune activité pour le moment
          </p>
        </div>
      </section>
    </div>
  );
}
