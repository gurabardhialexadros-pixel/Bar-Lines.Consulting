const STATUS_STYLES = {
  upcoming: 'bg-brand-500/10 text-brand-500',
  completed: 'bg-zinc-700/50 text-zinc-400',
}

export default function ShiftCard({ shift }) {
  const { role, location, date, start, end, status } = shift
  const duration = calcDuration(start, end)

  return (
    <div className="bg-surface-800 border border-surface-700 rounded-2xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-white text-sm">{role}</p>
          <p className="text-zinc-500 text-xs mt-0.5">{location}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[status] ?? STATUS_STYLES.upcoming}`}>
          {status}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-zinc-400">
        <span>{date}</span>
        <span className="text-zinc-600">•</span>
        <span>{start} – {end}</span>
        <span className="text-zinc-600">•</span>
        <span>{duration}</span>
      </div>
    </div>
  )
}

function calcDuration(start, end) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const mins = (eh * 60 + em) - (sh * 60 + sm)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
