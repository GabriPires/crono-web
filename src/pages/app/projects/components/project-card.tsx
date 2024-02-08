import { Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ProjectCardProps {
  projectId: string
  archived?: boolean
}

export function ProjectCard({ projectId, archived }: ProjectCardProps) {
  return (
    <Link to={`/projects/${projectId}`}>
      <Card
        data-archived={archived}
        className="data-[archived=true]:opacity-55"
      >
        <CardHeader className="flex-row justify-between">
          <div className="flex flex-col gap-1.5">
            <CardTitle>Project Title</CardTitle>
            <CardDescription>Project Description</CardDescription>
          </div>
          <Briefcase className="size-5" />
        </CardHeader>
      </Card>
    </Link>
  )
}
