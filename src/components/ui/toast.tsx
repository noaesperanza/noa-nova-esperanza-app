import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  variant?: 'default' | 'destructive'
  title?: string
  description?: string
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'default', onClose, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
          variant === 'default' && "border-border bg-background text-foreground",
          variant === 'destructive' && "destructive group border-destructive bg-destructive text-destructive-foreground",
          className
        )}
        {...props}
      >
        <div className="grid gap-1 flex-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

export { Toast }

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(({ id, title, description, variant, open }) => {
        if (!open) return null
        return (
          <Toast
            key={id}
            variant={variant}
            title={title}
            description={description}
            onClose={() => dismiss(id)}
          />
        )
      })}
    </div>
  )
}

// Export useToast to be used in Toaster
import { useToast } from "../../hooks/use-toast"

