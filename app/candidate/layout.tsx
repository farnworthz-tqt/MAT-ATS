'use client'

import Link from 'next/link'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Portal</h1>
          <nav className="mt-4">
            <ul className="flex items-center gap-1 rounded-lg bg-gray-50 p-1">
              <li>
                <Link
                  href="/candidate/profile"
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white hover:shadow-sm ${
                    pathname === '/candidate/profile' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate/jobs"
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white hover:shadow-sm ${
                    pathname === '/candidate/jobs' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

