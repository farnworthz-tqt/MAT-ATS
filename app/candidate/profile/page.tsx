'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    profilePicture: null as string | null,
    cv: null as File | null
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePicture: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile(prev => ({ ...prev, cv: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the profile data to your backend
    console.log('Profile data:', profile)
    alert('Profile updated successfully!')
  }

  const getInitials = () => {
    const firstInitial = profile.firstName ? profile.firstName[0].toUpperCase() : ''
    const lastInitial = profile.lastName ? profile.lastName[0].toUpperCase() : ''
    return firstInitial + lastInitial
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.profilePicture || ''} alt="Profile picture" />
                <AvatarFallback>
                  {profile.profilePicture ? 'Loading...' : getInitials()}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Picture
              </Button>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                aria-label="Upload profile picture"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={profile.firstName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name (Optional)</Label>
                <Input 
                  id="middleName" 
                  name="middleName" 
                  value={profile.middleName} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={profile.lastName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={profile.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="cv">Upload CV</Label>
              <Input 
                id="cv" 
                name="cv" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleCVUpload} 
              />
              {profile.cv && <p className="mt-2 text-sm text-gray-500">File uploaded: {profile.cv.name}</p>}
            </div>
            <Button type="submit">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

