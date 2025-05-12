"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Function to check device type
    const checkDeviceType = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const width = window.innerWidth

      // Mobile: < 768px
      // Tablet: 768px - 1024px
      // Desktop: > 1024px
      setIsMobile(width < 768 || (isMobileDevice && width < 1024))
      setIsTablet(width >= 768 && width <= 1024 && !isMobileDevice)
      setIsDesktop(width > 1024 || (width > 768 && !isMobileDevice && !isTablet))
    }

    // Check on mount
    checkDeviceType()

    // Check on resize
    window.addEventListener("resize", checkDeviceType)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkDeviceType)
    }
  }, [isTablet])

  return { isMobile, isTablet, isDesktop }
}
