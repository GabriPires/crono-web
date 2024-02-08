import { ChevronDown } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

import { ProjectCard } from './components/project-card'

export function ProjectsPage() {
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
            <Button variant="outline">Criar projeto</Button>
          </div>

          {Array.from({ length: 5 }).map((_, index) => (
            <ProjectCard key={index} projectId={String(index)} />
          ))}
        </div>

        <Separator />

        <Collapsible>
          <CollapsibleTrigger className="flex group w-full items-center justify-between ">
            <h2 className="text-lg font-medium">Projetos arquivados</h2>
            <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-4 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <ProjectCard key={index} projectId={String(index)} archived />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  )
}
