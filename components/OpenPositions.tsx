import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function OpenPositions({ positions }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Open Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {positions.map((job) => (
            <li key={job.id} className="mb-2">
              <div className="font-semibold">{job.title}</div>
              <div className="text-sm text-gray-500">{job.department}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

