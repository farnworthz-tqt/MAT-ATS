'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { JobCard } from "@/components/JobCard"

// Mock data for available jobs
const availableJobs = [
  { 
    id: 1, 
    title: "Math Teacher", 
    department: "Education",
    location: "London",
    type: "Full-time",
    salary: "£30,000 - £45,000",
    closingDate: "2024-02-15",
    description: "We are seeking an enthusiastic Math Teacher to inspire and educate our students."
  },
  { 
    id: 2, 
    title: "Science Teacher", 
    department: "Education",
    location: "Manchester",
    type: "Full-time",
    salary: "£28,000 - £42,000",
    closingDate: "2024-01-25",
    description: "Join our team as a Science Teacher and help cultivate curiosity and scientific thinking in our students."
  },
  { 
    id: 3, 
    title: "English Teacher", 
    department: "Education",
    location: "Birmingham",
    type: "Full-time",
    salary: "£29,000 - £43,000",
    closingDate: "2024-01-20",
    description: "Looking for an experienced English Teacher to join our outstanding department."
  },
]

export default function CandidateJobs() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filteredJobs = availableJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleJobSelect = (id: number) => {
    console.log(`Applying for job with id: ${id}`)
    router.push(`/candidate/apply/${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Positions</h1>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <JobCard key={job.id} {...job} onSelect={handleJobSelect} />
        ))}
      </div>
    </div>
  )
}

