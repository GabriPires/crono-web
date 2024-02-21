import { Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Project } from '@/api/projects/get-user-projects'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ProjectCardProps {
  project: Project
  archived?: boolean
}

export function ProjectCard({ project, archived }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card
        data-archived={archived}
        className="data-[archived=true]:opacity-55"
      >
        <CardHeader className="flex-row justify-between">
          <div className="flex flex-col gap-1.5">
            <CardTitle>{project.name}</CardTitle>
            {project.description.length > 0 && (
              <CardDescription>{project.description}</CardDescription>
            )}
          </div>
          <Briefcase className="size-5" />
        </CardHeader>
      </Card>
    </Link>
  )
}
