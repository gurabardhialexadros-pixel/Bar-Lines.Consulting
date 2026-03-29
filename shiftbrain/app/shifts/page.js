'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import BottomNav from '@/components/BottomNav'
import ShiftCard from '@/components/ShiftCard'

const ALL_SHIFTS = [
  { id: 1, role: 'Barista', location: 'Main St. Cafe', date: 'Mon Mar 25', start: '08:00', end: '14:00', status: 'completed' },
  { id: 2, role: 'Supervisor', location: 'Main St. Cafe', date: 'Wed Mar 27', start: '10:00', end: '18:00', status: 'completed' },
  { id: 3, role: 'Barista', location: 'Main St. Cafe', date: 'Today', start: '08:00', end: '14:00', status: 'upcoming' },
  { id: 4, role: 'Supervisor', location: 'Main St. Cafe', date: 'Tomorrow', start: '10:00', end: '18:00', status: 'upcoming' },
  { id: 5, role: 'Barista', location: 'Downtown Branch', date: 'Sat Mar 29', start: '09:00', end: '15:00', status: 'upcoming' },
]

const FILTERS = ['All', 'Upcoming', 'Completed']

export default function ShiftsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = ALL_SHIFTS.filter((s) => {
    if (activeFilter === 'All') return true
    return s.status === activeFilter.toLowerCase()
  })

  return (
    <div className="flex flex-col min-h-screen bg-surface-900">
      <Header title="Shifts" action={{ label: '+ Add', href: '#' }} />

      <main className="flex-1 px-4 pt-4 pb-24 max-w-md mx-auto w-full space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-brand-500 text-white'
                  : 'bg-surface-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Shift list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-12">No shifts found.</p>
          ) : (
            filtered.map((shift) => <ShiftCard key={shift.id} shift={shift} />)
          )}
        </div>
      </main>

      <BottomNav active="shifts" />
    </div>
  )
}
