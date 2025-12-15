interface StepperProps {
  steps: string[]
  current: number
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      {steps.map((step, index) => {
        const isActive = index === current
        const isDone = index < current
        return (
          <div key={step} className="flex items-center gap-2 text-sm">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                isActive
                  ? 'border-orange-500 bg-orange-500 text-zinc-900 shadow-orange-500/40'
                  : isDone
                    ? 'border-orange-500 text-orange-400'
                    : 'border-white/20 text-zinc-400'
              }`}
            >
              {index + 1}
            </div>
            <span className={`${isActive ? 'text-white' : 'text-zinc-400'}`}>{step}</span>
          </div>
        )
      })}
    </div>
  )
}

