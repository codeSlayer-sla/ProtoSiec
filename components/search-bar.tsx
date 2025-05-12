"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface SearchBarProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ placeholder = "Buscar datos...", className = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Sugerencias de ejemplo
  const exampleSuggestions = [
    "Estadísticas de criminalidad",
    "Datos de salud pública",
    "Educación en Panamá",
    "Presupuesto nacional",
    "Transporte público",
    "Calidad del aire",
    "Elecciones",
    "Turismo",
  ]

  useEffect(() => {
    if (query.length > 2) {
      // Filtrar sugerencias basadas en la consulta
      const filtered = exampleSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        // Redirigir a la página de resultados de búsqueda
        router.push(`/datasets?search=${encodeURIComponent(query)}`)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setTimeout(() => {
      handleSearch()
    }, 100)
  }

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-16 h-12 rounded-full border-2 focus-visible:ring-2 focus-visible:ring-offset-0"
        />
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-14"
            >
              <Button type="button" variant="ghost" size="icon" onClick={handleClear} className="h-6 w-6 rounded-full">
                <X className="h-4 w-4" />
                <span className="sr-only">Limpiar búsqueda</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          type="button"
          onClick={handleSearch}
          className="absolute right-1 h-10 rounded-full px-3"
          disabled={!query.trim()}
        >
          <span className="mr-2 hidden sm:inline">Buscar</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 w-full rounded-lg border bg-card p-2 shadow-lg"
          >
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
