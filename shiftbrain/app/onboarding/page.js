'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
  {
    id: 1,
    title: 'Welcome to ShiftBrain',
    description: 'The smarter way to manage, track, and plan your work shifts.',
    icon: '🧠',
  },
  {
    id: 2,
    title: 'Track Every Shift',
    description: 'Log start/end times, breaks, and notes — all in one place.',
    icon: '⏱️',
  },
  {
    id: 3,
    title: 'Stay in Control',
    description: 'See your schedule at a glance and never miss a shift again.',
    icon: '📅',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  function handleNext() {
    if (isLast) {
      router.push('/dashboard')
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-6 py-12 max-w-md mx-auto">
      {/* Logo */}
      <div className="text-brand-500 font-bold text-xl tracking-tight">ShiftBrain</div>

      {/* Card */}
      <div className="flex flex-col items-center text-center gap-6 flex-1 justify-center">
        <div className="text-7xl">{current.icon}</div>
        <h1 className="text-2xl font-bold text-white">{current.title}</h1>
        <p className="text-zinc-400 text-base leading-relaxed">{current.description}</p>
      </div>

      {/* Step dots */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-brand-500' : 'w-2 bg-surface-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold py-4 rounded-2xl transition-colors text-base"
        >
          {isLast ? 'Get Started' : 'Continue'}
        </button>

        {!isLast && (
          <button
            onClick={() => router.push('/dashboard')}
            className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </main>
  )
}
