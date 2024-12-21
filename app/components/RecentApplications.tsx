import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecentApplications({ applications }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {applications.map((app) => (
            <li key={app.id} className="mb-2">
              <div className="font-semibold">{app.applicant.name}</div>
              <div className="text-sm text-gray-500">{app.job.title}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

