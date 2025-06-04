"use client"

import { useEffect, useState } from "react"
import { Megaphone } from "lucide-react"

interface Publication {
  title: string
  summary: string
  link: string
}


const examplePublications: Publication[] = [
  {
    title: "Informe de Seguridad Mayo 2024",
    summary: "Ya está disponible el informe mensual con los principales indicadores de seguridad.",
    link: "/publicaciones/informe-mayo-2024",
  },
  {
    title: "Nueva Base de Datos de Delitos 2023",
    summary: "Consulta y descarga la nueva base de datos de delitos reportados en 2023.",
    link: "/publicaciones/base-delitos-2023",
  },
  {
    title: "Boletín Estadístico Trimestral",
    summary: "Revisa el boletín con análisis y tendencias del primer trimestre del año.",
    link: "/publicaciones/boletin-trimestral",
  },
]

export default function MiniCarousel({ publications = examplePublications }: { publications?: Publication[] }) {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setFade(false)
    const fadeTimeout = setTimeout(() => setFade(true), 100)
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % publications.length)
        setFade(true)
      }, 300)
    }, 4000)
    return () => {
      clearInterval(interval)
      clearTimeout(fadeTimeout)
    }
  }, [publications.length])

  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div
        className={`relative rounded-xl bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 dark:from-blue-900/60 dark:via-slate-800 dark:to-purple-900/60 shadow-2xl p-4 min-h-[100px] flex flex-col items-start transition-all duration-500 transform hover:scale-105 border border-blue-200 dark:border-blue-900 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="h-5 w-5 text-blue-600" />
          <a href={publications[current].link} className="font-semibold text-blue-800 dark:text-blue-200 hover:underline text-base">
            {publications[current].title}
          </a>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">
          {publications[current].summary}
        </p>
        <a
          href={publications[current].link}
          className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors"
        >
          Ver más
        </a>
        <div className="absolute right-4 bottom-2 flex gap-1">
          {publications.map((_, idx) => (
            <span
              key={idx}
              className={`inline-block h-2 w-2 rounded-full ${idx === current ? "bg-blue-600" : "bg-blue-200 dark:bg-slate-600"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 