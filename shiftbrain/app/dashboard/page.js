import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import StatsCard from '@/components/StatsCard'
import ShiftCard from '@/components/ShiftCard'

const UPCOMING_SHIFTS = [
  { id: 1, role: 'Barista', location: 'Main St. Cafe', date: 'Today', start: '08:00', end: '14:00', status: 'upcoming' },
  { id: 2, role: 'Supervisor', location: 'Main St. Cafe', date: 'Tomorrow', start: '10:00', end: '18:00', status: 'upcoming' },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-900">
      <Header title="Dashboard" />

      <main className="flex-1 px-4 pt-4 pb-24 max-w-md mx-auto w-full space-y-6">
        {/* Greeting */}
        <section>
          <p className="text-zinc-400 text-sm">Good morning 👋</p>
          <h2 className="text-xl font-bold text-white mt-0.5">Here's your week</h2>
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-3 gap-3">
          <StatsCard label="This week" value="32h" />
          <StatsCard label="Shifts" value="4" />
          <StatsCard label="Earnings" value="$480" highlight />
        </section>

        {/* Upcoming shifts */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Upcoming</h3>
          {UPCOMING_SHIFTS.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} />
          ))}
        </section>
      </main>

      <BottomNav active="dashboard" />
    </div>
  )
}
