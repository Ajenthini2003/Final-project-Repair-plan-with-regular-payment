// src/app/components/ui/card.jsx
import React from "react";
import { cn } from "./utils";

export function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 py-4 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn("px-6 pt-6 flex flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 pt-4 border-t", className)}
      {...props}
    />
  );
}
