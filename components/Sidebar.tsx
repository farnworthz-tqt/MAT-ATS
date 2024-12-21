import Link from "next/link"
import { Home, Briefcase, Users, Settings } from 'lucide-react'

const navItems = [
  { name: "Dashboard", href: "/admin-dashboard", icon: Home },
  { name: "Manage Jobs", href: "/admin/manage-jobs", icon: Briefcase },
  { name: "Candidates", href: "/admin/candidates", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold text-lg">MAT ATS Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center p-2 text-base font-normal text-gray-300 rounded-lg hover:bg-gray-700"
              >
                <item.icon className="w-6 h-6" />
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

