import React from "react";
import { cn } from "./utils";

/*
  Simple loading placeholder
  Used while content is loading
*/
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
