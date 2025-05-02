import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "absolute opacity-0 h-0 w-0 peer", // Hide the actual input
          className
        )}
        {...props}
      />
      <span className={cn(
        "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
        "h-4 w-4 shrink-0 rounded-sm border border-primary",
        "flex items-center justify-center",
        "ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "peer-checked:bg-primary peer-checked:text-primary-foreground"
      )}>
        <Check className={cn(
          "h-4 w-4 scale-0 transition-transform",
          "peer-checked:scale-100"
        )} />
      </span>
    </label>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }