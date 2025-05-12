import type { Metadata } from "next"
import DatasetsGrid from "@/components/datasets-grid"
// Importando correctamente DownloadDialog
import DownloadDialog from "@/components/download-dialog"
import { Button } from "@/components/ui/button"
import { Database } from "lucide-react"
import GridPanamaMap from "@/components/grid-panama-map"

export const metadata: Metadata = {
  title: "Conjuntos de Datos | Portal de Datos Abiertos",
  description: "Explora y descarga conjuntos de datos abiertos del gobierno de Panamá",
}

export default function DatasetsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conjuntos de Datos</h1>
          <p className="text-muted-foreground mt-1">
            Explora y descarga datos abiertos del Sistema Integrado de Estadísticas Criminales
          </p>
        </div>
        <DownloadDialog datasetName="conjunto_completo" datasetTitle="Conjunto completo de datos">
          <Button className="gap-2">
            <Database className="h-4 w-4" />
            Descargar todos los datos
          </Button>
        </DownloadDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <DatasetsGrid />
        </div>
        <div>
          <GridPanamaMap />
        </div>
      </div>
    </div>
  )
}
