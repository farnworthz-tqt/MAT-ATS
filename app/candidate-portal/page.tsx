'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { JobCard } from "@/components/JobCard"
import { SearchIcon } from 'lucide-react'

// Mock data for available jobs
const availableJobs = [
  { 
    id: 1, 
    title: "Math Teacher", 
    logo: "/placeholder.svg?height=100&width=100", 
    startDate: "2023-09-01", 
    applyByDate: "2023-07-15",
    location: "London",
    department: "Education",
    description: "We are seeking an enthusiastic Math Teacher to inspire and educate our students. The ideal candidate will have a passion for mathematics and the ability to make complex concepts accessible to learners of all levels."
  },
  { 
    id: 2, 
    title: "Science Teacher", 
    logo: "/placeholder.svg?height=100&width=100", 
    startDate: "2023-09-01", 
    applyByDate: "2023-07-20",
    location: "Manchester",
    department: "Education",
    description: "Join our team as a Science Teacher and help cultivate curiosity and scientific thinking in our students. We're looking for someone who can bring science to life through engaging experiments and real-world applications."
  },
  { 
    id: 3, 
    title: "English Teacher", 
    logo: "/placeholder.svg?height=100&width=100", 
    startDate: "2023-09-01", 
    applyByDate: "2023-07-25",
    location: "Birmingham",
    department: "Education",
    description: "We're seeking an English Teacher to foster a love of literature and develop strong communication skills in our students. The ideal candidate will be passionate about both classic and contemporary literature."
  },
  { 
    id: 4, 
    title: "School Administrator", 
    logo: "/placeholder.svg?height=100&width=100", 
    startDate: "2023-08-15", 
    applyByDate: "2023-07-10",
    location: "Leeds",
    department: "Administration",
    description: "We're looking for a detail-oriented School Administrator to help ensure the smooth running of our school. The ideal candidate will have excellent organizational skills and a proactive approach to problem-solving."
  },
]

export default function CandidatePortal() {
  const [step, setStep] = useState(1)
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cv: null as File | null,
  })

  const filteredJobs = availableJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleJobSelect = (id: number) => {
    setSelectedJob(id)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, jobId: selectedJob })
    // Here you would typically send the data to your backend
    alert('Application submitted successfully!')
    setStep(1)
    setSelectedJob(null)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      cv: null,
    })
  }

  return (
    <div className="container mx-auto p-6">
      {step === 1 && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Explore Open Positions</h1>
          <div className="mb-6 relative">
            <Input
              type="text"
              placeholder="Search for jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} {...job} onSelect={handleJobSelect} />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Candidate Application</CardTitle>
            <CardDescription>
              Applying for: {availableJobs.find(job => job.id === selectedJob)?.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Home Address</Label>
                  <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="cv">Upload CV</Label>
                  <Input id="cv" name="cv" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back to Job Selection</Button>
            <Button onClick={handleSubmit}>Submit Application</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

