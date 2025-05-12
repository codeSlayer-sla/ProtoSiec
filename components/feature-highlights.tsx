"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Map, Database, LineChart, PieChart, ArrowRight, Download, Users, Lock, Zap } from "lucide-react"
import { motion } from "framer-motion"

export default function FeatureHighlights() {
  const [activeTab, setActiveTab] = useState("visualizaciones")

  // Función para desplazarse a la sección de visualizaciones avanzadas
  const scrollToVisualizations = () => {
    const visualizationsSection = document.getElementById("visualizations")
    if (visualizationsSection) {
      visualizationsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Características Destacadas
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Nuestro portal ofrece herramientas avanzadas para explorar, analizar y visualizar datos de seguridad pública
          en Panamá.
        </p>
      </div>

      <Tabs defaultValue="visualizaciones" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="visualizaciones">Visualizaciones</TabsTrigger>
          <TabsTrigger value="datos">Conjuntos de Datos</TabsTrigger>
          <TabsTrigger value="herramientas">Herramientas</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizaciones" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <BarChart3 className="h-5 w-5" />
                  Gráficos Interactivos
                </CardTitle>
                <CardDescription>Visualiza tendencias y patrones</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Explora datos a través de gráficos interactivos que te permiten filtrar por año, provincia y tipo de
                  delito. Visualiza tendencias temporales y compara estadísticas entre diferentes regiones.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button className="w-full gap-2" onClick={scrollToVisualizations}>
                  Explorar visualización avanzada
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Map className="h-5 w-5" />
                  Mapas Interactivos
                </CardTitle>
                <CardDescription>Explora datos geoespaciales</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Visualiza la distribución geográfica de incidentes de seguridad en un mapa interactivo de Panamá.
                  Explora datos por provincia y descubre patrones espaciales en las estadísticas de criminalidad.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <Map className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button
                  className="w-full gap-2"
                  onClick={() => {
                    const mapSection = document.getElementById("map")
                    if (mapSection) {
                      mapSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Explorar mapas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <PieChart className="h-5 w-5" />
                  Análisis Comparativo
                </CardTitle>
                <CardDescription>Compara datos entre regiones</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Compara estadísticas entre diferentes provincias, períodos de tiempo y tipos de delitos. Identifica
                  tendencias y patrones para un análisis más profundo de la situación de seguridad.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button
                  className="w-full gap-2"
                  onClick={() => {
                    const statsSection = document.getElementById("statistics")
                    if (statsSection) {
                      statsSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Ver estadísticas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="datos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Database className="h-5 w-5" />
                  Datos Abiertos
                </CardTitle>
                <CardDescription>Acceso completo a datos públicos</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Accede a conjuntos de datos completos sobre estadísticas de criminalidad, informes policiales,
                  tendencias de seguridad y más. Todos los datos están disponibles para su descarga y uso libre.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <Database className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button
                  className="w-full gap-2"
                  onClick={() => {
                    const datasetsSection = document.getElementById("datasets")
                    if (datasetsSection) {
                      datasetsSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Explorar conjuntos de datos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Download className="h-5 w-5" />
                  Múltiples Formatos
                </CardTitle>
                <CardDescription>CSV, JSON, Excel, PDF y más</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Descarga los datos en múltiples formatos para facilitar su análisis e integración en tus proyectos.
                  Disponibles en CSV, JSON, Excel, PDF y GeoJSON para datos geoespaciales.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <Download className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button
                  className="w-full gap-2"
                  onClick={() => {
                    const downloadsSection = document.getElementById("downloads")
                    if (downloadsSection) {
                      downloadsSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Ver formatos disponibles
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Zap className="h-5 w-5" />
                  API para Desarrolladores
                </CardTitle>
                <CardDescription>Integra datos en tus aplicaciones</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Utiliza nuestra API REST para integrar datos de seguridad pública en tus propias aplicaciones y
                  servicios. Documentación completa y ejemplos de código disponibles.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <Zap className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button
                  className="w-full gap-2"
                  onClick={() => {
                    const downloadsSection = document.getElementById("downloads")
                    if (downloadsSection) {
                      downloadsSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Explorar API
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="herramientas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Users className="h-5 w-5" />
                    Colaboración
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                    Nuevo
                  </Badge>
                </div>
                <CardDescription>Comparte y colabora</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Comparte visualizaciones y análisis con otros usuarios. Colabora en proyectos de investigación y
                  genera informes conjuntos basados en los datos disponibles.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <Users className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button className="w-full gap-2" disabled>
                  Próximamente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Lock className="h-5 w-5" />
                    Acceso Seguro
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                    Activo
                  </Badge>
                </div>
                <CardDescription>Protección de datos sensibles</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Todos los datos sensibles están protegidos y anonimizados. El acceso a ciertos conjuntos de datos
                  puede requerir autenticación para garantizar un uso responsable de la información.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <Lock className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button className="w-full gap-2" disabled>
                  Más información
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <LineChart className="h-5 w-5" />
                    Análisis Predictivo
                  </CardTitle>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                    Beta
                  </Badge>
                </div>
                <CardDescription>Tendencias y predicciones</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Utiliza modelos estadísticos avanzados para analizar tendencias y generar predicciones basadas en
                  datos históricos. Identifica patrones emergentes en las estadísticas de seguridad.
                </p>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-md flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-blue-500 opacity-50" />
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-t p-4">
                <Button className="w-full gap-2" disabled>
                  Explorar (Beta)
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Animación de fondo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
