import { Helmet } from 'react-helmet-async'

import { PageHeader } from '@/components/page-header'

export function ProjectsPage() {
  return (
    <>
      <Helmet title="Projetos" />

      <div className="flex flex-col gap-4">
        <PageHeader
          title="Projetos"
          subtitle="Crie e gerencie os seus projetos."
        />
      </div>
    </>
  )
}
