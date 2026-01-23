import React from "react";
import { cn } from "./utils"; // your existing utility for className merging

// Variants for alert styling
const alertVariants = {
  default: "bg-card text-card-foreground",
  destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
};

// Alert component
function Alert({ className = "", variant = "default", children, ...props }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants[variant], "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Alert title
function AlertTitle({ className = "", children, ...props }) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Alert description
function AlertDescription({ className = "", children, ...props }) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription };
