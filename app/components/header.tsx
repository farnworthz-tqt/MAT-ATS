'use client'

import { useState } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#1d70b8] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>ZF</AvatarFallback>
            </Avatar>
            <span className="font-bold">Zak Farnworth</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:text-white/90" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="ml-2">Menu</span>
            </Button>
            <Link href="/search">
              <Button variant="ghost" className="text-white hover:text-white/90">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#1d70b8] z-50 flex flex-col">
          <div className="container mx-auto px-4 py-4 flex justify-end">
            <Button variant="ghost" className="text-white hover:text-white/90" onClick={() => setIsMenuOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-grow flex items-center justify-center">
            <ul className="space-y-6 text-center">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-2xl font-bold text-white hover:text-white/90",
                      pathname === item.href && "underline"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

