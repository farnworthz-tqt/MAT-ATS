'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function CandidateLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      // Here you would typically validate the credentials against your backend
      // For now, we'll just simulate a login process
      if (email === 'candidate@example.com' && password === 'password') {
        // Successful login
        router.push('/candidate/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Candidate Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your application status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button className="w-full" type="submit">Sign In</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Link href="/candidate/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
          <div className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/candidate/register" className="text-blue-600 hover:underline">
              Apply for a position
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

