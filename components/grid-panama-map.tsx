"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Map, TrendingUp, Info, ChevronRight, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

// Datos de las provincias de Panamá
const provinces = [
  {
    id: "panama",
    name: "Panamá",
    capital: "Ciudad de Panamá",
    population: 1713070,
    area: 11670.92,
    density: 146.78,
    districts: 5,
    corregimientos: 55,
    color: "bg-blue-500",
    stats: {
      crimeRate: 12.3,
      growthRate: 1.8,
      unemployment: 7.1,
    },
  },
  {
    id: "colon",
    name: "Colón",
    capital: "Colón",
    population: 294060,
    area: 4575.5,
    density: 64.27,
    districts: 6,
    corregimientos: 41,
    color: "bg-green-500",
    stats: {
      crimeRate: 15.7,
      growthRate: 0.9,
      unemployment: 10.3,
    },
  },
  {
    id: "cocle",
    name: "Coclé",
    capital: "Penonomé",
    population: 260292,
    area: 4946.6,
    density: 52.62,
    districts: 6,
    corregimientos: 42,
    color: "bg-yellow-500",
    stats: {
      crimeRate: 8.2,
      growthRate: 1.1,
      unemployment: 6.8,
    },
  },
  {
    id: "chiriqui",
    name: "Chiriquí",
    capital: "David",
    population: 462056,
    area: 6490.9,
    density: 71.19,
    districts: 14,
    corregimientos: 96,
    color: "bg-red-500",
    stats: {
      crimeRate: 9.5,
      growthRate: 1.3,
      unemployment: 5.9,
    },
  },
  {
    id: "darien",
    name: "Darién",
    capital: "La Palma",
    population: 57000,
    area: 11896.5,
    density: 4.79,
    districts: 3,
    corregimientos: 25,
    color: "bg-purple-500",
    stats: {
      crimeRate: 7.8,
      growthRate: 2.1,
      unemployment: 8.7,
    },
  },
  {
    id: "herrera",
    name: "Herrera",
    capital: "Chitré",
    population: 118334,
    area: 2340.7,
    density: 50.56,
    districts: 7,
    corregimientos: 49,
    color: "bg-indigo-500",
    stats: {
      crimeRate: 6.4,
      growthRate: 0.7,
      unemployment: 5.2,
    },
  },
  {
    id: "los_santos",
    name: "Los Santos",
    capital: "Las Tablas",
    population: 95538,
    area: 3809.4,
    density: 25.08,
    districts: 7,
    corregimientos: 80,
    color: "bg-pink-500",
    stats: {
      crimeRate: 5.9,
      growthRate: 0.5,
      unemployment: 4.8,
    },
  },
  {
    id: "bocas_del_toro",
    name: "Bocas del Toro",
    capital: "Bocas del Toro",
    population: 170320,
    area: 4643.9,
    density: 36.68,
    districts: 4,
    corregimientos: 30,
    color: "bg-teal-500",
    stats: {
      crimeRate: 10.2,
      growthRate: 2.3,
      unemployment: 9.1,
    },
  },
  {
    id: "veraguas",
    name: "Veraguas",
    capital: "Santiago",
    population: 245284,
    area: 10587.2,
    density: 23.17,
    districts: 12,
    corregimientos: 95,
    color: "bg-orange-500",
    stats: {
      crimeRate: 7.6,
      growthRate: 0.8,
      unemployment: 6.3,
    },
  },
  {
    id: "comarca_ngabe_bugle",
    name: "Comarca Ngäbe-Buglé",
    capital: "Llano Tugrí",
    population: 213860,
    area: 6968.0,
    density: 30.69,
    districts: 9,
    corregimientos: 70,
    color: "bg-amber-500",
    stats: {
      crimeRate: 4.3,
      growthRate: 2.7,
      unemployment: 12.5,
    },
  },
]

export default function GridPanamaMap() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("mapa")

  // Obtener la provincia seleccionada
  const province = provinces.find((p) => p.id === selectedProvince)

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Mapa de Panamá</h3>
            <TabsList>
              <TabsTrigger value="mapa" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Mapa</span>
              </TabsTrigger>
              <TabsTrigger value="calor" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Calor</span>
              </TabsTrigger>
              <TabsTrigger value="comparativa" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Comparativa</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="mapa" className="mt-0">
            <div className="grid grid-cols-5 gap-3 mb-4">
              {provinces.slice(0, 5).map((province) => (
                <ProvinceSquare
                  key={province.id}
                  province={province}
                  isSelected={selectedProvince === province.id}
                  onClick={() => setSelectedProvince(province.id === selectedProvince ? null : province.id)}
                />
              ))}
            </div>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {provinces.slice(5, 10).map((province) => (
                <ProvinceSquare
                  key={province.id}
                  province={province}
                  isSelected={selectedProvince === province.id}
                  onClick={() => setSelectedProvince(province.id === selectedProvince ? null : province.id)}
                />
              ))}
            </div>

            {province ? (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${province.color}`}></span>
                    {province.name}
                  </h4>
                  <Badge variant="outline">{province.capital}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Población</p>
                    <p className="font-medium">{province.population.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Área (km²)</p>
                    <p className="font-medium">{province.area.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Densidad</p>
                    <p className="font-medium">{province.density.toFixed(1)} hab/km²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Corregimientos</p>
                    <p className="font-medium">{province.corregimientos}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Tasa de criminalidad</span>
                      <AlertTriangle
                        className={`h-4 w-4 ${province.stats.crimeRate > 10 ? "text-red-500" : "text-yellow-500"}`}
                      />
                    </div>
                    <p className="text-2xl font-bold">{province.stats.crimeRate}%</p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Crecimiento</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold">{province.stats.growthRate}%</p>
                  </div>
                  <div className="p-3 bg-background rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Desempleo</span>
                      <Info className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold">{province.stats.unemployment}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-muted/30 rounded-lg text-center">
                <Info className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Selecciona una provincia para ver detalles</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calor" className="mt-0">
            <div className="grid grid-cols-5 gap-3 mb-4">
              {provinces.slice(0, 5).map((province) => (
                <ProvinceHeatSquare
                  key={province.id}
                  province={province}
                  isSelected={selectedProvince === province.id}
                  onClick={() => setSelectedProvince(province.id === selectedProvince ? null : province.id)}
                />
              ))}
            </div>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {provinces.slice(5, 10).map((province) => (
                <ProvinceHeatSquare
                  key={province.id}
                  province={province}
                  isSelected={selectedProvince === province.id}
                  onClick={() => setSelectedProvince(province.id === selectedProvince ? null : province.id)}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 px-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-200"></span>
                <span className="text-xs">Bajo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-200"></span>
                <span className="text-xs">Medio</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-orange-200"></span>
                <span className="text-xs">Alto</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-red-200"></span>
                <span className="text-xs">Crítico</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparativa" className="mt-0">
            <div className="space-y-3">
              {provinces.map((province) => (
                <div key={province.id} className="flex items-center p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-8 rounded-sm ${province.color} mr-3`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{province.name}</h4>
                      <span className="text-sm text-muted-foreground">{province.population.toLocaleString()} hab.</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${province.color}`}
                        style={{ width: `${(province.population / 1713070) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface ProvinceSquareProps {
  province: (typeof provinces)[0]
  isSelected: boolean
  onClick: () => void
}

function ProvinceSquare({ province, isSelected, onClick }: ProvinceSquareProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        aspect-square rounded-lg p-3 cursor-pointer transition-colors
        flex flex-col justify-between
        ${isSelected ? "ring-2 ring-primary bg-primary/5" : "bg-muted/30 hover:bg-muted/50"}
      `}
    >
      <div>
        <h4 className="font-medium text-sm truncate">{province.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{province.capital}</p>
      </div>
      <div className="flex justify-end">
        <span className={`inline-block w-3 h-3 rounded-full ${province.color}`}></span>
      </div>
    </motion.div>
  )
}

function ProvinceHeatSquare({ province, isSelected, onClick }: ProvinceSquareProps) {
  // Determinar el color de calor basado en la tasa de criminalidad
  const getHeatColor = (rate: number) => {
    if (rate < 7) return "bg-green-200 hover:bg-green-300"
    if (rate < 10) return "bg-yellow-200 hover:bg-yellow-300"
    if (rate < 13) return "bg-orange-200 hover:bg-orange-300"
    return "bg-red-200 hover:bg-red-300"
  }

  const heatColor = getHeatColor(province.stats.crimeRate)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        aspect-square rounded-lg p-3 cursor-pointer transition-colors
        flex flex-col justify-between
        ${isSelected ? "ring-2 ring-primary" : ""} ${heatColor}
      `}
    >
      <div>
        <h4 className="font-medium text-sm truncate">{province.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{province.stats.crimeRate}%</p>
      </div>
      <div className="flex justify-end">
        <span className="text-xs font-medium">{province.capital}</span>
      </div>
    </motion.div>
  )
}
