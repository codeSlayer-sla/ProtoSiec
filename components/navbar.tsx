"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Database, Home, Info, BarChart, Mail, Download, Newspaper, Book} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navItems: NavItem[] = [
    {
      label: "Inicio",
      href: pathname === "/" ? "#hero" : "/",
      icon: <Home className="h-4 w-4" />,
    },
    
    {
      label: "Datos",
      href: pathname === "/" ? "#datasets" : "/datasets",
      icon: <Database className="h-4 w-4" />,
    },
    {
      label: "Biblioteca SIEC",
      href: "#visualizations",
      icon: <Book className="h-4 w-4" />,
    },
    
    {
      label: "Contacto",
      href: "#contacto",
      icon: <Mail className="h-4 w-4" />,
    },
  ]

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Detectar sección activa
      const sections = ["hero", "about", "datasets", "visualizations", "downloads", "contacto"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Llamar inicialmente

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Manejar el scroll suave
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si es un enlace interno (comienza con #)
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)

      if (element) {
        // Cerrar el menú móvil si está abierto
        setIsOpen(false)

        // Scroll suave
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-transparent dark:bg-white-200 backdrop-blur-none",
        isScrolled ? " backdrop-blur-md shadow-md dark:bg-gray-900/90" : "bg-transparent backdrop-blur-none shadow-none",
      )}
    >
      
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="flex items-center h-20 w-[420px]">
              <img
                src="/logo.png"
                alt="Gobierno Nacional con Paso Firme - Ministerio de Seguridad Pública"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
          

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 hover:bg-gray-100 hover:shadow-md hover:scale-105 hover:z-10 hover:text-blue-700 dark:hover:bg-gray-800/60 dark:hover:text-blue-300",
                    activeSection === item.href.replace("#", "") || (activeSection === "" && item.href === "#hero")
                      ? "bg-blue-100 text-blue-700 shadow-sm dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-blue-50 dark:hover:bg-blue-900/20"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={cn(
                        "px-3 py-3 rounded-md text-sm font-medium transition-colors flex items-center space-x-3",
                        activeSection === item.href.replace("#", "") || (activeSection === "" && item.href === "#hero")
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
