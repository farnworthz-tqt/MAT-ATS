import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                MAT ATS
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Button asChild variant="ghost">
              <Link href="/candidate-portal">Candidate Portal</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

