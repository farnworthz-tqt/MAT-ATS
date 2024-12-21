'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, AlertTriangle } from 'lucide-react'
import { cn } from "@/lib/utils"

// Mock data for available jobs with future dates
const availableJobs = [
  { 
    id: 1, 
    title: "Math Teacher", 
    department: "Education",
    location: "London",
    type: "Full-time",
    salary: "£30,000 - £45,000",
    closingDate: "2024-02-15", // Updated to future date
    description: "We are seeking an enthusiastic Math Teacher to inspire and educate our students."
  },
  { 
    id: 2, 
    title: "Science Teacher", 
    department: "Education",
    location: "Manchester",
    type: "Full-time",
    salary: "£28,000 - £42,000",
    closingDate: "2024-01-25", // Updated to future date
    description: "Join our team as a Science Teacher and help cultivate curiosity and scientific thinking in our students."
  },
  { 
    id: 3, 
    title: "English Teacher", 
    department: "Education",
    location: "Birmingham",
    type: "Full-time",
    salary: "£29,000 - £43,000",
    closingDate: "2024-01-20", // Closing soon
    description: "Looking for an experienced English Teacher to join our outstanding department."
  },
]

export default function CandidateJobs() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const getJobStatus = (closingDate: string) => {
    const today = new Date()
    const closing = new Date(closingDate)
    const diffTime = closing.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { type: 'expired', days: 0, display: 'Expired' }
    }
    if (diffDays === 0) {
      return { type: 'closing-today', days: 0, display: 'Closing Today' }
    }
    if (diffDays === 1) {
      return { type: 'urgent', days: 1, display: '1 day remaining' }
    }
    if (diffDays <= 7) {
      return { type: 'urgent', days: diffDays, display: `${diffDays} days remaining` }
    }
    return { type: 'normal', days: diffDays, display: `${diffDays} days remaining` }
  }

  const filteredJobs = availableJobs
    .filter(job => {
      // Filter out expired jobs
      const status = getJobStatus(job.closingDate)
      return status.type !== 'expired'
    })
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleApply = (id: number) => {
    console.log(`Applying for job with id: ${id}`)
    router.push(`/candidate/apply/${id}`)
  }

  const StatusBadge = ({ closingDate }: { closingDate: string }) => {
    const status = getJobStatus(closingDate)
    return (
      <div className={cn(
        "flex items-center gap-2 rounded-full px-3 py-1 text-sm",
        status.type === 'urgent' && "bg-red-100 text-red-700",
        status.type === 'closing-today' && "bg-orange-100 text-orange-700",
        status.type === 'normal' && "bg-blue-100 text-blue-700"
      )}>
        {status.type === 'urgent' ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <Clock className="h-4 w-4" />
        )}
        {status.display}
      </div>
    )
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
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-600">No active positions found</h2>
          <p className="text-gray-500 mt-2">Please check back later for new opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="mb-2">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{job.department}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-500 mb-4">{job.description}</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Location:</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Salary:</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <StatusBadge closingDate={job.closingDate} />
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button 
                  onClick={() => handleApply(job.id)} 
                  className="w-full"
                  variant={getJobStatus(job.closingDate).type === 'urgent' ? "destructive" : "default"}
                >
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

