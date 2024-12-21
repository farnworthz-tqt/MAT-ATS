'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export default function CandidateProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: 'John Doe',
    address: '123 Main St',
    town: 'London',
    postcode: 'SW1A 1AA',
    phone: '07700 900000',
    email: 'john.doe@example.com',
    dob: '1990-01-01',
    nin: 'AB 12 34 56 C',
    qualifiedToWorkInUK: 'Yes',
    hasDrivingLicence: 'Yes',
    photo: '/placeholder.svg'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string) => (value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfile(prev => ({ ...prev, photo: event.target.result as string }))
        }
      }
      reader.onerror = (error) => {
        console.error('Error reading file:', error)
        // Optionally, you can set an error state here to show to the user
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile)
    // Simulate a successful update
    alert('Profile updated successfully!')
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Candidate Profile</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and photo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.photo} alt="Profile photo" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-auto"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={profile.phone} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" name="dob" type="date" value={profile.dob} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={profile.address} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="town">Town</Label>
                <Input id="town" name="town" value={profile.town} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input id="postcode" name="postcode" value={profile.postcode} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="nin">National Insurance Number</Label>
                <Input id="nin" name="nin" value={profile.nin} onChange={handleInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="qualifiedToWorkInUK"
                checked={profile.qualifiedToWorkInUK === 'Yes'}
                onCheckedChange={(checked) =>
                  setProfile(prev => ({ ...prev, qualifiedToWorkInUK: checked ? 'Yes' : 'No' }))
                }
              />
              <Label htmlFor="qualifiedToWorkInUK">Qualified to work in the UK</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasDrivingLicence"
                checked={profile.hasDrivingLicence === 'Yes'}
                onCheckedChange={(checked) =>
                  setProfile(prev => ({ ...prev, hasDrivingLicence: checked ? 'Yes' : 'No' }))
                }
              />
              <Label htmlFor="hasDrivingLicence">Have a driving licence and own a car</Label>
            </div>
          </CardContent>
        </Card>

        <CardFooter>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </div>
  )
}

