import { Helmet } from 'react-helmet-async'

import { PageHeader } from '@/components/page-header'

import { DaysWorkedAmountCard } from './components/days-worked-card'
import { HoursWorkedAmountCard } from './components/hours-worked-card'
import { MonthProjectsAmountCard } from './components/month-projects-amount-card'
import { MonthRevenueCard } from './components/month-revenue-card'

export function DashboardPage() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <PageHeader
          title="Dashboard"
          subtitle="Veja o desempenho do seu mês."
        />

        <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-auto lg:overflow-hidden">
          <MonthProjectsAmountCard />
          <DaysWorkedAmountCard />
          <HoursWorkedAmountCard />
          <MonthRevenueCard />
        </div>

        <div className="grid grid-cols-9 gap-4"></div>
      </div>
    </>
  )
}
