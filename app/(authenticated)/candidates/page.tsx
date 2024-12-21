'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for candidates
const initialCandidates = [
  { id: 1, name: 'John Doe', email: 'john@example.com', appliedFor: 'Math Teacher', status: 'Reviewing' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', appliedFor: 'Science Teacher', status: 'Interviewed' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', appliedFor: 'School Administrator', status: 'Offered' },
]

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [filter, setFilter] = useState('')

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(filter.toLowerCase()) ||
    candidate.email.toLowerCase().includes(filter.toLowerCase()) ||
    candidate.appliedFor.toLowerCase().includes(filter.toLowerCase())
  )

  const updateCandidateStatus = (id: number, newStatus: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    ))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Candidates</h1>
      
      <div className="mb-4">
        <Input
          placeholder="Search candidates..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Applied For</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCandidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.appliedFor}</TableCell>
              <TableCell>{candidate.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Update Status</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update Candidate Status</DialogTitle>
                      <DialogDescription>
                        Change the status for {candidate.name}
                      </DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={(value) => updateCandidateStatus(candidate.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reviewing">Reviewing</SelectItem>
                        <SelectItem value="Interviewed">Interviewed</SelectItem>
                        <SelectItem value="Offered">Offered</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <DialogFooter>
                      <Button type="submit">Update Status</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

