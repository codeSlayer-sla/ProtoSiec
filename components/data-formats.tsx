"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, FileJson, FileSpreadsheet, MapPin, FileCode, FileText, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadJSON, downloadCSV, downloadGeoJSON, downloadExcel, downloadPDF, shareData } from "@/lib/data-generator"
import { toast } from "@/hooks/use-toast"
import { DownloadDialog } from "./download-dialog"

export default function DataFormats() {
  const [activeTab, setActiveTab] = useState("json")
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Limpiar el AbortController cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleDownload = async (format: string) => {
    // Cancelar cualquier solicitud anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Crear un nuevo AbortController
    abortControllerRef.current = new AbortController()

    setIsDownloading((prev) => ({ ...prev, [format]: true }))

    try {
      switch (format) {
        case "json":
          await downloadJSON("estadisticas_criminales", 20)
          break
        case "csv":
          await downloadCSV("estadisticas_criminales", 20)
          break
        case "geojson":
          await downloadGeoJSON("estadisticas_criminales", 20)
          break
        case "excel":
          await downloadExcel("estadisticas_criminales", 20)
          break
        case "pdf":
          await downloadPDF("estadisticas_criminales", 20)
          break
      }

      // Verificar si la operación fue abortada
      if (abortControllerRef.current?.signal.aborted) {
        throw new DOMException("The operation was aborted", "AbortError")
      }

      toast({
        title: "Descarga iniciada",
        description: `El archivo se está descargando en formato ${format.toUpperCase()}`,
      })
    } catch (error) {
      // No mostrar error si fue abortado intencionalmente
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Descarga abortada")
        return
      }

      console.error("Error downloading:", error)
      toast({
        title: "Error en la descarga",
        description: "No se pudo descargar el archivo. Inténtelo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading((prev) => ({ ...prev, [format]: false }))
    }
  }

  const handleShare = async (format: string) => {
    try {
      await shareData("Estadísticas Criminales", format)
      toast({
        title: "Enlace compartido",
        description: "El enlace ha sido copiado al portapapeles",
      })
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
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copiado al portapapeles",
        description: "El código ha sido copiado al portapapeles",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error al copiar:", error)
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar al portapapeles. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  // Resto del componente...

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Formatos de Datos Disponibles</h3>
        <p className="text-muted-foreground">
          Todos nuestros conjuntos de datos están disponibles en múltiples formatos para facilitar su uso en diferentes
          plataformas y aplicaciones.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <DownloadDialog datasetName="conjunto_completo_datos" datasetTitle="Conjunto completo de datos">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Descargar conjunto de datos
          </Button>
        </DownloadDialog>
      </div>

      <Tabs defaultValue="json" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="csv">CSV</TabsTrigger>
          <TabsTrigger value="geojson">GeoJSON</TabsTrigger>
          <TabsTrigger value="excel">Excel</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="json" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileJson className="h-5 w-5 text-blue-500" />
                  Formato JSON
                </CardTitle>
                <CardDescription>JavaScript Object Notation</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                Recomendado para desarrollo web
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                JSON es un formato ligero de intercambio de datos, fácil de leer y escribir para humanos y fácil de
                analizar y generar para máquinas. Es ideal para aplicaciones web y móviles.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Ventajas</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Formato nativo para JavaScript</li>
                    <li>Estructura jerárquica</li>
                    <li>Soporte para tipos de datos complejos</li>
                    <li>Ampliamente utilizado en APIs web</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex justify-between items-center">
                    <span>Ejemplo</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        copyToClipboard(`{
  "id": "crime-001",
  "province": "Panama",
  "year": 2023,
  "crime_type": "theft",
  "count": 245,
  "trend": "+3.2%",
  "location": {
    "lat": 8.9936,
    "lng": -79.5197
  }
}`)
                      }
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-slate-950 text-emerald-300 p-3 rounded-md text-xs overflow-x-auto">
                    {`{
  "id": "crime-001",
  "province": "Panama",
  "year": 2023,
  "crime_type": "theft",
  "count": 245,
  "trend": "+3.2%",
  "location": {
    "lat": 8.9936,
    "lng": -79.5197
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("json")}>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownload("json")}
                  disabled={isDownloading.json}
                >
                  <Download className="h-4 w-4" />
                  {isDownloading.json ? "Descargando..." : "Descargar ejemplo"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csv" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-green-500" />
                  Formato CSV
                </CardTitle>
                <CardDescription>Comma-Separated Values</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                Ideal para hojas de cálculo
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CSV es un formato simple para representar datos tabulares. Cada línea del archivo es un registro de
                datos, y los campos están separados por comas. Es compatible con Excel, Google Sheets y otras
                aplicaciones de hojas de cálculo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Ventajas</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Formato simple y ligero</li>
                    <li>Compatible con hojas de cálculo</li>
                    <li>Fácil de procesar</li>
                    <li>Ideal para análisis estadístico</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex justify-between items-center">
                    <span>Ejemplo</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        copyToClipboard(`id,province,year,crime_type,count,trend
crime-001,Panama,2023,theft,245,+3.2%
crime-002,Panama,2023,robbery,112,-1.8%
crime-003,Colon,2023,theft,98,+0.5%`)
                      }
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-slate-950 text-blue-300 p-3 rounded-md text-xs overflow-x-auto">
                    {`id,province,year,crime_type,count,trend
crime-001,Panama,2023,theft,245,+3.2%
crime-002,Panama,2023,robbery,112,-1.8%
crime-003,Colon,2023,theft,98,+0.5%`}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("csv")}>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownload("csv")}
                  disabled={isDownloading.csv}
                >
                  <Download className="h-4 w-4" />
                  {isDownloading.csv ? "Descargando..." : "Descargar ejemplo"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geojson" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  Formato GeoJSON
                </CardTitle>
                <CardDescription>Datos geoespaciales en formato JSON</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                Perfecto para mapas interactivos
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                GeoJSON es un formato para codificar estructuras de datos geográficos. Es ampliamente utilizado en
                aplicaciones de mapeo y sistemas de información geográfica (GIS).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Ventajas</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Representa datos geoespaciales</li>
                    <li>Compatible con bibliotecas de mapas como Leaflet y Mapbox</li>
                    <li>Soporta puntos, líneas, polígonos y colecciones</li>
                    <li>Ideal para visualización de datos geográficos</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex justify-between items-center">
                    <span>Ejemplo</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        copyToClipboard(`{
  "type": "Feature",
  "properties": {
    "id": "crime-001",
    "province": "Panama",
    "crime_type": "theft",
    "count": 245
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-79.5197, 8.9936]
  }
}`)
                      }
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-slate-950 text-amber-300 p-3 rounded-md text-xs overflow-x-auto">
                    {`{
  "type": "Feature",
  "properties": {
    "id": "crime-001",
    "province": "Panama",
    "crime_type": "theft",
    "count": 245
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-79.5197, 8.9936]
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("geojson")}>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownload("geojson")}
                  disabled={isDownloading.geojson}
                >
                  <Download className="h-4 w-4" />
                  {isDownloading.geojson ? "Descargando..." : "Descargar ejemplo"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="excel" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-green-700" />
                  Formato Excel
                </CardTitle>
                <CardDescription>Microsoft Excel (XLSX)</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                Para análisis detallado
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Los archivos Excel (XLSX) permiten un análisis más avanzado de los datos, con soporte para múltiples
                hojas, fórmulas, gráficos y tablas dinámicas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Ventajas</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Formato nativo de Microsoft Excel</li>
                    <li>Soporte para fórmulas y cálculos</li>
                    <li>Múltiples hojas en un solo archivo</li>
                    <li>Capacidades avanzadas de visualización</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Contenido</h4>
                  <div className="bg-slate-100 p-3 rounded-md text-xs h-[120px] flex items-center justify-center">
                    <div className="text-center">
                      <FileSpreadsheet className="h-10 w-10 text-green-700 mx-auto mb-2" />
                      <span>Archivo Excel con múltiples hojas y datos formateados</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("excel")}>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => handleDownload("excel")}
                  disabled={isDownloading.excel}
                >
                  <Download className="h-4 w-4" />
                  {isDownloading.excel ? "Descargando..." : "Descargar ejemplo"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-purple-500" />
                  API REST
                </CardTitle>
                <CardDescription>Acceso programático a los datos</CardDescription>
              </div>
              <Badge variant="outline" className="px-3 py-1">
                Para desarrolladores
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nuestra API REST permite acceder a los datos de forma programática, ideal para integraciones en
                aplicaciones y análisis automatizados.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Ventajas</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Acceso en tiempo real a los datos</li>
                    <li>Filtrado y búsqueda avanzada</li>
                    <li>Integración con aplicaciones</li>
                    <li>Automatización de procesos</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex justify-between items-center">
                    <span>Ejemplo de solicitud</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        copyToClipboard(`GET /api/v1/statistics?province=panama&year=2023
Authorization: Bearer YOUR_API_KEY
Accept: application/json`)
                      }
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </h4>
                  <pre className="bg-slate-950 text-blue-300 p-3 rounded-md text-xs overflow-x-auto">
                    {`GET /api/v1/statistics?province=panama&year=2023
Authorization: Bearer YOUR_API_KEY
Accept: application/json`}
                  </pre>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("api")}>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => document.getElementById("api-docs")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <FileText className="h-4 w-4" />
                  Ver documentación completa
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* PDF Format Section */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Formato PDF
            </CardTitle>
            <CardDescription>Documentos portátiles para informes y presentaciones</CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Ideal para informes
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Los archivos PDF son ideales para informes y documentación. Mantienen el formato exacto independientemente
            del dispositivo o sistema operativo utilizado para visualizarlos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Ventajas</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Formato universal compatible con cualquier dispositivo</li>
                <li>Mantiene el formato exacto</li>
                <li>Ideal para impresión</li>
                <li>Incluye tablas y gráficos formateados</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Contenido</h4>
              <div className="bg-slate-100 p-3 rounded-md text-xs h-[120px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-primary mx-auto mb-2" />
                  <span>Informe PDF con tablas, gráficos y metadatos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => handleShare("pdf")}>
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => handleDownload("pdf")}
              disabled={isDownloading.pdf}
            >
              <Download className="h-4 w-4" />
              {isDownloading.pdf ? "Generando PDF..." : "Descargar ejemplo"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
