"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Share2, Bookmark, BookmarkCheck } from "lucide-react"
// Importando correctamente DownloadDialog
import DownloadDialog from "@/components/download-dialog"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Actualizar la interfaz DatasetCardProps para hacer category opcional y añadir valores por defecto
interface DatasetCardProps {
  title?: string
  description?: string
  category?: string
  updatedAt?: string
  recordCount?: number
  id?: string
  icon?: ReactNode
  color?: string
  count?: number
  data?: any[]
  dataset?: {
    id: string
    title: string
    description: string
    date: string
    category: string
    tags: string[]
    downloads: number
    source: string
    data: any[]
  }
}

// Actualizar la función del componente para manejar valores por defecto
function DatasetCard({
  title,
  description,
  category = "general",
  updatedAt = "Reciente",
  recordCount = 0,
  id = "",
  icon,
  color = "bg-slate-700",
  count,
  data = [],
  dataset,
}: DatasetCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  // Si tenemos un dataset completo, usamos sus propiedades
  const datasetTitle = dataset?.title || title || "Dataset sin título"
  const datasetDescription = dataset?.description || description || "Sin descripción disponible"
  const datasetCategory = dataset?.category || category
  const datasetId = dataset?.id || id || "dataset"

  // Usar el valor de count si está definido, de lo contrario usar recordCount
  const dataCount = count !== undefined ? count : dataset?.downloads || recordCount

  const getCategoryColor = (cat: string) => {
    const categories: Record<string, string> = {
      Seguridad: "bg-red-100 text-red-800 border-red-200",
      Salud: "bg-green-100 text-green-800 border-green-200",
      Educación: "bg-blue-100 text-blue-800 border-blue-200",
      Economía: "bg-amber-100 text-amber-800 border-amber-200",
      Transporte: "bg-purple-100 text-purple-800 border-purple-200",
      Ambiente: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Gobierno: "bg-slate-100 text-slate-800 border-slate-200",
      General: "bg-gray-100 text-gray-800 border-gray-200",
    }
    // Ensure consistent capitalization
    const normalizedCategory = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()
    return categories[normalizedCategory] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Dataset eliminado de guardados" : "Dataset guardado",
      description: isSaved
        ? "El dataset ha sido eliminado de tu lista de guardados"
        : "El dataset ha sido añadido a tu lista de guardados",
    })
  }

  const handleShare = () => {
    // Copiar al portapapeles la URL actual + el ID del dataset
    const url = `${window.location.origin}/datasets/${datasetId}`
    navigator.clipboard.writeText(url)
    toast({
      title: "Enlace copiado",
      description: "El enlace al dataset ha sido copiado al portapapeles",
    })
  }

  // Si tenemos un dataset completo, renderizamos la versión original
  if (dataset) {
    return (
      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        <Card className="h-full overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <Badge variant="outline" className={`mb-2 w-fit ${getCategoryColor(dataset.category)}`}>
                {dataset.category}
              </Badge>
              <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8">
                {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              </Button>
            </div>
            <CardTitle className="line-clamp-2">{dataset.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              {dataset.date} • {dataset.downloads} descargas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-sm text-muted-foreground">{dataset.description}</p>
            <div className="mt-4 flex flex-wrap gap-1">
              {dataset.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {dataset.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{dataset.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 border-t bg-muted/50 p-3">
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ExternalLink className="mr-1 h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline">Ver</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleShare}>
                <Share2 className="mr-1 h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:inline">Compartir</span>
              </Button>
            </div>
            <DownloadDialog datasetName={dataset.id} datasetTitle={dataset.title}>
              <Button size="sm" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </DownloadDialog>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  // Determinar qué versión del componente renderizar basado en las props recibidas
  if (icon && color) {
    // Versión original del componente con icon y color
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardHeader className={`${color} text-white`}>
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-xl font-bold">{datasetTitle}</h3>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-muted-foreground">{datasetDescription}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-4 bg-muted/30">
            <span className="text-sm font-medium">{dataCount.toLocaleString()} registros</span>
            <DownloadDialog datasetName={datasetId} datasetTitle={datasetTitle}>
              <Button variant="ghost" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </DownloadDialog>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  // Nueva versión del componente con category y updatedAt
  return (
    <Card className="overflow-hidden border border-slate-200 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{datasetTitle}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={`${getCategoryColor(datasetCategory)} border`}>{datasetCategory}</Badge>
            <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8 -mr-2">
              {isSaved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <CardDescription>{datasetDescription}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Actualizado</p>
            <p className="font-medium">{updatedAt}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Registros</p>
            <p className="font-medium">{dataCount.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">Ver detalles</span>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartir</span>
          </Button>
          <DownloadDialog datasetName={datasetId} datasetTitle={datasetTitle}>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Descargar</span>
            </Button>
          </DownloadDialog>
        </div>
      </CardFooter>
    </Card>
  )
}

// Exportando como default y como exportación con nombre
export { DatasetCard }
export default DatasetCard
