"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface HoverImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  effectType?: "zoom" | "overlay" | "tint" | "blur" | "grayscale"
}

export default function HoverImage({ src, alt, width, height, className, effectType = "zoom" }: HoverImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn("relative overflow-hidden rounded-lg transition-all duration-300", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "auto" }}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          effectType === "zoom" && isHovered && "scale-110",
          effectType === "grayscale" && !isHovered && "grayscale",
          effectType === "blur" && !isHovered && "blur-sm",
        )}
      />

      {effectType === "overlay" && (
        <div
          className={cn(
            "absolute inset-0 bg-primary/0 transition-all duration-300 flex items-center justify-center",
            isHovered && "bg-primary/40",
          )}
        >
          {isHovered && <span className="text-white font-bold text-lg animate-fade-in">{alt}</span>}
        </div>
      )}

      {effectType === "tint" && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-0 transition-all duration-300",
            isHovered && "opacity-100",
          )}
        >
          {isHovered && <div className="absolute bottom-4 left-4 text-white font-bold animate-fade-in">{alt}</div>}
        </div>
      )}
    </div>
  )
}
