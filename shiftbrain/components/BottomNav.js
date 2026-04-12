import Link from 'next/link'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { id: 'shifts', label: 'Shifts', href: '/shifts', icon: CalendarIcon },
]

export default function BottomNav({ active }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-surface-800 border-t border-surface-700 safe-bottom">
      <div className="flex max-w-md mx-auto">
        {NAV_ITEMS.map(({ id, label, href, icon: Icon }) => {
          const isActive = active === id
          return (
            <Link
              key={id}
              href={href}
              className={`flex flex-col items-center gap-1 flex-1 py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-brand-500' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-500' : 'text-zinc-500'}`} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}
