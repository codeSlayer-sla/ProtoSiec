"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Database, Home, Info, BarChart, Mail, Download, Newspaper, Book, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const navItems: NavItem[] = [
    {
      label: "Inicio",
      href: pathname === "/" ? "#hero" : "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      label: "Datos",
      href: "/datos",
      icon: <Database className="h-4 w-4" />,
    },
    {
      label: "Publicaciones",
      href: "/publicaciones",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Biblioteca SIEC",
      href: "/biblioteca",
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Aquí puedes implementar la lógica de búsqueda
      // Por ahora, solo redirigimos a la página de búsqueda con el query
      router.push(`/busqueda?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-transparent backdrop-blur-none",
        isScrolled 
          ? "backdrop-blur-md shadow-md bg-white/80 dark:bg-black/20" 
          : "bg-transparent backdrop-blur-none shadow-none"
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
          

          {/* Barra de búsqueda */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="hidden md:block flex-1 max-w-xl mx-4"
          >
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Busca aqui"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-black/20 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 hover:bg-primary/10 dark:hover:bg-primary/20"
              >
                Buscar
              </Button>
            </form>
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
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 hover:bg-white/20 hover:shadow-md hover:scale-105 hover:z-10 hover:text-blue-700 dark:hover:bg-white/10 dark:hover:text-blue-300",
                    activeSection === item.href.replace("#", "") || (activeSection === "" && item.href === "#hero")
                      ? "bg-white/30 text-blue-700 shadow-sm dark:bg-white/10 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
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
            className="md:hidden bg-white/80 dark:bg-black/20 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          >
            <div className="container mx-auto px-4 py-2">
              {/* Barra de búsqueda móvil */}
              <div className="mb-4">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Busca aqui"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-black/20 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 hover:bg-primary/10 dark:hover:bg-primary/20"
                  >
                    Buscar
                  </Button>
                </form>
              </div>

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
                          ? "bg-white/30 text-blue-700 dark:bg-white/10 dark:text-blue-300"
                          : "text-gray-700 hover:bg-white/20 dark:text-gray-300 dark:hover:bg-white/10"
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
