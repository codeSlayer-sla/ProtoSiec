"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Laptop, Smartphone, Tablet } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function DeviceInfo() {
  const [mounted, setMounted] = useState(false)
  const { isMobile, isTablet, isDesktop } = useMobile()
  const [browserInfo, setBrowserInfo] = useState("")

  useEffect(() => {
    setMounted(true)

    // Get browser information
    const userAgent = navigator.userAgent
    let browserName = ""

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome"
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox"
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari"
    } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera"
    } else if (userAgent.match(/edg/i)) {
      browserName = "Edge"
    } else {
      browserName = "Desconocido"
    }

    setBrowserInfo(browserName)
  }, [])

  if (!mounted) return null

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      <Badge variant="outline" className="animate-fade-in gap-1 px-3 py-1">
        {isMobile ? (
          <Smartphone className="h-3 w-3" />
        ) : isTablet ? (
          <Tablet className="h-3 w-3" />
        ) : (
          <Laptop className="h-3 w-3" />
        )}
        <span>
          {isMobile ? "Móvil" : isTablet ? "Tablet" : "Escritorio"} • {browserInfo}
        </span>
      </Badge>
    </div>
  )
}
