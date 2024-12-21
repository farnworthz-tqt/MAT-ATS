'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ScheduleInterview() {
  const router = useRouter()
  const [interviewDetails, setInterviewDetails] = useState({
    candidateName: "",
    position: "",
    date: "",
    time: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInterviewDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setInterviewDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Scheduling interview:", interviewDetails)
    alert("Interview scheduled successfully!")
    router.push('/interviewer/dashboard')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Schedule Interview</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Interview Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="candidateName">Candidate Name</Label>
              <Input
                id="candidateName"
                name="candidateName"
                value={interviewDetails.candidateName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select name="position" onValueChange={handleSelectChange("position")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math-teacher">Math Teacher</SelectItem>
                  <SelectItem value="science-teacher">Science Teacher</SelectItem>
                  <SelectItem value="english-teacher">English Teacher</SelectItem>
                  <SelectItem value="school-administrator">School Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={interviewDetails.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={interviewDetails.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Schedule Interview</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

