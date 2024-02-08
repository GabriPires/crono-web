import { Helmet } from 'react-helmet-async'

import { DaysWorkedAmountCard } from './components/days-worked-card'
import { HoursWorkedAmountCard } from './components/hours-worked-card'
import { MonthProjectsAmountCard } from './components/month-projects-amount-card'
import { MonthRevenueCard } from './components/month-revenue-card'

export function DashboardPage() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Olá, John Doe</h1>
          <h2 className="tracking-tight">
            Quais objetivos vamos alcançar hoje?{' '}
            <span className="text-gray-500">👋</span>
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
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
