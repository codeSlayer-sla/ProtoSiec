"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import DatasetCard from "@/components/dataset-card"

// Datos de ejemplo para los datasets
const mockDatasets = [
  {
    id: "criminalidad-panama",
    title: "Estadísticas de Criminalidad en Panamá",
    description:
      "Datos sobre incidentes criminales reportados en las diferentes provincias de Panamá, incluyendo tipo de delito, ubicación y fecha.",
    date: "2023-05-15",
    category: "Seguridad",
    tags: ["criminalidad", "seguridad", "policía", "estadísticas"],
    downloads: 1245,
    source: "SIEC",
    data: [],
  },
  {
    id: "hospitales-panama",
    title: "Red de Hospitales Públicos",
    description:
      "Información sobre la red de hospitales públicos en Panamá, incluyendo ubicación, especialidades, capacidad y servicios disponibles.",
    date: "2023-04-22",
    category: "Salud",
    tags: ["hospitales", "salud", "medicina", "infraestructura"],
    downloads: 876,
    source: "SIEC",
    data: [],
  },
  {
    id: "escuelas-panama",
    title: "Centros Educativos Nacionales",
    description:
      "Listado completo de escuelas y colegios públicos y privados en Panamá, con información sobre nivel educativo, ubicación y matrícula.",
    date: "2023-06-10",
    category: "Educación",
    tags: ["educación", "escuelas", "colegios", "estudiantes"],
    downloads: 1032,
    source: "SIEC",
    data: [],
  },
  {
    id: "economia-panama",
    title: "Indicadores Económicos",
    description:
      "Datos sobre indicadores económicos clave de Panamá, incluyendo PIB, inflación, empleo y comercio exterior.",
    date: "2023-07-01",
    category: "Economía",
    tags: ["economía", "finanzas", "comercio", "estadísticas"],
    downloads: 1567,
    source: "SIEC",
    data: [],
  },
  {
    id: "transporte-publico",
    title: "Sistema de Transporte Público",
    description:
      "Datos sobre rutas, horarios, tarifas y estadísticas de uso del sistema de transporte público en la Ciudad de Panamá.",
    date: "2023-03-18",
    category: "Transporte",
    tags: ["transporte", "metro", "autobús", "movilidad"],
    downloads: 743,
    source: "Autoridad de Tránsito y Transporte Terrestre",
    data: [],
  },
  {
    id: "areas-protegidas",
    title: "Áreas Naturales Protegidas",
    description:
      "Información geográfica y descriptiva de las áreas naturales protegidas de Panamá, incluyendo parques nacionales, reservas y santuarios.",
    date: "2023-02-05",
    category: "Ambiente",
    tags: ["ambiente", "conservación", "parques", "biodiversidad"],
    downloads: 921,
    source: "Ministerio de Ambiente",
    data: [],
  },
]

export default function DatasetsGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDatasets, setFilteredDatasets] = useState(mockDatasets)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = mockDatasets.filter(
      (dataset) =>
        dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredDatasets(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Catálogo de Datos Abiertos</h1>
        <p className="text-muted-foreground">Explora los conjuntos de datos disponibles del gobierno de Panamá</p>
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar datasets..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Buscar</Button>
          <Button variant="outline" type="button">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </form>
      </div>

      <Tabs defaultValue="todos" className="mb-8">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="recientes">Recientes</TabsTrigger>
            <TabsTrigger value="populares">Populares</TabsTrigger>
          </TabsList>
          <Button variant="ghost" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Ordenar
          </Button>
        </div>

        <TabsContent value="todos" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDatasets.length > 0 ? (
              filteredDatasets.map((dataset) => <DatasetCard key={dataset.id} dataset={dataset} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No se encontraron datasets que coincidan con tu búsqueda.</p>
                <Button variant="link" onClick={() => setFilteredDatasets(mockDatasets)}>
                  Ver todos los datasets
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recientes" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockDatasets
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3)
              .map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="populares" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockDatasets
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 3)
              .map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
