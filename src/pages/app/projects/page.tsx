import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getUserArchivedProjects } from '@/api/projects/get-user-archived-projects'
import { getUserProjects } from '@/api/projects/get-user-projects'
import { PageHeader } from '@/components/page-header'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import { CreateProjectDialog } from './components/create-project-dialog'
import { ProjectCard } from './components/project-card'

export function ProjectsPage() {
  const [isArchivedOpen, setIsArchivedOpen] = useState(false)

  const { data: projectData, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['user-projects'],
    queryFn: getUserProjects,
  })

  const { data: archivedProjectData, isLoading: isLoadingArchivedProjects } =
    useQuery({
      queryKey: ['user-archived-projects'],
      queryFn: getUserArchivedProjects,
      enabled: isArchivedOpen,
    })

  return (
    <>
      <Helmet title="Projetos" />

      <div className="flex flex-col gap-4">
        <PageHeader
          title="Projetos"
          subtitle="Crie e gerencie os seus projetos."
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-medium">Projetos ativos</h2>
            <CreateProjectDialog />
          </div>

          {isLoadingProjects &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-[98px]" />
            ))}
          {projectData?.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {!projectData?.projects.length && !isLoadingProjects && (
            <span className="text-sm text-muted-foreground">
              Nenhum projeto encontrado.
            </span>
          )}
        </div>

        <Separator />

        <Collapsible open={isArchivedOpen} onOpenChange={setIsArchivedOpen}>
          <CollapsibleTrigger className="flex group w-full items-center justify-between ">
            <h2 className="text-lg font-medium">Projetos arquivados</h2>
            <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-4 mt-4">
              {isLoadingArchivedProjects &&
                Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-[98px]" />
                ))}
              {archivedProjectData?.projects.map((project) => (
                <ProjectCard key={project.id} project={project} archived />
              ))}
              {!archivedProjectData?.projects.length &&
                !isLoadingArchivedProjects && (
                  <span className="text-sm text-muted-foreground">
                    Nenhum projeto arquivado.
                  </span>
                )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
