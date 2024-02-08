import { AlarmClockCheck } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 antialiased">
      <div className="hidden lg:flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg  text-foreground">
          <AlarmClockCheck className="h-5 w-5" />
          <span className="font-semibold">Crono</span>
        </div>
        <footer className="text-sm">
          &copy; Crono - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}