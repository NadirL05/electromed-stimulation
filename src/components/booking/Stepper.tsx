import { Check } from 'lucide-react'

interface StepperProps {
  steps: string[]
  current: number
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute left-0 top-5 h-0.5 w-full bg-zinc-800">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500"
          style={{ width: `${(current / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === current
          const isDone = index < current
          return (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/40'
                    : isDone
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-500'
                }`}
              >
                {isDone ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className={`mt-2 text-xs font-medium transition-colors ${
                isActive ? 'text-orange-400' : isDone ? 'text-zinc-300' : 'text-zinc-600'
              }`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

