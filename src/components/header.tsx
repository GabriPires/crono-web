import { AlarmClockCheck, Briefcase, Home } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { TimeTracker } from './time-tracker/time-tracker'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <AlarmClockCheck className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/projects">
            <Briefcase className="h-4 w-4" />
            Projetos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <TimeTracker />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
