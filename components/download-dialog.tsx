"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormatSelector } from "@/components/format-selector"
import { downloadDataset } from "@/lib/data-generator"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface DownloadDialogProps {
  children: ReactNode
  datasetName: string
  datasetTitle: string
}

export function DownloadDialog({ children, datasetName = "dataset", datasetTitle = "Dataset" }: DownloadDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const { toast } = useToast()
  const abortControllerRef = useRef<AbortController | null>(null)

  // Limpiar el AbortController cuando el componente se desmonte o el diálogo se cierre
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [isOpen])

  const handleDownload = async (format: string) => {
    // Cancelar cualquier solicitud anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Crear un nuevo AbortController
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    setSelectedFormat(format)

    try {
      await downloadDataset(datasetName, format, 20)

      // Verificar si la operación fue abortada
      if (abortControllerRef.current.signal.aborted) {
        throw new DOMException("The operation was aborted", "AbortError")
      }

      // Mostrar notificación de éxito
      toast({
        title: "Descarga completada",
        description: `El archivo se ha descargado correctamente en formato ${format.toUpperCase()}.`,
      })

      // Cerrar el diálogo después de un breve retraso
      setTimeout(() => {
        setIsOpen(false)
      }, 1000)
    } catch (error) {
      // No mostrar error si fue abortado intencionalmente
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Descarga abortada")
        return
      }

      console.error("Error al generar el archivo:", error)

      // Mostrar notificación de error
      toast({
        title: "Error en la descarga",
        description: "Ha ocurrido un error al generar el archivo. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setSelectedFormat(null)
    }
  }

  // Manejar el cierre del diálogo
  const handleOpenChange = (open: boolean) => {
    // Si se está cerrando el diálogo y hay una descarga en curso, abortarla
    if (!open && isLoading && abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsLoading(false)
      setSelectedFormat(null)
    }

    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Descargar dataset</DialogTitle>
          <DialogDescription>
            Selecciona el formato en el que deseas descargar el dataset "{datasetTitle}".
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Estándar</TabsTrigger>
            <TabsTrigger value="advanced">Avanzado</TabsTrigger>
          </TabsList>
          <TabsContent value="standard" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormatSelector
                format="csv"
                title="CSV"
                description="Valores separados por comas"
                onClick={() => handleDownload("csv")}
                isLoading={isLoading && selectedFormat === "csv"}
              />
              <FormatSelector
                format="json"
                title="JSON"
                description="JavaScript Object Notation"
                onClick={() => handleDownload("json")}
                isLoading={isLoading && selectedFormat === "json"}
              />
              <FormatSelector
                format="excel"
                title="Excel"
                description="Hoja de cálculo de Microsoft"
                onClick={() => handleDownload("excel")}
                isLoading={isLoading && selectedFormat === "excel"}
              />
              <FormatSelector
                format="pdf"
                title="PDF"
                description="Documento portable"
                onClick={() => handleDownload("pdf")}
                isLoading={isLoading && selectedFormat === "pdf"}
              />
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormatSelector
                format="geojson"
                title="GeoJSON"
                description="Formato para datos geoespaciales"
                onClick={() => handleDownload("geojson")}
                isLoading={isLoading && selectedFormat === "geojson"}
              />
              <FormatSelector
                format="api"
                title="API"
                description="Acceso programático"
                onClick={() => {
                  toast({
                    title: "API disponible",
                    description: `Endpoint: api.datos.gob.pa/datasets/${datasetName}`,
                  })
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
            Cancelar
          </Button>
          {isLoading && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Descargando...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DownloadDialog
