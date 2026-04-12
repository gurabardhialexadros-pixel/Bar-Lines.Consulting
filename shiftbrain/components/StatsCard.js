export default function StatsCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl p-3 flex flex-col gap-1 ${
        highlight
          ? 'bg-brand-500/10 border border-brand-500/20'
          : 'bg-surface-800 border border-surface-700'
      }`}
    >
      <p className={`text-xs font-medium ${highlight ? 'text-brand-500' : 'text-zinc-400'}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${highlight ? 'text-brand-500' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
