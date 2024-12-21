'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock data for an interview
const mockInterview = {
  id: 1,
  candidateName: "John Doe",
  position: "Math Teacher",
  date: "2023-07-20",
  time: "10:00 AM",
  questions: [
    "Can you describe your teaching philosophy?",
    "How do you handle difficult students?",
    "What strategies do you use to make math engaging for students?",
  ],
  notes: "",
}

export default function InterviewPreparation() {
  const params = useParams()
  const [interview, setInterview] = useState(mockInterview)
  const [newQuestion, setNewQuestion] = useState("")

  useEffect(() => {
    // In a real application, you would fetch the interview details here
    // const fetchedInterview = await fetchInterview(params.id)
    // setInterview(fetchedInterview)
  }, [params.id])

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setInterview(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion.trim()]
      }))
      setNewQuestion("")
    }
  }

  const updateNotes = (notes: string) => {
    setInterview(prev => ({ ...prev, notes }))
  }

  const confirmJobOffer = () => {
    // In a real application, you would send this confirmation to your backend
    alert("Job offer confirmed for " + interview.candidateName)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Interview Preparation</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>{interview.candidateName} - {interview.position}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date: {interview.date}</p>
          <p>Time: {interview.time}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {interview.questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <Label htmlFor="newQuestion">Add a new question:</Label>
            <Input
              id="newQuestion"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter a new question"
            />
            <Button onClick={addQuestion}>Add Question</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interview Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={interview.notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Enter your interview notes here"
            rows={5}
          />
        </CardContent>
      </Card>

      <Button onClick={confirmJobOffer}>Confirm Job Offer</Button>
    </div>
  )
}

