'use client'

import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidate Portal</h1>
            <Image 
              src="/placeholder.svg?height=50&width=100"
              alt="Trust Logo" 
              width={100} 
              height={50}
              className="hidden sm:block"
              priority
            />
          </div>
          <nav className="mt-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/candidate/jobs" className="text-gray-600 hover:text-gray-900">Jobs</Link>
              </li>
              <li>
                <Link href="/candidate/dashboard" className="text-gray-600 hover:text-gray-900">My Applications</Link>
              </li>
              <li>
                <Link href="/candidate/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
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
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2023 MAT Recruitment ATS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

