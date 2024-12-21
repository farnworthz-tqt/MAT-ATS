'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for upcoming interviews
const mockInterviews = [
  { id: 1, candidateName: "John Doe", position: "Math Teacher", date: "2023-07-20", time: "10:00 AM" },
  { id: 2, candidateName: "Jane Smith", position: "Science Teacher", date: "2023-07-21", time: "2:00 PM" },
  { id: 3, candidateName: "Bob Johnson", position: "English Teacher", date: "2023-07-22", time: "11:00 AM" },
]

export default function InterviewerDashboard() {
  const [upcomingInterviews, setUpcomingInterviews] = useState(mockInterviews)

  useEffect(() => {
    // In a real application, you would fetch the interviewer's upcoming interviews here
    // setUpcomingInterviews(fetchedData)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Interviewer Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcomingInterviews.map((interview) => (
          <Card key={interview.id}>
            <CardHeader>
              <CardTitle>{interview.candidateName}</CardTitle>
              <CardDescription>{interview.position}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Date: {interview.date}</p>
              <p>Time: {interview.time}</p>
              <Link href={`/interviewer/interview/${interview.id}`} passHref>
                <Button className="mt-4">Prepare Interview</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/interviewer/schedule" passHref>
        <Button>Schedule New Interview</Button>
      </Link>
    </div>
  )
}

