"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Download, Share2, Play, Pause, RotateCcw, Filter, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

// Datos simulados para las visualizaciones
const crimeData = [
  { year: 2019, month: "Ene", theft: 245, robbery: 112, assault: 78, homicide: 12, kidnapping: 3 },
  { year: 2019, month: "Feb", theft: 230, robbery: 105, assault: 82, homicide: 10, kidnapping: 2 },
  { year: 2019, month: "Mar", theft: 260, robbery: 118, assault: 85, homicide: 14, kidnapping: 4 },
  { year: 2019, month: "Abr", theft: 275, robbery: 125, assault: 90, homicide: 11, kidnapping: 3 },
  { year: 2019, month: "May", theft: 290, robbery: 130, assault: 88, homicide: 13, kidnapping: 5 },
  { year: 2019, month: "Jun", theft: 310, robbery: 140, assault: 95, homicide: 15, kidnapping: 4 },
  { year: 2019, month: "Jul", theft: 330, robbery: 145, assault: 100, homicide: 16, kidnapping: 6 },
  { year: 2019, month: "Ago", theft: 320, robbery: 135, assault: 92, homicide: 14, kidnapping: 5 },
  { year: 2019, month: "Sep", theft: 300, robbery: 125, assault: 85, homicide: 12, kidnapping: 4 },
  { year: 2019, month: "Oct", theft: 280, robbery: 120, assault: 80, homicide: 11, kidnapping: 3 },
  { year: 2019, month: "Nov", theft: 260, robbery: 110, assault: 75, homicide: 10, kidnapping: 2 },
  { year: 2019, month: "Dic", theft: 250, robbery: 105, assault: 70, homicide: 9, kidnapping: 2 },

  { year: 2020, month: "Ene", theft: 220, robbery: 100, assault: 70, homicide: 10, kidnapping: 2 },
  { year: 2020, month: "Feb", theft: 210, robbery: 95, assault: 75, homicide: 9, kidnapping: 1 },
  { year: 2020, month: "Mar", theft: 180, robbery: 85, assault: 65, homicide: 8, kidnapping: 2 },
  { year: 2020, month: "Abr", theft: 150, robbery: 70, assault: 55, homicide: 7, kidnapping: 1 },
  { year: 2020, month: "May", theft: 170, robbery: 80, assault: 60, homicide: 8, kidnapping: 2 },
  { year: 2020, month: "Jun", theft: 200, robbery: 90, assault: 70, homicide: 9, kidnapping: 3 },
  { year: 2020, month: "Jul", theft: 230, robbery: 105, assault: 80, homicide: 11, kidnapping: 3 },
  { year: 2020, month: "Ago", theft: 250, robbery: 115, assault: 85, homicide: 12, kidnapping: 4 },
  { year: 2020, month: "Sep", theft: 240, robbery: 110, assault: 80, homicide: 11, kidnapping: 3 },
  { year: 2020, month: "Oct", theft: 220, robbery: 100, assault: 75, homicide: 10, kidnapping: 2 },
  { year: 2020, month: "Nov", theft: 200, robbery: 90, assault: 70, homicide: 9, kidnapping: 2 },
  { year: 2020, month: "Dic", theft: 190, robbery: 85, assault: 65, homicide: 8, kidnapping: 1 },

  { year: 2021, month: "Ene", theft: 200, robbery: 90, assault: 68, homicide: 9, kidnapping: 2 },
  { year: 2021, month: "Feb", theft: 210, robbery: 95, assault: 72, homicide: 10, kidnapping: 2 },
  { year: 2021, month: "Mar", theft: 230, robbery: 105, assault: 78, homicide: 11, kidnapping: 3 },
  { year: 2021, month: "Abr", theft: 250, robbery: 115, assault: 85, homicide: 12, kidnapping: 3 },
  { year: 2021, month: "May", theft: 270, robbery: 125, assault: 90, homicide: 13, kidnapping: 4 },
  { year: 2021, month: "Jun", theft: 290, robbery: 135, assault: 95, homicide: 14, kidnapping: 4 },
  { year: 2021, month: "Jul", theft: 310, robbery: 145, assault: 100, homicide: 15, kidnapping: 5 },
  { year: 2021, month: "Ago", theft: 300, robbery: 140, assault: 95, homicide: 14, kidnapping: 4 },
  { year: 2021, month: "Sep", theft: 280, robbery: 130, assault: 90, homicide: 13, kidnapping: 3 },
  { year: 2021, month: "Oct", theft: 260, robbery: 120, assault: 85, homicide: 12, kidnapping: 3 },
  { year: 2021, month: "Nov", theft: 240, robbery: 110, assault: 80, homicide: 11, kidnapping: 2 },
  { year: 2021, month: "Dic", theft: 230, robbery: 105, assault: 75, homicide: 10, kidnapping: 2 },

  { year: 2022, month: "Ene", theft: 240, robbery: 110, assault: 80, homicide: 11, kidnapping: 3 },
  { year: 2022, month: "Feb", theft: 250, robbery: 115, assault: 85, homicide: 12, kidnapping: 3 },
  { year: 2022, month: "Mar", theft: 270, robbery: 125, assault: 90, homicide: 13, kidnapping: 4 },
  { year: 2022, month: "Abr", theft: 290, robbery: 135, assault: 95, homicide: 14, kidnapping: 4 },
  { year: 2022, month: "May", theft: 310, robbery: 145, assault: 100, homicide: 15, kidnapping: 5 },
  { year: 2022, month: "Jun", theft: 330, robbery: 155, assault: 105, homicide: 16, kidnapping: 5 },
  { year: 2022, month: "Jul", theft: 350, robbery: 165, assault: 110, homicide: 17, kidnapping: 6 },
  { year: 2022, month: "Ago", theft: 340, robbery: 160, assault: 105, homicide: 16, kidnapping: 5 },
  { year: 2022, month: "Sep", theft: 320, robbery: 150, assault: 100, homicide: 15, kidnapping: 4 },
  { year: 2022, month: "Oct", theft: 300, robbery: 140, assault: 95, homicide: 14, kidnapping: 4 },
  { year: 2022, month: "Nov", theft: 280, robbery: 130, assault: 90, homicide: 13, kidnapping: 3 },
  { year: 2022, month: "Dic", theft: 270, robbery: 125, assault: 85, homicide: 12, kidnapping: 3 },

  { year: 2023, month: "Ene", theft: 280, robbery: 130, assault: 90, homicide: 13, kidnapping: 4 },
  { year: 2023, month: "Feb", theft: 290, robbery: 135, assault: 95, homicide: 14, kidnapping: 4 },
  { year: 2023, month: "Mar", theft: 310, robbery: 145, assault: 100, homicide: 15, kidnapping: 5 },
  { year: 2023, month: "Abr", theft: 330, robbery: 155, assault: 105, homicide: 16, kidnapping: 5 },
  { year: 2023, month: "May", theft: 350, robbery: 165, assault: 110, homicide: 17, kidnapping: 6 },
  { year: 2023, month: "Jun", theft: 370, robbery: 175, assault: 115, homicide: 18, kidnapping: 6 },
  { year: 2023, month: "Jul", theft: 390, robbery: 185, assault: 120, homicide: 19, kidnapping: 7 },
  { year: 2023, month: "Ago", theft: 380, robbery: 180, assault: 115, homicide: 18, kidnapping: 6 },
  { year: 2023, month: "Sep", theft: 360, robbery: 170, assault: 110, homicide: 17, kidnapping: 5 },
  { year: 2023, month: "Oct", theft: 340, robbery: 160, assault: 105, homicide: 16, kidnapping: 5 },
  { year: 2023, month: "Nov", theft: 320, robbery: 150, assault: 100, homicide: 15, kidnapping: 4 },
  { year: 2023, month: "Dic", theft: 310, robbery: 145, assault: 95, homicide: 14, kidnapping: 4 },
]

// Datos de provincias
const provinces = [
  { id: "panama", name: "Panamá", population: 1800000 },
  { id: "colon", name: "Colón", population: 290000 },
  { id: "chiriqui", name: "Chiriquí", population: 450000 },
  { id: "veraguas", name: "Veraguas", population: 240000 },
  { id: "cocle", name: "Coclé", population: 260000 },
  { id: "herrera", name: "Herrera", population: 120000 },
  { id: "los_santos", name: "Los Santos", population: 95000 },
  { id: "bocas", name: "Bocas del Toro", population: 170000 },
  { id: "darien", name: "Darién", population: 55000 },
]

// Datos de mapa de calor
const heatmapData = provinces.map((province) => {
  return {
    id: province.id,
    name: province.name,
    theftRate: Math.random() * 100,
    robberyRate: Math.random() * 50,
    assaultRate: Math.random() * 30,
    homicideRate: Math.random() * 10,
    kidnappingRate: Math.random() * 3,
  }
})

export default function AdvancedVisualizations() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedProvince, setSelectedProvince] = useState("panama")
  const [selectedCrimeTypes, setSelectedCrimeTypes] = useState(["theft", "robbery", "assault"])
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeIndex, setTimeIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("line")
  const animationRef = useRef<number | null>(null)
  const { toast } = useToast()
  const abortControllerRef = useRef<AbortController | null>(null)

  // Filtrar datos por año seleccionado
  const filteredData = crimeData.filter((data) => data.year.toString() === selectedYear)

  // Obtener datos para la provincia seleccionada
  const provinceData = heatmapData.find((p) => p.id === selectedProvince) || heatmapData[0]

  // Función para iniciar/detener la animación
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = window.setInterval(() => {
        setTimeIndex((prev) => (prev + 1) % 12) // 12 meses
      }, 1000)
    } else if (animationRef.current) {
      clearInterval(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isPlaying])

  // Función para descargar datos
  const downloadData = useCallback(
    async (format: string) => {
      // Cancelar cualquier solicitud anterior
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      // Crear un nuevo AbortController
      abortControllerRef.current = new AbortController()
      const signal = abortControllerRef.current.signal

      let content = ""
      const filename = `crime_data_${selectedYear}_${selectedProvince}.${format}`
      let mimeType = ""

      try {
        if (format === "csv") {
          // Crear CSV
          const headers = ["month", "theft", "robbery", "assault", "homicide", "kidnapping"]
          content = headers.join(",") + "\n"
          filteredData.forEach((row) => {
            content += `${row.month},${row.theft},${row.robbery},${row.assault},${row.homicide},${row.kidnapping}\n`
          })
          mimeType = "text/csv"
        } else if (format === "json") {
          // Crear JSON
          content = JSON.stringify(filteredData, null, 2)
          mimeType = "application/json"
        } else if (format === "xlsx") {
          // Simulamos la descarga de Excel (en realidad sería necesario usar una librería)
          toast({
            title: "Descarga iniciada",
            description: "Descarga de Excel simulada. En una implementación real, se generaría un archivo XLSX.",
            duration: 3000,
          })
          return
        }

        // Verificar si la operación fue abortada
        if (signal.aborted) {
          throw new DOMException("The operation was aborted", "AbortError")
        }

        // Crear y descargar el archivo
        const blob = new Blob([content], { type: mimeType })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()

        // Limpiar
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 100)

        toast({
          title: "Descarga completada",
          description: `El archivo ${filename} se ha descargado correctamente.`,
          duration: 3000,
        })
      } catch (error) {
        // No mostrar error si fue abortado intencionalmente
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Descarga abortada")
          return
        }

        console.error("Error al descargar:", error)
        toast({
          title: "Error en la descarga",
          description: "Ha ocurrido un error al descargar el archivo. Por favor, inténtalo de nuevo.",
          variant: "destructive",
          duration: 3000,
        })
      }
    },
    [filteredData, selectedProvince, selectedYear, toast],
  )

  // Limpiar el AbortController cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // Función para compartir visualización
  const shareVisualization = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Datos de criminalidad ${selectedYear} - ${selectedProvince}`,
          text: "Mira estos datos de criminalidad del Portal de Datos Abiertos",
          url: window.location.href,
        })
      } else {
        // Fallback para navegadores que no soportan Web Share API
        const shareUrl = window.location.href
        await navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Enlace copiado",
          description: "URL copiada al portapapeles",
          duration: 3000,
        })
      }
    } catch (error) {
      // No mostrar error si el usuario canceló la acción de compartir
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Compartir abortado por el usuario")
        return
      }

      console.error("Error al compartir:", error)
      toast({
        title: "Error al compartir",
        description: "No se pudo compartir el contenido. Por favor, inténtalo de nuevo.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }, [selectedProvince, selectedYear, toast])

  // Función para resetear filtros
  const resetFilters = useCallback(() => {
    setSelectedYear("2023")
    setSelectedProvince("panama")
    setSelectedCrimeTypes(["theft", "robbery", "assault"])
    setTimeIndex(0)
    setIsPlaying(false)

    toast({
      title: "Filtros restablecidos",
      description: "Todos los filtros han sido restablecidos a sus valores predeterminados.",
      duration: 3000,
    })
  }, [toast])

  // Función para alternar tipos de crimen
  const toggleCrimeType = useCallback((type: string) => {
    setSelectedCrimeTypes((prev) => {
      if (prev.includes(type)) {
        if (prev.length > 1) {
          return prev.filter((t) => t !== type)
        }
        return prev
      } else {
        return [...prev, type]
      }
    })
  }, [])

  // Colores para los diferentes tipos de crimen
  const crimeColors = {
    theft: "#3b82f6", // blue
    robbery: "#ef4444", // red
    assault: "#10b981", // green
    homicide: "#8b5cf6", // purple
    kidnapping: "#f59e0b", // amber
  }

  // Nombres en español para los tipos de crimen
  const crimeNames = {
    theft: "Hurtos",
    robbery: "Robos",
    assault: "Agresiones",
    homicide: "Homicidios",
    kidnapping: "Secuestros",
  }

  return (
    <div className="space-y-6" id="visualizations">
      <div className="space-y-2 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Visualización Avanzada de Datos
        </h2>
        <p className="text-muted-foreground">
          Explora nuestros datos a través de visualizaciones interactivas avanzadas con animaciones, filtros y
          comparativas.
        </p>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg rounded-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-blue-700 dark:text-blue-300">Panel de Control</CardTitle>
              <CardDescription>Configura los parámetros de visualización</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {isPlaying ? "Pausar" : "Reproducir"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Resetear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <Filter className="h-4 w-4 mr-1" />
                Filtros
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-blue-900/20 transition-all duration-200"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Formato de descarga</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => downloadData("csv")}>CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadData("json")}>JSON</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadData("xlsx")}>Excel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                onClick={shareVisualization}
                className="bg-white hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Compartir
              </Button>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/10 dark:to-indigo-950/10 border-b">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block text-blue-700 dark:text-blue-300">Año</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-900/50">
                        <SelectValue placeholder="Seleccionar año" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2019">2019</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block text-blue-700 dark:text-blue-300">Provincia</label>
                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                      <SelectTrigger className="bg-white dark:bg-gray-900 border-blue-200 dark:border-blue-900/50">
                        <SelectValue placeholder="Seleccionar provincia" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block text-blue-700 dark:text-blue-300">
                      Línea de tiempo
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{filteredData[timeIndex]?.month || "Ene"}</span>
                      <Slider
                        value={[timeIndex]}
                        max={11}
                        step={1}
                        onValueChange={(value) => setTimeIndex(value[0])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block text-blue-700 dark:text-blue-300">
                    Tipos de delitos
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(crimeNames).map(([key, name]) => (
                      <Badge
                        key={key}
                        variant={selectedCrimeTypes.includes(key) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedCrimeTypes.includes(key)
                            ? `bg-${key === "theft" ? "blue" : key === "robbery" ? "red" : key === "assault" ? "green" : key === "homicide" ? "purple" : "amber"}-100 hover:bg-${key === "theft" ? "blue" : key === "robbery" ? "red" : key === "assault" ? "green" : key === "homicide" ? "purple" : "amber"}-200 text-${key === "theft" ? "blue" : key === "robbery" ? "red" : key === "assault" ? "green" : key === "homicide" ? "purple" : "amber"}-700 border-${key === "theft" ? "blue" : key === "robbery" ? "red" : key === "assault" ? "green" : key === "homicide" ? "purple" : "amber"}-200`
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        style={{
                          backgroundColor: selectedCrimeTypes.includes(key)
                            ? `${crimeColors[key as keyof typeof crimeColors]}20`
                            : "",
                          color: selectedCrimeTypes.includes(key) ? crimeColors[key as keyof typeof crimeColors] : "",
                          borderColor: selectedCrimeTypes.includes(key)
                            ? `${crimeColors[key as keyof typeof crimeColors]}40`
                            : "",
                        }}
                        onClick={() => toggleCrimeType(key)}
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="line"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent dark:data-[state=active]:text-blue-300"
              >
                Líneas
              </TabsTrigger>
              <TabsTrigger
                value="bar"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent dark:data-[state=active]:text-blue-300"
              >
                Barras
              </TabsTrigger>
              <TabsTrigger
                value="heatmap"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent dark:data-[state=active]:text-blue-300"
              >
                Mapa de calor
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent dark:data-[state=active]:text-blue-300"
              >
                Comparativa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="line" className="p-4">
              <div className="h-[500px] w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-inner">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                  {/* Ejes */}
                  <line x1="50" y1="450" x2="750" y2="450" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="50" y1="50" x2="50" y2="450" stroke="#94a3b8" strokeWidth="1" />

                  {/* Etiquetas eje X */}
                  {filteredData.map((data, i) => (
                    <text
                      key={`x-${i}`}
                      x={50 + i * (700 / 11)}
                      y="470"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#64748b"
                    >
                      {data.month}
                    </text>
                  ))}

                  {/* Etiquetas eje Y */}
                  {[0, 100, 200, 300, 400].map((value, i) => (
                    <g key={`y-${i}`}>
                      <text x="40" y={450 - (value * 400) / 400} textAnchor="end" fontSize="12" fill="#64748b">
                        {value}
                      </text>
                      <line
                        x1="45"
                        y1={450 - (value * 400) / 400}
                        x2="750"
                        y2={450 - (value * 400) / 400}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* Líneas para cada tipo de delito seleccionado */}
                  {selectedCrimeTypes.includes("theft") && (
                    <>
                      <path
                        d={`M ${50} ${450 - (filteredData[0]?.theft * 400) / 400} ${filteredData
                          .map((data, i) => `L ${50 + i * (700 / 11)} ${450 - (data.theft * 400) / 400}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={crimeColors.theft}
                        strokeWidth="3"
                      />
                      {filteredData.map((data, i) => (
                        <circle
                          key={`theft-${i}`}
                          cx={50 + i * (700 / 11)}
                          cy={450 - (data.theft * 400) / 400}
                          r="4"
                          fill={crimeColors.theft}
                        />
                      ))}
                    </>
                  )}

                  {selectedCrimeTypes.includes("robbery") && (
                    <>
                      <path
                        d={`M ${50} ${450 - (filteredData[0]?.robbery * 400) / 400} ${filteredData
                          .map((data, i) => `L ${50 + i * (700 / 11)} ${450 - (data.robbery * 400) / 400}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={crimeColors.robbery}
                        strokeWidth="3"
                      />
                      {filteredData.map((data, i) => (
                        <circle
                          key={`robbery-${i}`}
                          cx={50 + i * (700 / 11)}
                          cy={450 - (data.robbery * 400) / 400}
                          r="4"
                          fill={crimeColors.robbery}
                        />
                      ))}
                    </>
                  )}

                  {selectedCrimeTypes.includes("assault") && (
                    <>
                      <path
                        d={`M ${50} ${450 - (filteredData[0]?.assault * 400) / 400} ${filteredData
                          .map((data, i) => `L ${50 + i * (700 / 11)} ${450 - (data.assault * 400) / 400}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={crimeColors.assault}
                        strokeWidth="3"
                      />
                      {filteredData.map((data, i) => (
                        <circle
                          key={`assault-${i}`}
                          cx={50 + i * (700 / 11)}
                          cy={450 - (data.assault * 400) / 400}
                          r="4"
                          fill={crimeColors.assault}
                        />
                      ))}
                    </>
                  )}

                  {selectedCrimeTypes.includes("homicide") && (
                    <>
                      <path
                        d={`M ${50} ${450 - (filteredData[0]?.homicide * 400) / 400} ${filteredData
                          .map((data, i) => `L ${50 + i * (700 / 11)} ${450 - (data.homicide * 400) / 400}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={crimeColors.homicide}
                        strokeWidth="3"
                      />
                      {filteredData.map((data, i) => (
                        <circle
                          key={`homicide-${i}`}
                          cx={50 + i * (700 / 11)}
                          cy={450 - (data.homicide * 400) / 400}
                          r="4"
                          fill={crimeColors.homicide}
                        />
                      ))}
                    </>
                  )}

                  {selectedCrimeTypes.includes("kidnapping") && (
                    <>
                      <path
                        d={`M ${50} ${450 - (filteredData[0]?.kidnapping * 400) / 400} ${filteredData
                          .map((data, i) => `L ${50 + i * (700 / 11)} ${450 - (data.kidnapping * 400) / 400}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={crimeColors.kidnapping}
                        strokeWidth="3"
                      />
                      {filteredData.map((data, i) => (
                        <circle
                          key={`kidnapping-${i}`}
                          cx={50 + i * (700 / 11)}
                          cy={450 - (data.kidnapping * 400) / 400}
                          r="4"
                          fill={crimeColors.kidnapping}
                        />
                      ))}
                    </>
                  )}

                  {/* Indicador de tiempo actual */}
                  <line
                    x1={50 + timeIndex * (700 / 11)}
                    y1="50"
                    x2={50 + timeIndex * (700 / 11)}
                    y2="450"
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <circle cx={50 + timeIndex * (700 / 11)} cy="450" r="6" fill="#475569" />

                  {/* Leyenda */}
                  <g transform="translate(600, 80)">
                    <rect x="-10" y="-30" width="150" height="140" rx="5" fill="white" fillOpacity="0.8" />
                    <text x="0" y="-15" fontSize="14" fontWeight="bold" fill="#64748b">
                      Leyenda
                    </text>
                    {selectedCrimeTypes.includes("theft") && (
                      <g transform="translate(0, 0)">
                        <rect width="15" height="15" fill={crimeColors.theft} />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Hurtos
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("robbery") && (
                      <g transform="translate(0, 25)">
                        <rect width="15" height="15" fill={crimeColors.robbery} />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Robos
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("assault") && (
                      <g transform="translate(0, 50)">
                        <rect width="15" height="15" fill={crimeColors.assault} />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Agresiones
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("homicide") && (
                      <g transform="translate(0, 75)">
                        <rect width="15" height="15" fill={crimeColors.homicide} />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Homicidios
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("kidnapping") && (
                      <g transform="translate(0, 100)">
                        <rect width="15" height="15" fill={crimeColors.kidnapping} />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Secuestros
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </TabsContent>

            <TabsContent value="bar" className="p-4">
              <div className="h-[500px] w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-inner">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                  {/* Ejes */}
                  <line x1="50" y1="450" x2="750" y2="450" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="50" y1="50" x2="50" y2="450" stroke="#94a3b8" strokeWidth="1" />

                  {/* Etiquetas eje X */}
                  {filteredData.map((data, i) => (
                    <text
                      key={`x-${i}`}
                      x={50 + i * (700 / 11) + 30}
                      y="470"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#64748b"
                    >
                      {data.month}
                    </text>
                  ))}

                  {/* Etiquetas eje Y */}
                  {[0, 100, 200, 300, 400].map((value, i) => (
                    <g key={`y-${i}`}>
                      <text x="40" y={450 - (value * 400) / 400} textAnchor="end" fontSize="12" fill="#64748b">
                        {value}
                      </text>
                      <line
                        x1="45"
                        y1={450 - (value * 400) / 400}
                        x2="750"
                        y2={450 - (value * 400) / 400}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* Barras para cada mes */}
                  {filteredData.map((data, i) => {
                    const barWidth = 10
                    const barSpacing = 2
                    const groupWidth = selectedCrimeTypes.length * (barWidth + barSpacing) - barSpacing
                    const groupStart = 50 + i * (700 / 11) - groupWidth / 2 + 30

                    return (
                      <g key={`bars-${i}`}>
                        {selectedCrimeTypes.includes("theft") && (
                          <rect
                            x={groupStart}
                            y={450 - (data.theft * 400) / 400}
                            width={barWidth}
                            height={(data.theft * 400) / 400}
                            fill={crimeColors.theft}
                            rx={2}
                          >
                            <title>{`Hurtos: ${data.theft}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("robbery") && (
                          <rect
                            x={groupStart + (barWidth + barSpacing) * selectedCrimeTypes.indexOf("robbery")}
                            y={450 - (data.robbery * 400) / 400}
                            width={barWidth}
                            height={(data.robbery * 400) / 400}
                            fill={crimeColors.robbery}
                            rx={2}
                          >
                            <title>{`Robos: ${data.robbery}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("assault") && (
                          <rect
                            x={groupStart + (barWidth + barSpacing) * selectedCrimeTypes.indexOf("assault")}
                            y={450 - (data.assault * 400) / 400}
                            width={barWidth}
                            height={(data.assault * 400) / 400}
                            fill={crimeColors.assault}
                            rx={2}
                          >
                            <title>{`Agresiones: ${data.assault}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("homicide") && (
                          <rect
                            x={groupStart + (barWidth + barSpacing) * selectedCrimeTypes.indexOf("homicide")}
                            y={450 - (data.homicide * 400) / 400}
                            width={barWidth}
                            height={(data.homicide * 400) / 400}
                            fill={crimeColors.homicide}
                            rx={2}
                          >
                            <title>{`Homicidios: ${data.homicide}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("kidnapping") && (
                          <rect
                            x={groupStart + (barWidth + barSpacing) * selectedCrimeTypes.indexOf("kidnapping")}
                            y={450 - (data.kidnapping * 400) / 400}
                            width={barWidth}
                            height={(data.kidnapping * 400) / 400}
                            fill={crimeColors.kidnapping}
                            rx={2}
                          >
                            <title>{`Secuestros: ${data.kidnapping}`}</title>
                          </rect>
                        )}
                      </g>
                    )
                  })}

                  {/* Indicador de tiempo actual */}
                  <line
                    x1={50 + timeIndex * (700 / 11) + 30}
                    y1="50"
                    x2={50 + timeIndex * (700 / 11) + 30}
                    y2="450"
                    stroke="#475569"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />

                  {/* Leyenda */}
                  <g transform="translate(600, 80)">
                    <rect x="-10" y="-30" width="150" height="140" rx="5" fill="white" fillOpacity="0.8" />
                    <text x="0" y="-15" fontSize="14" fontWeight="bold" fill="#64748b">
                      Leyenda
                    </text>
                    {selectedCrimeTypes.includes("theft") && (
                      <g transform="translate(0, 0)">
                        <rect width="15" height="15" fill={crimeColors.theft} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Hurtos
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("robbery") && (
                      <g transform="translate(0, 25)">
                        <rect width="15" height="15" fill={crimeColors.robbery} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Robos
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("assault") && (
                      <g transform="translate(0, 50)">
                        <rect width="15" height="15" fill={crimeColors.assault} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Agresiones
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("homicide") && (
                      <g transform="translate(0, 75)">
                        <rect width="15" height="15" fill={crimeColors.homicide} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Homicidios
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("kidnapping") && (
                      <g transform="translate(0, 100)">
                        <rect width="15" height="15" fill={crimeColors.kidnapping} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Secuestros
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </TabsContent>

            <TabsContent value="heatmap" className="p-4">
              <div className="h-[500px] w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-inner">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                  {/* Mapa simplificado de Panamá */}
                  <path
                    d="M100,150 C150,100 250,80 350,100 C450,120 550,150 650,130 C700,120 750,150 780,200 C750,250 700,280 650,270 C550,250 450,280 350,300 C250,320 150,300 100,250 C80,200 80,180 100,150Z"
                    fill="#e2e8f0"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />

                  {/* Puntos de calor para cada provincia */}
                  {heatmapData.map((province, i) => {
                    // Posiciones simuladas para cada provincia
                    const positions = [
                      { x: 500, y: 180 }, // Panamá
                      { x: 600, y: 150 }, // Colón
                      { x: 200, y: 200 }, // Chiriquí
                      { x: 300, y: 220 }, // Veraguas
                      { x: 400, y: 180 }, // Coclé
                      { x: 350, y: 250 }, // Herrera
                      { x: 300, y: 280 }, // Los Santos
                      { x: 150, y: 150 }, // Bocas del Toro
                      { x: 650, y: 220 }, // Darién
                    ]

                    const pos = positions[i]

                    // Determinar el radio y opacidad basado en el tipo de crimen seleccionado
                    let radius = 0
                    let opacity = 0

                    if (selectedCrimeTypes.includes("theft")) {
                      radius = Math.max(radius, province.theftRate / 3)
                      opacity = Math.max(opacity, province.theftRate / 100)
                    }
                    if (selectedCrimeTypes.includes("robbery")) {
                      radius = Math.max(radius, province.robberyRate / 1.5)
                      opacity = Math.max(opacity, province.robberyRate / 50)
                    }
                    if (selectedCrimeTypes.includes("assault")) {
                      radius = Math.max(radius, province.assaultRate)
                      opacity = Math.max(opacity, province.assaultRate / 30)
                    }
                    if (selectedCrimeTypes.includes("homicide")) {
                      radius = Math.max(radius, province.homicideRate * 3)
                      opacity = Math.max(opacity, province.homicideRate / 10)
                    }
                    if (selectedCrimeTypes.includes("kidnapping")) {
                      radius = Math.max(radius, province.kidnappingRate * 10)
                      opacity = Math.max(opacity, province.kidnappingRate / 3)
                    }

                    return (
                      <g key={`province-${province.id}`}>
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={radius}
                          fill="url(#grad1)"
                          opacity={opacity}
                          className="transition-all duration-500"
                        >
                          <title>{`${province.name}: Índice de criminalidad ${Math.round(opacity * 100)}%`}</title>
                        </circle>
                        <text
                          x={pos.x}
                          y={pos.y + 40}
                          textAnchor="middle"
                          fontSize="12"
                          fill="#475569"
                          fontWeight={province.id === selectedProvince ? "bold" : "normal"}
                          className={province.id === selectedProvince ? "text-blue-700" : ""}
                        >
                          {province.name}
                        </text>
                        {province.id === selectedProvince && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={radius + 5}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    )
                  })}

                  {/* Gradiente para los puntos de calor */}
                  <defs>
                    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" style={{ stopColor: "rgb(239, 68, 68)", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "rgb(239, 68, 68)", stopOpacity: 0 }} />
                    </radialGradient>
                  </defs>

                  {/* Leyenda */}
                  <g transform="translate(650, 400)">
                    <rect x="-10" y="-15" width="120" height="65" rx="5" fill="white" fillOpacity="0.8" />
                    <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#64748b">
                      Intensidad
                    </text>
                    <rect x="0" y="10" width="20" height="10" fill="#ef4444" opacity="0.3" />
                    <rect x="20" y="10" width="20" height="10" fill="#ef4444" opacity="0.5" />
                    <rect x="40" y="10" width="20" height="10" fill="#ef4444" opacity="0.7" />
                    <rect x="60" y="10" width="20" height="10" fill="#ef4444" opacity="0.9" />
                    <text x="0" y="35" fontSize="12" fill="#64748b">
                      Baja
                    </text>
                    <text x="80" y="35" fontSize="12" textAnchor="end" fill="#64748b">
                      Alta
                    </text>
                  </g>
                </svg>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="p-4">
              <div className="h-[500px] w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-inner">
                <svg viewBox="0 0 800 500" className="w-full h-full">
                  {/* Ejes */}
                  <line x1="100" y1="450" x2="700" y2="450" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="100" y1="50" x2="100" y2="450" stroke="#94a3b8" strokeWidth="1" />

                  {/* Título */}
                  <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">
                    Comparativa de Delitos por Provincia ({selectedYear})
                  </text>

                  {/* Etiquetas eje Y */}
                  {[0, 20, 40, 60, 80, 100].map((value, i) => (
                    <g key={`y-${i}`}>
                      <text x="90" y={450 - (value * 400) / 100} textAnchor="end" fontSize="12" fill="#64748b">
                        {value}
                      </text>
                      <line
                        x1="95"
                        y1={450 - (value * 400) / 100}
                        x2="700"
                        y2={450 - (value * 400) / 100}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* Barras para cada provincia */}
                  {heatmapData.map((province, i) => {
                    const barWidth = 50
                    const barSpacing = 10
                    const x = 150 + i * (barWidth + barSpacing)

                    return (
                      <g key={`province-bar-${province.id}`}>
                        {/* Etiqueta de provincia */}
                        <text
                          x={x + barWidth / 2}
                          y="470"
                          textAnchor="middle"
                          fontSize="12"
                          fill={province.id === selectedProvince ? "#3b82f6" : "#64748b"}
                          fontWeight={province.id === selectedProvince ? "bold" : "normal"}
                        >
                          {province.name.length > 8 ? province.name.substring(0, 8) + "..." : province.name}
                        </text>

                        {/* Barras apiladas para cada tipo de delito */}
                        {selectedCrimeTypes.includes("theft") && (
                          <rect
                            x={x}
                            y={450 - (province.theftRate * 400) / 100}
                            width={barWidth}
                            height={(province.theftRate * 400) / 100}
                            fill={crimeColors.theft}
                            rx="2"
                            className={province.id === selectedProvince ? "stroke-2 stroke-blue-600" : ""}
                          >
                            <title>{`${province.name} - Hurtos: ${Math.round(province.theftRate)}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("robbery") && (
                          <rect
                            x={x}
                            y={450 - ((province.theftRate + province.robberyRate) * 400) / 100}
                            width={barWidth}
                            height={(province.robberyRate * 400) / 100}
                            fill={crimeColors.robbery}
                            rx="2"
                            className={province.id === selectedProvince ? "stroke-2 stroke-blue-600" : ""}
                          >
                            <title>{`${province.name} - Robos: ${Math.round(province.robberyRate)}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("assault") && (
                          <rect
                            x={x}
                            y={450 - ((province.theftRate + province.robberyRate + province.assaultRate) * 400) / 100}
                            width={barWidth}
                            height={(province.assaultRate * 400) / 100}
                            fill={crimeColors.assault}
                            rx="2"
                            className={province.id === selectedProvince ? "stroke-2 stroke-blue-600" : ""}
                          >
                            <title>{`${province.name} - Agresiones: ${Math.round(province.assaultRate)}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("homicide") && (
                          <rect
                            x={x}
                            y={
                              450 -
                              ((province.theftRate +
                                province.robberyRate +
                                province.assaultRate +
                                province.homicideRate) *
                                400) /
                                100
                            }
                            width={barWidth}
                            height={(province.homicideRate * 400) / 100}
                            fill={crimeColors.homicide}
                            rx="2"
                            className={province.id === selectedProvince ? "stroke-2 stroke-blue-600" : ""}
                          >
                            <title>{`${province.name} - Homicidios: ${Math.round(province.homicideRate)}`}</title>
                          </rect>
                        )}
                        {selectedCrimeTypes.includes("kidnapping") && (
                          <rect
                            x={x}
                            y={
                              450 -
                              ((province.theftRate +
                                province.robberyRate +
                                province.assaultRate +
                                province.homicideRate +
                                province.kidnappingRate) *
                                400) /
                                100
                            }
                            width={barWidth}
                            height={(province.kidnappingRate * 400) / 100}
                            fill={crimeColors.kidnapping}
                            rx="2"
                            className={province.id === selectedProvince ? "stroke-2 stroke-blue-600" : ""}
                          >
                            <title>{`${province.name} - Secuestros: ${Math.round(province.kidnappingRate)}`}</title>
                          </rect>
                        )}

                        {/* Resaltado para la provincia seleccionada */}
                        {province.id === selectedProvince && (
                          <rect
                            x={x - 2}
                            y={48}
                            width={barWidth + 4}
                            height={404}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            rx="4"
                          />
                        )}
                      </g>
                    )
                  })}

                  {/* Leyenda */}
                  <g transform="translate(600, 80)">
                    <rect x="-10" y="-30" width="150" height="140" rx="5" fill="white" fillOpacity="0.8" />
                    <text x="0" y="-15" fontSize="14" fontWeight="bold" fill="#64748b">
                      Leyenda
                    </text>
                    {selectedCrimeTypes.includes("theft") && (
                      <g transform="translate(0, 0)">
                        <rect width="15" height="15" fill={crimeColors.theft} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Hurtos
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("robbery") && (
                      <g transform="translate(0, 25)">
                        <rect width="15" height="15" fill={crimeColors.robbery} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Robos
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("assault") && (
                      <g transform="translate(0, 50)">
                        <rect width="15" height="15" fill={crimeColors.assault} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Agresiones
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("homicide") && (
                      <g transform="translate(0, 75)">
                        <rect width="15" height="15" fill={crimeColors.homicide} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Homicidios
                        </text>
                      </g>
                    )}
                    {selectedCrimeTypes.includes("kidnapping") && (
                      <g transform="translate(0, 100)">
                        <rect width="15" height="15" fill={crimeColors.kidnapping} rx="2" />
                        <text x="25" y="12" fontSize="12" fill="#64748b">
                          Secuestros
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
