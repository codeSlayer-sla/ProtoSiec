"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  MessageSquare,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  Paperclip,
  Smile,
  FileText,
  MapPin,
  BarChart2,
  Info,
  Download,
  Database,
  HelpCircle,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  id: string
  role: "assistant" | "user"
  content: string
  timestamp: Date
  options?: ChatOption[]
  isTyping?: boolean
}

type ChatOption = {
  text: string
  value: string
  icon?: React.ReactNode
  action?: {
    type: "scroll" | "link" | "search" | "download"
    target: string
    format?: string
  }
}

// Componente para el icono de código
const Code = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
)

// Base de conocimiento para el chatbot
const knowledgeBase = {
  // Preguntas frecuentes
  faqs: [
    {
      keywords: ["qué", "que", "es", "siec", "sistema"],
      answer:
        "El Sistema Integrado de Estadísticas Criminales (SIEC) es una iniciativa del Ministerio de Seguridad Pública de Panamá que recopila, analiza y publica datos sobre la situación de seguridad en el país.",
      options: [
        {
          text: "Más información sobre SIEC",
          value: "info",
          icon: <Info className="h-3 w-3" />,
          action: { type: "scroll", target: "about" },
        },
        {
          text: "Ver estadísticas",
          value: "estadisticas",
          icon: <BarChart2 className="h-3 w-3" />,
          action: { type: "scroll", target: "statistics" },
        },
      ],
    },
    {
      keywords: ["datos", "disponibles", "conjuntos", "datasets"],
      answer:
        "Ofrecemos diversos conjuntos de datos sobre estadísticas criminales, incidentes reportados, tendencias de seguridad y datos demográficos. Todos están disponibles en múltiples formatos como JSON, CSV, Excel, PDF y GeoJSON.",
      options: [
        {
          text: "Ver conjuntos de datos",
          value: "datos",
          icon: <Database className="h-3 w-3" />,
          action: { type: "scroll", target: "datasets" },
        },
        {
          text: "Formatos disponibles",
          value: "formatos",
          icon: <FileText className="h-3 w-3" />,
          action: { type: "scroll", target: "downloads" },
        },
      ],
    },
    {
      keywords: ["descargar", "formato", "json", "csv", "excel", "pdf"],
      answer:
        "Puedes descargar nuestros datos en múltiples formatos. Cada conjunto de datos tiene opciones de descarga en JSON, CSV, Excel, PDF y GeoJSON. Solo tienes que ir a la sección de conjuntos de datos y seleccionar el formato que prefieras.",
      options: [
        {
          text: "Descargar ejemplo JSON",
          value: "descargar_json",
          icon: <Download className="h-3 w-3" />,
          action: { type: "download", target: "estadisticas_criminales", format: "json" },
        },
        {
          text: "Descargar ejemplo CSV",
          value: "descargar_csv",
          icon: <Download className="h-3 w-3" />,
          action: { type: "download", target: "estadisticas_criminales", format: "csv" },
        },
        {
          text: "Ver formatos disponibles",
          value: "formatos",
          icon: <FileText className="h-3 w-3" />,
          action: { type: "scroll", target: "downloads" },
        },
      ],
    },
    {
      keywords: ["mapa", "interactivo", "provincias", "geografico", "geográfico"],
      answer:
        "Nuestro mapa interactivo te permite explorar datos por provincia. Puedes ver estadísticas detalladas como población, tasa de criminalidad y tendencias simplemente pasando el cursor sobre cualquier provincia.",
      options: [
        {
          text: "Ir al mapa ahora",
          value: "ir_mapa",
          icon: <MapPin className="h-3 w-3" />,
          action: { type: "scroll", target: "map" },
        },
        {
          text: "¿Qué estadísticas puedo ver?",
          value: "estadisticas_mapa",
          icon: <HelpCircle className="h-3 w-3" />,
        },
      ],
    },
    {
      keywords: ["visualizaciones", "gráficos", "graficos", "avanzadas", "interactivas"],
      answer:
        "Ofrecemos visualizaciones avanzadas e interactivas que te permiten explorar los datos de múltiples formas. Puedes filtrar por año, provincia y tipo de delito, así como ver tendencias temporales y comparativas entre regiones.",
      options: [
        {
          text: "Ver visualizaciones",
          value: "ir_visualizaciones",
          icon: <BarChart2 className="h-3 w-3" />,
          action: { type: "scroll", target: "visualizations" },
        },
        {
          text: "¿Qué tipos de gráficos hay?",
          value: "tipos_graficos",
          icon: <HelpCircle className="h-3 w-3" />,
        },
      ],
    },
    {
      keywords: ["api", "desarrolladores", "integrar", "programatico", "programático"],
      answer:
        "Ofrecemos una API REST para desarrolladores que quieran integrar nuestros datos en sus aplicaciones. La API proporciona acceso programático a todos nuestros conjuntos de datos con opciones de filtrado y búsqueda avanzada.",
      options: [
        {
          text: "Ver documentación API",
          value: "ir_api",
          icon: <ExternalLink className="h-3 w-3" />,
          action: { type: "scroll", target: "downloads" },
        },
        {
          text: "Ejemplos de uso",
          value: "ejemplos_api",
          icon: <Code className="h-3 w-3" />,
        },
      ],
    },
    {
      keywords: ["contacto", "contactar", "ayuda", "soporte", "pregunta"],
      answer:
        "Puedes contactar con el equipo de SIEC a través del formulario en la sección 'Contáctanos' al final de la página principal, o enviar un correo electrónico a soporte@siec.gob.pa.",
      options: [
        {
          text: "Ir a contacto",
          value: "ir_contacto",
          icon: <MessageSquare className="h-3 w-3" />,
          action: { type: "scroll", target: "contacto" },
        },
        {
          text: "Preguntas frecuentes",
          value: "faqs",
          icon: <HelpCircle className="h-3 w-3" />,
        },
      ],
    },
  ],

  // Categorías de datos
  categories: [
    {
      id: "estadisticas_criminales",
      name: "Estadísticas Criminales",
      description: "Datos sobre incidentes criminales por tipo, ubicación y período de tiempo.",
      formats: ["json", "csv", "excel", "pdf", "geojson"],
    },
    {
      id: "datos_demograficos",
      name: "Datos Demográficos",
      description: "Información poblacional por provincia, género, edad y otros factores.",
      formats: ["json", "csv", "excel", "pdf"],
    },
    {
      id: "incidentes_reportados",
      name: "Incidentes Reportados",
      description: "Registros detallados de incidentes reportados a las autoridades.",
      formats: ["json", "csv", "excel", "pdf", "geojson"],
    },
    {
      id: "tendencias_seguridad",
      name: "Tendencias de Seguridad",
      description: "Análisis de tendencias en seguridad pública a lo largo del tiempo.",
      formats: ["json", "csv", "excel", "pdf"],
    },
  ],

  // Tipos de visualizaciones
  visualizations: [
    {
      id: "line",
      name: "Gráficos de líneas",
      description: "Visualiza tendencias a lo largo del tiempo para diferentes tipos de delitos.",
    },
    {
      id: "bar",
      name: "Gráficos de barras",
      description: "Compara valores entre diferentes categorías o períodos.",
    },
    {
      id: "heatmap",
      name: "Mapas de calor",
      description: "Muestra la intensidad de incidentes por ubicación geográfica.",
    },
    {
      id: "comparison",
      name: "Gráficos comparativos",
      description: "Compara estadísticas entre diferentes provincias o regiones.",
    },
  ],
}

// Función para buscar en la base de conocimiento
function searchKnowledgeBase(query: string): { answer: string; options: ChatOption[] } | null {
  // Convertir la consulta a minúsculas y eliminar acentos para facilitar la búsqueda
  const normalizedQuery = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  // Buscar en las preguntas frecuentes
  for (const faq of knowledgeBase.faqs) {
    // Verificar si alguna palabra clave está en la consulta
    if (faq.keywords.some((keyword) => normalizedQuery.includes(keyword))) {
      return {
        answer: faq.answer,
        options: faq.options || [],
      }
    }
  }

  // Si no se encuentra una coincidencia exacta, buscar por categoría
  if (
    normalizedQuery.includes("estadistica") ||
    normalizedQuery.includes("crimen") ||
    normalizedQuery.includes("delito")
  ) {
    return {
      answer:
        "Tenemos datos detallados sobre estadísticas criminales por provincia, tipo de delito y período de tiempo. Puedes explorarlos en nuestra sección de conjuntos de datos.",
      options: [
        {
          text: "Ver estadísticas criminales",
          value: "estadisticas_criminales",
          icon: <BarChart2 className="h-3 w-3" />,
          action: { type: "scroll", target: "datasets" },
        },
        {
          text: "Explorar visualizaciones",
          value: "visualizaciones",
          icon: <BarChart2 className="h-3 w-3" />,
          action: { type: "scroll", target: "visualizations" },
        },
      ],
    }
  }

  if (
    normalizedQuery.includes("mapa") ||
    normalizedQuery.includes("provincia") ||
    normalizedQuery.includes("geografico")
  ) {
    return {
      answer:
        "Nuestro mapa interactivo te permite explorar datos por provincia. Puedes ver estadísticas detalladas como población, tasa de criminalidad y tendencias.",
      options: [
        {
          text: "Ir al mapa",
          value: "mapa",
          icon: <MapPin className="h-3 w-3" />,
          action: { type: "scroll", target: "map" },
        },
      ],
    }
  }

  // Respuesta por defecto si no se encuentra ninguna coincidencia
  return {
    answer:
      "No tengo información específica sobre eso, pero puedo ayudarte a explorar nuestros datos, visualizaciones o responder preguntas sobre el portal. ¿Qué te gustaría saber?",
    options: [
      {
        text: "Ver conjuntos de datos",
        value: "datos",
        icon: <Database className="h-3 w-3" />,
        action: { type: "scroll", target: "datasets" },
      },
      {
        text: "Explorar visualizaciones",
        value: "visualizaciones",
        icon: <BarChart2 className="h-3 w-3" />,
        action: { type: "scroll", target: "visualizations" },
      },
      {
        text: "Preguntas frecuentes",
        value: "faqs",
        icon: <HelpCircle className="h-3 w-3" />,
      },
    ],
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { toast } = useToast()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "¡Hola! Soy el asistente virtual de SIEC. Estoy aquí para ayudarte a navegar por nuestro portal de datos abiertos. ¿Qué te gustaría conocer?",
      timestamp: new Date(),
      options: [
        {
          text: "Explorar el mapa interactivo",
          value: "mapa",
          icon: <MapPin className="h-3 w-3" />,
          action: { type: "scroll", target: "map" },
        },
        {
          text: "Ver conjuntos de datos",
          value: "datos",
          icon: <FileText className="h-3 w-3" />,
          action: { type: "scroll", target: "datasets" },
        },
        {
          text: "Conocer estadísticas destacadas",
          value: "estadisticas",
          icon: <BarChart2 className="h-3 w-3" />,
          action: { type: "scroll", target: "statistics" },
        },
        {
          text: "Información sobre SIEC",
          value: "info",
          icon: <Info className="h-3 w-3" />,
          action: { type: "scroll", target: "about" },
        },
      ],
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Limpiar el AbortController cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Función para procesar la respuesta basada en la consulta del usuario
  const processUserQuery = useCallback((query: string): Message => {
    // Buscar en la base de conocimiento
    const result = searchKnowledgeBase(query)

    if (result) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: result.answer,
        timestamp: new Date(),
        options: result.options,
      }
    }

    // Respuesta por defecto si no se encuentra ninguna coincidencia
    return {
      id: Date.now().toString(),
      role: "assistant",
      content: "Lo siento, no tengo información específica sobre eso. ¿Puedo ayudarte con algo más?",
      timestamp: new Date(),
      options: [
        {
          text: "Ver conjuntos de datos",
          value: "datos",
          icon: <Database className="h-3 w-3" />,
          action: { type: "scroll", target: "datasets" },
        },
        {
          text: "Explorar visualizaciones",
          value: "visualizaciones",
          icon: <BarChart2 className="h-3 w-3" />,
          action: { type: "scroll", target: "visualizations" },
        },
        {
          text: "Volver al menú principal",
          value: "menu",
          icon: <ChevronUp className="h-3 w-3" />,
        },
      ],
    }
  }, [])

  // Función para manejar búsquedas
  const handleSearch = useCallback(
    (query: string) => {
      toast({
        title: "Búsqueda iniciada",
        description: `Buscando: ${query}`,
      })

      // Aquí iría la lógica real de búsqueda
      // Por ahora, simplemente devolvemos resultados simulados
    },
    [toast],
  )

  // Función para manejar descargas
  const handleDownload = useCallback(
    async (datasetName: string, format: string) => {
      try {
        // Simulamos la descarga sin importación dinámica para evitar errores de red
        toast({
          title: "Descarga iniciada",
          description: `El archivo se está descargando en formato ${format.toUpperCase()}`,
        })

        // Simulamos datos de ejemplo para diferentes formatos
        let data: string | Blob
        let filename: string

        switch (format) {
          case "json":
            data = JSON.stringify(
              {
                nombre: "Estadísticas Criminales",
                datos: [
                  { provincia: "Panamá", incidentes: 1250, año: 2023 },
                  { provincia: "Colón", incidentes: 850, año: 2023 },
                  { provincia: "Chiriquí", incidentes: 620, año: 2023 },
                ],
              },
              null,
              2,
            )
            filename = `${datasetName}.json`
            break
          case "csv":
            data = "provincia,incidentes,año\nPanamá,1250,2023\nColón,850,2023\nChiriquí,620,2023"
            filename = `${datasetName}.csv`
            break
          default:
            data = "Datos de ejemplo"
            filename = `${datasetName}.txt`
        }

        // Crear un objeto Blob y descargar
        const blob = new Blob([data], { type: format === "json" ? "application/json" : "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error("Error al descargar:", error)
        toast({
          title: "Error en la descarga",
          description: "No se pudo descargar el archivo. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  // Define respuestas y opciones basadas en la selección del usuario
  const getResponse = useCallback(
    (option: string, query?: string): Message => {
      // Si es una consulta de búsqueda
      if (query) {
        return processUserQuery(query)
      }

      switch (option) {
        case "mapa":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Nuestro mapa interactivo te permite explorar datos por provincia. Simplemente pasa el cursor sobre cualquier provincia para ver estadísticas detalladas como población, tasa de criminalidad y tendencias.",
            timestamp: new Date(),
            options: [
              {
                text: "Ir al mapa ahora",
                value: "ir_mapa",
                icon: <MapPin className="h-3 w-3" />,
                action: { type: "scroll", target: "map" },
              },
              {
                text: "¿Qué estadísticas puedo ver?",
                value: "estadisticas_mapa",
                icon: <BarChart2 className="h-3 w-3" />,
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "estadisticas_mapa":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "En el mapa interactivo puedes ver las siguientes estadísticas por provincia: población total, tasa de criminalidad, número de incidentes reportados, delito más común, tendencia comparada con el año anterior y la capital de la provincia.",
            timestamp: new Date(),
            options: [
              {
                text: "Ir al mapa ahora",
                value: "ir_mapa",
                icon: <MapPin className="h-3 w-3" />,
                action: { type: "scroll", target: "map" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "datos":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Tenemos varios conjuntos de datos disponibles organizados por categorías. Puedes encontrar estadísticas criminales, mapas de incidencia, informes anuales, datos históricos, comparativas internacionales y más.",
            timestamp: new Date(),
            options: [
              {
                text: "Ver todos los conjuntos",
                value: "ir_datos",
                icon: <FileText className="h-3 w-3" />,
                action: { type: "scroll", target: "datasets" },
              },
              {
                text: "¿Cómo puedo descargar datos?",
                value: "descargar",
                icon: <FileText className="h-3 w-3" />,
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "descargar":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Puedes descargar cualquier conjunto de datos en múltiples formatos (PDF, Excel, CSV, JSON) haciendo clic en el botón 'Descargar' que aparece en cada tarjeta de datos. Selecciona el formato que prefieras y el archivo se descargará automáticamente.",
            timestamp: new Date(),
            options: [
              {
                text: "Descargar ejemplo JSON",
                value: "descargar_json",
                icon: <Download className="h-3 w-3" />,
                action: { type: "download", target: "estadisticas_criminales", format: "json" },
              },
              {
                text: "Descargar ejemplo CSV",
                value: "descargar_csv",
                icon: <Download className="h-3 w-3" />,
                action: { type: "download", target: "estadisticas_criminales", format: "csv" },
              },
              {
                text: "Ver conjuntos de datos",
                value: "ir_datos",
                icon: <FileText className="h-3 w-3" />,
                action: { type: "scroll", target: "datasets" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "estadisticas":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "En nuestra sección de estadísticas destacadas encontrarás información sobre el número total de conjuntos de datos disponibles, usuarios activos, descargas mensuales y tiempo promedio de actualización.",
            timestamp: new Date(),
            options: [
              {
                text: "Ver estadísticas destacadas",
                value: "ir_estadisticas",
                icon: <BarChart2 className="h-3 w-3" />,
                action: { type: "scroll", target: "statistics" },
              },
              {
                text: "Explorar visualizaciones avanzadas",
                value: "ir_visualizaciones",
                icon: <BarChart2 className="h-3 w-3" />,
                action: { type: "scroll", target: "visualizations" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "info":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "El Sistema Integrado de Estadísticas Criminales (SIEC) es una iniciativa del Ministerio de Seguridad Pública de Panamá que busca proporcionar información confiable y actualizada sobre la situación de seguridad en el país.",
            timestamp: new Date(),
            options: [
              {
                text: "Más información sobre SIEC",
                value: "ir_info",
                icon: <Info className="h-3 w-3" />,
                action: { type: "scroll", target: "about" },
              },
              {
                text: "Contactar con SIEC",
                value: "contacto",
                icon: <MessageSquare className="h-3 w-3" />,
                action: { type: "scroll", target: "contacto" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "contacto":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Puedes contactar con el equipo de SIEC a través del formulario en la sección 'Contáctanos' al final de la página principal, o enviar un correo electrónico a soporte@siec.gob.pa.",
            timestamp: new Date(),
            options: [
              {
                text: "Ir a contacto",
                value: "ir_contacto",
                icon: <MessageSquare className="h-3 w-3" />,
                action: { type: "scroll", target: "contacto" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "menu":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content: "¿En qué más puedo ayudarte?",
            timestamp: new Date(),
            options: [
              {
                text: "Explorar el mapa interactivo",
                value: "mapa",
                icon: <MapPin className="h-3 w-3" />,
                action: { type: "scroll", target: "map" },
              },
              {
                text: "Ver conjuntos de datos",
                value: "datos",
                icon: <FileText className="h-3 w-3" />,
                action: { type: "scroll", target: "datasets" },
              },
              {
                text: "Conocer estadísticas destacadas",
                value: "estadisticas",
                icon: <BarChart2 className="h-3 w-3" />,
                action: { type: "scroll", target: "statistics" },
              },
              {
                text: "Información sobre SIEC",
                value: "info",
                icon: <Info className="h-3 w-3" />,
                action: { type: "scroll", target: "about" },
              },
            ],
          }

        case "tipos_graficos":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Ofrecemos varios tipos de visualizaciones: gráficos de líneas para tendencias temporales, gráficos de barras para comparaciones, mapas de calor para distribución geográfica y gráficos comparativos para analizar diferencias entre provincias.",
            timestamp: new Date(),
            options: [
              {
                text: "Ver visualizaciones",
                value: "ir_visualizaciones",
                icon: <BarChart2 className="h-3 w-3" />,
                action: { type: "scroll", target: "visualizations" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "ejemplos_api":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Aquí tienes un ejemplo de cómo usar nuestra API:\n\n```\nfetch('https://api.siec.gob.pa/v1/statistics?province=panama&year=2023')\n  .then(response => response.json())\n  .then(data => console.log(data));\n```\n\nPuedes encontrar más ejemplos y documentación completa en nuestra sección de API.",
            timestamp: new Date(),
            options: [
              {
                text: "Ver documentación API",
                value: "ir_api",
                icon: <ExternalLink className="h-3 w-3" />,
                action: { type: "scroll", target: "downloads" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        case "faqs":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content: "Aquí tienes algunas preguntas frecuentes que puedes hacerme:",
            timestamp: new Date(),
            options: [
              {
                text: "¿Qué es SIEC?",
                value: "que_es_siec",
                icon: <HelpCircle className="h-3 w-3" />,
              },
              {
                text: "¿Qué datos están disponibles?",
                value: "datos_disponibles",
                icon: <Database className="h-3 w-3" />,
              },
              {
                text: "¿Cómo puedo descargar datos?",
                value: "como_descargar",
                icon: <Download className="h-3 w-3" />,
              },
              {
                text: "¿Cómo funciona el mapa interactivo?",
                value: "mapa",
                icon: <MapPin className="h-3 w-3" />,
              },
            ],
          }

        case "que_es_siec":
          return getResponse("info")

        case "datos_disponibles":
          return getResponse("datos")

        case "como_descargar":
          return getResponse("descargar")

        // Para opciones que son acciones directas de desplazamiento
        case "ir_mapa":
        case "ir_datos":
        case "ir_estadisticas":
        case "ir_info":
        case "ir_contacto":
        case "ir_visualizaciones":
        case "ir_api":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content: "Te he dirigido a la sección solicitada. ¿Necesitas algo más?",
            timestamp: new Date(),
            options: [
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        // Para opciones de descarga
        case "descargar_json":
        case "descargar_csv":
        case "descargar_excel":
        case "descargar_pdf":
        case "descargar_geojson":
          return {
            id: Date.now().toString(),
            role: "assistant",
            content: "He iniciado la descarga del archivo solicitado. ¿Necesitas algo más?",
            timestamp: new Date(),
            options: [
              {
                text: "Descargar en otro formato",
                value: "descargar",
                icon: <Download className="h-3 w-3" />,
              },
              {
                text: "Ver conjuntos de datos",
                value: "ir_datos",
                icon: <FileText className="h-3 w-3" />,
                action: { type: "scroll", target: "datasets" },
              },
              {
                text: "Volver al menú principal",
                value: "menu",
                icon: <ChevronUp className="h-3 w-3" />,
              },
            ],
          }

        default:
          return {
            id: Date.now().toString(),
            role: "assistant",
            content: "¿En qué más puedo ayudarte?",
            timestamp: new Date(),
            options: [
              {
                text: "Explorar el mapa interactivo",
                value: "mapa",
                icon: <MapPin className="h-3 w-3" />,
                action: { type: "scroll", target: "map" },
              },
              {
                text: "Ver conjuntos de datos",
                value: "datos",
                icon: <FileText className="h-3 w-3" />,
                action: { type: "scroll", target: "datasets" },
              },
              {
                text: "Conocer estadísticas destacadas",
                value: "estadisticas",
                icon: <BarChart2 className="h-3 w-3" />,
                action: { type: "scroll", target: "statistics" },
              },
              {
                text: "Información sobre SIEC",
                value: "info",
                icon: <Info className="h-3 w-3" />,
                action: { type: "scroll", target: "about" },
              },
            ],
          }
      }
    },
    [processUserQuery],
  )

  const handleOptionClick = useCallback(
    async (option: ChatOption) => {
      // Cancelar cualquier solicitud anterior
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Crear un nuevo AbortController
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      try {
        // Si hay una acción de desplazamiento, ejecutarla
        if (option.action?.type === "scroll") {
          const element = document.getElementById(option.action.target)
          if (element) {
            // Usar setTimeout para asegurar que el desplazamiento ocurra después de cualquier actualización de estado
            setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth", block: "start" })
            }, 100)
          }
        } else if (option.action?.type === "link") {
          window.open(option.action.target, "_blank")
        } else if (option.action?.type === "search") {
          // Implementar búsqueda
          handleSearch(option.action.target)
        } else if (option.action?.type === "download" && option.action.format) {
          // Implementar descarga
          await handleDownload(option.action.target, option.action.format)
        }

        // Verificar si la operación fue abortada
        if (signal.aborted) {
          throw new DOMException("The operation was aborted", "AbortError")
        }

        // Simular que el bot está escribiendo
        setIsTyping(true)

        // Añadir respuesta del bot después de un breve retraso para simular escritura
        setTimeout(() => {
          if (!signal.aborted) {
            const botResponse = getResponse(option.value)
            setMessages((prev) => [...prev, botResponse])
            setIsTyping(false)
          }
        }, 700)
      } catch (error) {
        // No mostrar error si fue abortado intencionalmente
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Operación abortada")
          return
        }

        console.error("Error al procesar la opción:", error)
        setIsTyping(false)
        toast({
          title: "Error",
          description: "Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    },
    [getResponse, handleSearch, handleDownload, toast],
  )

  const handleInputSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!inputValue.trim()) return

      // Cancelar cualquier solicitud anterior
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Crear un nuevo AbortController
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      try {
        // Añadir mensaje del usuario
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: inputValue,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue("")
        setShowSuggestions(false)

        // Verificar si la operación fue abortada
        if (signal.aborted) {
          throw new DOMException("The operation was aborted", "AbortError")
        }

        // Simular que el bot está escribiendo
        setIsTyping(true)

        // Añadir respuesta del bot después de un breve retraso
        setTimeout(() => {
          if (!signal.aborted) {
            const botResponse = getResponse("", inputValue)
            setMessages((prev) => [...prev, botResponse])
            setIsTyping(false)
          }
        }, 1000)
      } catch (error) {
        // No mostrar error si fue abortado intencionalmente
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Operación abortada")
          return
        }

        console.error("Error al procesar el mensaje:", error)
        setIsTyping(false)
        toast({
          title: "Error",
          description: "Ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    },
    [inputValue, getResponse, toast],
  )

  // Generar sugerencias basadas en el input del usuario
  const generateSuggestions = useCallback((input: string) => {
    if (!input.trim()) {
      setShowSuggestions(false)
      return
    }

    const normalizedInput = input.toLowerCase()

    // Lista de sugerencias basadas en palabras clave
    const allSuggestions = [
      "¿Qué es SIEC?",
      "¿Qué datos están disponibles?",
      "¿Cómo puedo descargar datos?",
      "¿Cómo funciona el mapa interactivo?",
      "¿Qué visualizaciones ofrecen?",
      "¿Cómo puedo contactar con SIEC?",
      "¿Tienen una API para desarrolladores?",
      "Estadísticas de criminalidad por provincia",
      "Tendencias de seguridad en Panamá",
      "Formatos de descarga disponibles",
      "Cómo interpretar los mapas de calor",
    ]

    // Filtrar sugerencias basadas en la entrada del usuario
    const filteredSuggestions = allSuggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(normalizedInput))
      .slice(0, 5) // Limitar a 5 sugerencias

    setSuggestions(filteredSuggestions)
    setShowSuggestions(filteredSuggestions.length > 0)
  }, [])

  // Manejar cambios en el input
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      generateSuggestions(value)
    },
    [generateSuggestions],
  )

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  // Formatear la hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <MessageSquare className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Asistente virtual SIEC</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      )}

      {/* Chat window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Card
            className={cn(
              "shadow-lg transition-all duration-300 ease-in-out border-0",
              isMinimized ? "h-14 w-80" : "h-[500px] w-96",
            )}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <h3 className="font-medium">Asistente SIEC</h3>
                {!isMinimized && (
                  <Badge variant="outline" className="ml-2 bg-white/20 text-white text-xs">
                    En línea
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-white/20 text-white"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label={isMinimized ? "Expandir chat" : "Minimizar chat"}
                >
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full hover:bg-white/20 text-white"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 h-[400px] bg-gradient-to-b from-background to-muted/30">
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4"
                      >
                        <div
                          className={cn(
                            "flex items-start gap-2",
                            message.role === "user" ? "justify-end" : "justify-start",
                          )}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                                SB
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg p-3",
                              message.role === "user"
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                : "bg-muted",
                            )}
                          >
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs font-medium">
                                {message.role === "assistant" ? "Asistente SIEC" : "Tú"}
                              </span>
                              <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                            </div>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>

                          {message.role === "user" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                                TÚ
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>

                        {message.options && (
                          <div className="flex flex-wrap gap-2 mt-2 ml-10">
                            {message.options.map((option, optIndex) => (
                              <Button
                                key={optIndex}
                                variant="outline"
                                size="sm"
                                className="text-xs flex items-center gap-1 bg-background hover:bg-muted transition-colors"
                                onClick={() => handleOptionClick(option)}
                              >
                                {option.icon}
                                {option.text}
                              </Button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 mb-4"
                      >
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                            SB
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                            <div className="h-2 w-2 rounded-full bg-primary animate-bounce animation-delay-200" />
                            <div className="h-2 w-2 rounded-full bg-primary animate-bounce animation-delay-400" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </AnimatePresence>
                </div>

                {/* Chat input */}
                <div className="border-t p-3 bg-background">
                  <form onSubmit={handleInputSubmit} className="flex items-center gap-2 relative">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Escribe tu mensaje..."
                      value={inputValue}
                      onChange={handleInputChange}
                      className="flex-1"
                      autoComplete="off"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim()}
                      className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>

                    {/* Sugerencias */}
                    {showSuggestions && (
                      <div className="absolute bottom-full left-0 w-full bg-background border rounded-md shadow-md mb-1 z-10">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-muted cursor-pointer text-sm"
                            onClick={() => {
                              setInputValue(suggestion)
                              setShowSuggestions(false)
                              inputRef.current?.focus()
                            }}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    )}
                  </form>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Adjuntar archivo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                              <Smile className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Insertar emoji</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-xs text-muted-foreground">Powered by SIEC</p>
                  </div>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      )}
    </>
  )
}
