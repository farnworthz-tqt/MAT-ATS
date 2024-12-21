import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold">Zak Farnworth (2024)</div>
          <div className="flex gap-6">
            <Link href="#" className="text-[#1d70b8] hover:underline">
              Accessibility
            </Link>
            <Link href="#" className="text-[#1d70b8] hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#1d70b8] hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

