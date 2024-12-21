'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, ClockIcon } from 'lucide-react'
import Link from 'next/link'

// Mock data for the candidate's applications
const mockApplications = [
  {
    id: 1,
    jobTitle: "Math Teacher",
    status: "Under Review",
    submittedDate: "2023-07-01",
    lastUpdated: "2023-07-15",
    nextSteps: "Wait for interview invitation",
    progress: 40,
  },
  {
    id: 2,
    jobTitle: "Science Teacher",
    status: "Interview Scheduled",
    submittedDate: "2023-06-15",
    lastUpdated: "2023-07-10",
    nextSteps: "Attend interview on 2023-07-20",
    progress: 60,
  },
]

export default function CandidateDashboard() {
  const [applications, setApplications] = useState(mockApplications)

  useEffect(() => {
    // In a real application, you would fetch the candidate's applications data here
    // setApplications(fetchedData)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">My Applications</h2>
      
      {applications.map((application) => (
        <Card key={application.id}>
          <CardHeader>
            <CardTitle>{application.jobTitle}</CardTitle>
            <CardDescription>Submitted on {application.submittedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Badge variant={application.status === "Under Review" ? "secondary" : "default"}>
                {application.status}
              </Badge>
              <span className="text-sm text-muted-foreground">Last updated: {application.lastUpdated}</span>
            </div>
            <Progress value={application.progress} className="mb-2" />
            <p className="text-sm text-muted-foreground mb-4">Application Progress: {application.progress}%</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-semibold">Next Steps:</span>
              </div>
              <p>{application.nextSteps}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Link href="/candidate/jobs" passHref>
        <Button as="a">View More Job Openings</Button>
      </Link>
    </div>
  )
}

