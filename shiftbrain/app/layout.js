import './globals.css'

export const metadata = {
  title: 'ShiftBrain',
  description: 'Manage your shifts smarter',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  themeColor: '#0f0f11',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-surface-900 text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
