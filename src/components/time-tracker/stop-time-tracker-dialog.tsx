import { Save, StopCircle, Trash } from 'lucide-react'
import { useRef } from 'react'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export function StopTimeTrackerDialog() {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="border-r rounded-r-none">
          <StopCircle className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Encerrando apontamento</DialogTitle>
          <DialogClose ref={closeButtonRef} />
        </DialogHeader>

        <form id="finish-appointment"></form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="text-rose-500 dark:text-rose-400"
          >
            <Trash className="size-4 mr-1" />
            Excluir
          </Button>
          <Button type="submit" form="finish-appointment">
            <Save className="size-4 mr-1" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
