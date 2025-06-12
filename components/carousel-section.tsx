"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselItem {
  id: number
  title: string
  description: string
  imageUrl: string
}

interface CarouselSection {
  title: string
  items: CarouselItem[]
}

const carouselData: CarouselSection[] = [
  {
    title: "Revistas",
    items: [
      {
        id: 1,
        title: "Revista SIEC 2024",
        description: "En las siguientes líneas se presentará un informe de carácter documental, cuya metodología es un estudio exploratorio basado en evidencia empírica disponible, desde donde se construye una base de datos, a partir de noticias de prensa, noticieros televisivos de los países donde se presenta la expansión del Tren de Aragua, como videos de entrevistas a altos oficiales y funcionarios de los gobiernos de dichos países, asimismo las rigurosas investigaciones periodísticas que vienen registrando y documentando sus acciones criminales, como es el caso panameño de la periodista Grisel Bethancourt y la experiencia del equipo multidisciplinario SIEC en temas de criminalidad y violencia.",
        imageUrl: "/revistas/revista1.jpg"
      },
      {
        id: 2,
        title: "Revista SIEC 2023",
        description: "Análisis de tendencias criminales y logros institucionales del año.",
        imageUrl: "/placeholder.jpg"
      },
      {
        id: 3,
        title: "Revista SIEC 2022",
        description: "Resumen de actividades y estadísticas del Sistema Integrado de Estadísticas Criminales.",
        imageUrl: "/placeholder.jpg"
      }
    ]
  },
  {
    title: "Boletines",
    items: [
      {
        id: 1,
        title: "Boletín Mensual SIEC",
        description: "Estadísticas criminales y análisis de seguridad ciudadana del mes actual.",
        imageUrl: "/placeholder.jpg"
      },
      {
        id: 2,
        title: "Boletín Trimestral",
        description: "Análisis comparativo de indicadores de seguridad ciudadana.",
        imageUrl: "/placeholder.jpg"
      },
      {
        id: 3,
        title: "Boletín Especial",
        description: "Informe especial sobre tendencias criminales en áreas metropolitanas.",
        imageUrl: "/placeholder.jpg"
      }
    ]
  },
  {
    title: "Noticias",
    items: [
      {
        id: 1,
        title: "Nuevo Sistema de Reportes",
        description: "Implementación de nueva plataforma para reportes estadísticos criminales.",
        imageUrl: "/placeholder.jpg"
      },
      {
        id: 2,
        title: "Actualización de Metodología",
        description: "Mejoras en la recolección y análisis de datos criminales.",
        imageUrl: "/placeholder.jpg"
      },
      {
        id: 3,
        title: "Cooperación Internacional",
        description: "Acuerdos de colaboración para el intercambio de información criminal.",
        imageUrl: "/placeholder.jpg"
      }
    ]
  }
]

const TRANSITION_DELAYS = [0, 3000, 6000] // Delays in milliseconds for each carousel

export function CarouselSection() {
  const [activeIndices, setActiveIndices] = useState<number[]>([0, 0, 0])
  const [isHovered, setIsHovered] = useState<boolean[]>([false, false, false])
  const [autoPlay, setAutoPlay] = useState<boolean>(true)

  useEffect(() => {
    if (!autoPlay) return // Si autoPlay está desactivado, no crear intervalos

    const intervals = TRANSITION_DELAYS.map((delay, index) => {
      return setTimeout(() => {
        const interval = setInterval(() => {
          if (!isHovered[index]) {
            setActiveIndices(prevIndices => {
              const newIndices = [...prevIndices]
              newIndices[index] = (prevIndices[index] + 1) % carouselData[index].items.length
              return newIndices
            })
          }
        }, 15000) // Cada carrusel cambia cada 15 segundos
        return interval
      }, delay)
    })

    return () => intervals.forEach(interval => clearInterval(interval))
  }, [isHovered, autoPlay])

  const handlePrev = (carouselIndex: number) => {
    setActiveIndices(prevIndices => {
      const newIndices = [...prevIndices]
      const itemsLength = carouselData[carouselIndex].items.length
      newIndices[carouselIndex] = (prevIndices[carouselIndex] - 1 + itemsLength) % itemsLength
      return newIndices
    })
  }

  const handleNext = (carouselIndex: number) => {
    setActiveIndices(prevIndices => {
      const newIndices = [...prevIndices]
      const itemsLength = carouselData[carouselIndex].items.length
      newIndices[carouselIndex] = (prevIndices[carouselIndex] + 1) % itemsLength
      return newIndices
    })
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Control de AutoPlay */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-2"
          >
            {autoPlay ? (
              <>
                <Pause className="h-4 w-4" />
                Pausar Carrusel
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Activar Carrusel
              </>
            )}
          </Button>
        </div>

        <div className="space-y-16">
          {carouselData.map((section, sectionIndex) => (
            <div 
              key={section.title} 
              className="space-y-6"
              onMouseEnter={() => {
                const newHovered = [...isHovered]
                newHovered[sectionIndex] = true
                setIsHovered(newHovered)
              }}
              onMouseLeave={() => {
                const newHovered = [...isHovered]
                newHovered[sectionIndex] = false
                setIsHovered(newHovered)
              }}
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
              </div>

              <div className="relative group">
                <div className="relative h-[450px] overflow-hidden rounded-xl shadow-2xl">
                  <AnimatePresence mode="wait">
                    {section.items.map((item, index) => (
                      index === activeIndices[sectionIndex] && (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.7, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${item.imageUrl})` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                          </div>
                          <Card className="absolute bottom-0 left-0 right-0 mx-6 mb-6 bg-background/90 backdrop-blur-md border-primary/20 shadow-lg">
                            <CardContent className="p-8">
                              <h3 className="text-2xl font-bold mb-3 text-primary">{item.title}</h3>
                              <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                </div>

                {/* Controles de navegación */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 bg-background/90 hover:bg-background shadow-lg"
                    onClick={() => handlePrev(sectionIndex)}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-4 bg-background/90 hover:bg-background shadow-lg"
                    onClick={() => handleNext(sectionIndex)}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>

                {/* Indicadores de posición */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                  {section.items.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndices[sectionIndex]
                          ? "bg-primary scale-125"
                          : "bg-primary/30 hover:bg-primary/50"
                      }`}
                      onClick={() => {
                        setActiveIndices(prev => {
                          const newIndices = [...prev]
                          newIndices[sectionIndex] = index
                          return newIndices
                        })
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 