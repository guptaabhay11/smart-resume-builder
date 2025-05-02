import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const TooltipContext = React.createContext<TooltipContextType | null>(null)

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      {children}
    </TooltipContext.Provider>
  )
}

const useTooltip = () => {
  const context = React.useContext(TooltipContext)
  if (!context) {
    throw new Error("useTooltip must be used within a TooltipProvider")
  }
  return context
}

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipTrigger = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { setOpen } = useTooltip()
  return (
    <div
      className={className}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      {children}
    </div>
  )
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => {
    const { open } = useTooltip()
    
    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn(
          "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
        style={{ margin: sideOffset }}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }