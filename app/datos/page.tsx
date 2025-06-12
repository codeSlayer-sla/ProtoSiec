import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import DatasetsGrid from "@/components/datasets-grid"
import DataFormats from "@/components/data-formats"
import ApiDocumentation from "@/components/api-documentation"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Datos Abiertos | SIEC",
  description: "Accede a nuestra colección completa de datos sobre seguridad pública, estadísticas criminales y más.",
}

export default function DatosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container">
            <h1 className="mb-8 text-center text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Catálogo de Datos Abiertos
            </h1>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Accede a nuestra colección completa de datos sobre seguridad pública, estadísticas criminales y más.
              Disponibles en múltiples formatos para su análisis e integración.
            </p>
            <DatasetsGrid />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20">
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Formatos y Descargas
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Descarga nuestros datos en múltiples formatos para facilitar su análisis e integración en tus proyectos.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Formatos Disponibles</h3>
                <DataFormats />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">API para Desarrolladores</h3>
                <ApiDocumentation />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Toaster />
    </div>
  )
} 