"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface Publication {
  id: number
  title: string
  description: string
  date: string
  imageUrl: string
  downloadUrl?: string
}

const publications = {
  revistas: [
    {
      id: 1,
      title: "Revista SIEC 2024",
      description: "En las siguientes líneas se presentará un informe de carácter documental, cuya metodología es un estudio exploratorio basado en evidencia empírica disponible, desde donde se construye una base de datos, a partir de noticias de prensa, noticieros televisivos de los países donde se presenta la expansión del Tren de Aragua, como videos de entrevistas a altos oficiales y funcionarios de los gobiernos de dichos países, asimismo las rigurosas investigaciones periodísticas que vienen registrando y documentando sus acciones criminales, como es el caso panameño de la periodista Grisel Bethancourt y la experiencia del equipo multidisciplinario SIEC en temas de criminalidad y violencia.",
      date: "Marzo 2024",
      imageUrl: "/revistas/revista1.jpg",
      downloadUrl: "/publications/revista-2024.pdf"
    },
    {
      id: 2,
      title: "Revista SIEC 2023",
      description: "Análisis de tendencias criminales y logros institucionales del año.",
      date: "Diciembre 2023",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/revista-2023.pdf"
    },
    {
      id: 3,
      title: "Revista SIEC 2022",
      description: "Resumen de actividades y estadísticas del Sistema Integrado de Estadísticas Criminales.",
      date: "Diciembre 2022",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/revista-2022.pdf"
    }
  ],
  boletines: [
    {
      id: 1,
      title: "Boletín Mensual SIEC",
      description: "Estadísticas criminales y análisis de seguridad ciudadana del mes actual.",
      date: "Marzo 2024",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/boletin-marzo-2024.pdf"
    },
    {
      id: 2,
      title: "Boletín Trimestral",
      description: "Análisis comparativo de indicadores de seguridad ciudadana.",
      date: "Enero 2024",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/boletin-trimestral-2024.pdf"
    },
    {
      id: 3,
      title: "Boletín Especial",
      description: "Informe especial sobre tendencias criminales en áreas metropolitanas.",
      date: "Diciembre 2023",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/boletin-especial-2023.pdf"
    }
  ],
  noticias: [
    {
      id: 1,
      title: "Nuevo Sistema de Reportes",
      description: "Implementación de nueva plataforma para reportes estadísticos criminales.",
      date: "Marzo 2024",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/nuevo-sistema-reportes.pdf"
    },
    {
      id: 2,
      title: "Actualización de Metodología",
      description: "Mejoras en la recolección y análisis de datos criminales.",
      date: "Febrero 2024",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/actualizacion-metodologia.pdf"
    },
    {
      id: 3,
      title: "Cooperación Internacional",
      description: "Acuerdos de colaboración para el intercambio de información criminal.",
      date: "Enero 2024",
      imageUrl: "/placeholder.jpg",
      downloadUrl: "/publications/cooperacion-internacional.pdf"
    }
  ]
}

export default function PublicacionesPage() {
  const [activeTab, setActiveTab] = useState("revistas")

  const handleOpenPublication = (url: string) => {
    // Abrir la publicación en una nueva pestaña
    window.open(url, '_blank')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Publicaciones SIEC
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Accede a nuestras revistas, boletines y noticias más recientes sobre estadísticas criminales y seguridad ciudadana.
              </p>
            </div>

            <Tabs defaultValue="revistas" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
                <TabsTrigger value="revistas">Revistas</TabsTrigger>
                <TabsTrigger value="boletines">Boletines</TabsTrigger>
                <TabsTrigger value="noticias">Noticias</TabsTrigger>
              </TabsList>

              {Object.entries(publications).map(([key, items]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                          <div className="relative h-48 overflow-hidden">
                            <div
                              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                              style={{ backgroundImage: `url(${item.imageUrl})` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <div className="flex items-center text-sm text-white/90">
                                <Calendar className="h-4 w-4 mr-2" />
                                {item.date}
                              </div>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
                            <Button
                              className="w-full"
                              onClick={() => item.downloadUrl && handleOpenPublication(item.downloadUrl)}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Ver Publicación
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 