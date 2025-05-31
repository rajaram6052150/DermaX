"use client"

import { cn } from "@/lib/utils"

export function Spinner({ className, size = "10px", style }) {
  return (
    <div
      className={cn("spinner-tile-animation", className)}
      style={{ fontSize: size, ...style }}
    />
  )
}
