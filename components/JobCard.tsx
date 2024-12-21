import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react'

export interface JobCardProps {
  id: number
  title: string
  department: string
  location: string
  type: string
  salary: string
  closingDate: string
  description: string
  onSelect: (id: number) => void
}

export function JobCard({ 
  id, 
  title, 
  department, 
  location, 
  type, 
  salary, 
  closingDate, 
  description, 
  onSelect 
}: JobCardProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl mb-1">{title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{department}</Badge>
          <Badge variant="outline">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center col-span-2">
            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span>Closing: {closingDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelect(id)} className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  )
}

