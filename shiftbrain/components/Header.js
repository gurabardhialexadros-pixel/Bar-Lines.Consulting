import Link from 'next/link'

export default function Header({ title, action }) {
  return (
    <header className="sticky top-0 z-10 bg-surface-900/80 backdrop-blur border-b border-surface-700 px-4 py-4 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-brand-500 font-bold text-sm tracking-tight">ShiftBrain</span>
          <span className="text-zinc-600">/</span>
          <h1 className="text-white font-semibold text-sm">{title}</h1>
        </div>
        {action && (
          <Link
            href={action.href}
            className="text-sm text-brand-500 font-medium hover:text-brand-600 transition-colors"
          >
            {action.label}
          </Link>
        )}
      </div>
    </header>
  )
}
