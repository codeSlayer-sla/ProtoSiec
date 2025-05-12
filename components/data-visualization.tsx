"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

// Simulación de datos para las visualizaciones
const crimeData = [
  { month: "Ene", theft: 245, robbery: 112, assault: 78 },
  { month: "Feb", theft: 230, robbery: 105, assault: 82 },
  { month: "Mar", theft: 260, robbery: 118, assault: 85 },
  { month: "Abr", theft: 275, robbery: 125, assault: 90 },
  { month: "May", theft: 290, robbery: 130, assault: 88 },
  { month: "Jun", theft: 310, robbery: 140, assault: 95 },
  { month: "Jul", theft: 330, robbery: 145, assault: 100 },
  { month: "Ago", theft: 320, robbery: 135, assault: 92 },
  { month: "Sep", theft: 300, robbery: 125, assault: 85 },
  { month: "Oct", theft: 280, robbery: 120, assault: 80 },
  { month: "Nov", theft: 260, robbery: 110, assault: 75 },
  { month: "Dic", theft: 250, robbery: 105, assault: 70 },
]

export default function DataVisualization() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedProvince, setSelectedProvince] = useState("panama")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Visualización de Datos</h3>
        <p className="text-muted-foreground">
          Explora nuestros datos a través de visualizaciones interactivas que te ayudarán a comprender mejor las
          tendencias y patrones.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3">
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar provincia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="panama">Panamá</SelectItem>
              <SelectItem value="colon">Colón</SelectItem>
              <SelectItem value="chiriqui">Chiriquí</SelectItem>
              <SelectItem value="veraguas">Veraguas</SelectItem>
              <SelectItem value="cocle">Coclé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3 flex gap-2">
          <Button variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="h-4 w-4" />
            Compartir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="line" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="line">Líneas</TabsTrigger>
          <TabsTrigger value="bar">Barras</TabsTrigger>
          <TabsTrigger value="pie">Circular</TabsTrigger>
          <TabsTrigger value="map">Mapa de calor</TabsTrigger>
        </TabsList>

        <TabsContent value="line" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Criminalidad ({selectedYear})</CardTitle>
              <CardDescription>
                Evolución mensual de los principales tipos de delitos en{" "}
                {selectedProvince.charAt(0).toUpperCase() + selectedProvince.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  {/* Ejes */}
                  <line x1="50" y1="350" x2="750" y2="350" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="50" y1="50" x2="50" y2="350" stroke="#94a3b8" strokeWidth="1" />

                  {/* Etiquetas eje X */}
                  {crimeData.map((data, i) => (
                    <text
                      key={`x-${i}`}
                      x={50 + i * (700 / 11)}
                      y="370"
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
                      <text x="40" y={350 - (value * 300) / 400} textAnchor="end" fontSize="12" fill="#64748b">
                        {value}
                      </text>
                      <line
                        x1="45"
                        y1={350 - (value * 300) / 400}
                        x2="750"
                        y2={350 - (value * 300) / 400}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* Línea de hurtos */}
                  <path
                    d={`M ${50} ${350 - (crimeData[0].theft * 300) / 400} ${crimeData
                      .map((data, i) => `L ${50 + i * (700 / 11)} ${350 - (data.theft * 300) / 400}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />

                  {/* Línea de robos */}
                  <path
                    d={`M ${50} ${350 - (crimeData[0].robbery * 300) / 400} ${crimeData
                      .map((data, i) => `L ${50 + i * (700 / 11)} ${350 - (data.robbery * 300) / 400}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />

                  {/* Línea de agresiones */}
                  <path
                    d={`M ${50} ${350 - (crimeData[0].assault * 300) / 400} ${crimeData
                      .map((data, i) => `L ${50 + i * (700 / 11)} ${350 - (data.assault * 300) / 400}`)
                      .join(" ")}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Puntos de datos para hurtos */}
                  {crimeData.map((data, i) => (
                    <circle
                      key={`theft-${i}`}
                      cx={50 + i * (700 / 11)}
                      cy={350 - (data.theft * 300) / 400}
                      r="4"
                      fill="#3b82f6"
                    />
                  ))}

                  {/* Puntos de datos para robos */}
                  {crimeData.map((data, i) => (
                    <circle
                      key={`robbery-${i}`}
                      cx={50 + i * (700 / 11)}
                      cy={350 - (data.robbery * 300) / 400}
                      r="4"
                      fill="#ef4444"
                    />
                  ))}

                  {/* Puntos de datos para agresiones */}
                  {crimeData.map((data, i) => (
                    <circle
                      key={`assault-${i}`}
                      cx={50 + i * (700 / 11)}
                      cy={350 - (data.assault * 300) / 400}
                      r="4"
                      fill="#10b981"
                    />
                  ))}

                  {/* Leyenda */}
                  <rect x="600" y="50" width="15" height="15" fill="#3b82f6" />
                  <text x="625" y="62" fontSize="14" fill="#64748b">
                    Hurtos
                  </text>
                  <rect x="600" y="75" width="15" height="15" fill="#ef4444" />
                  <text x="625" y="87" fontSize="14" fill="#64748b">
                    Robos
                  </text>
                  <rect x="600" y="100" width="15" height="15" fill="#10b981" />
                  <text x="625" y="112" fontSize="14" fill="#64748b">
                    Agresiones
                  </text>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativa por Tipo de Delito ({selectedYear})</CardTitle>
              <CardDescription>
                Distribución de delitos por categoría en{" "}
                {selectedProvince.charAt(0).toUpperCase() + selectedProvince.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  {/* Ejes */}
                  <line x1="100" y1="350" x2="700" y2="350" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="100" y1="50" x2="100" y2="350" stroke="#94a3b8" strokeWidth="1" />

                  {/* Etiquetas eje Y */}
                  {[0, 100, 200, 300, 400].map((value, i) => (
                    <g key={`y-${i}`}>
                      <text x="90" y={350 - (value * 300) / 400} textAnchor="end" fontSize="12" fill="#64748b">
                        {value}
                      </text>
                      <line
                        x1="95"
                        y1={350 - (value * 300) / 400}
                        x2="700"
                        y2={350 - (value * 300) / 400}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    </g>
                  ))}

                  {/* Barras para hurtos */}
                  <g>
                    <text x="200" y="370" textAnchor="middle" fontSize="14" fill="#64748b">
                      Hurtos
                    </text>
                    <rect
                      x="150"
                      y={350 - (3200 * 300) / 4000}
                      width="100"
                      height={(3200 * 300) / 4000}
                      fill="#3b82f6"
                      opacity="0.8"
                    />
                    <text
                      x="200"
                      y={345 - (3200 * 300) / 4000}
                      textAnchor="middle"
                      fontSize="14"
                      fill="#3b82f6"
                      fontWeight="bold"
                    >
                      3,200
                    </text>
                  </g>

                  {/* Barras para robos */}
                  <g>
                    <text x="400" y="370" textAnchor="middle" fontSize="14" fill="#64748b">
                      Robos
                    </text>
                    <rect
                      x="350"
                      y={350 - (1450 * 300) / 4000}
                      width="100"
                      height={(1450 * 300) / 4000}
                      fill="#ef4444"
                      opacity="0.8"
                    />
                    <text
                      x="400"
                      y={345 - (1450 * 300) / 4000}
                      textAnchor="middle"
                      fontSize="14"
                      fill="#ef4444"
                      fontWeight="bold"
                    >
                      1,450
                    </text>
                  </g>

                  {/* Barras para agresiones */}
                  <g>
                    <text x="600" y="370" textAnchor="middle" fontSize="14" fill="#64748b">
                      Agresiones
                    </text>
                    <rect
                      x="550"
                      y={350 - (980 * 300) / 4000}
                      width="100"
                      height={(980 * 300) / 4000}
                      fill="#10b981"
                      opacity="0.8"
                    />
                    <text
                      x="600"
                      y={345 - (980 * 300) / 4000}
                      textAnchor="middle"
                      fontSize="14"
                      fill="#10b981"
                      fontWeight="bold"
                    >
                      980
                    </text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Delitos ({selectedYear})</CardTitle>
              <CardDescription>
                Proporción de cada tipo de delito en{" "}
                {selectedProvince.charAt(0).toUpperCase() + selectedProvince.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-[400px] h-[400px]">
                  {/* Gráfico circular */}
                  <g transform="translate(200, 200)">
                    {/* Hurtos (57%) */}
                    <path
                      d="M 0 0 L 0 -150 A 150 150 0 0 1 142.5 44.1 Z"
                      fill="#3b82f6"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text x="70" y="-70" fontSize="16" fill="#fff" fontWeight="bold">
                      57%
                    </text>
                    <text x="70" y="-50" fontSize="14" fill="#fff">
                      Hurtos
                    </text>

                    {/* Robos (26%) */}
                    <path
                      d="M 0 0 L 142.5 44.1 A 150 150 0 0 1 -39.1 144.5 Z"
                      fill="#ef4444"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text x="60" y="80" fontSize="16" fill="#fff" fontWeight="bold">
                      26%
                    </text>
                    <text x="60" y="100" fontSize="14" fill="#fff">
                      Robos
                    </text>

                    {/* Agresiones (17%) */}
                    <path
                      d="M 0 0 L -39.1 144.5 A 150 150 0 0 1 -150 0 Z"
                      fill="#10b981"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text x="-70" y="70" fontSize="16" fill="#fff" fontWeight="bold">
                      17%
                    </text>
                    <text x="-70" y="90" fontSize="14" fill="#fff">
                      Agresiones
                    </text>

                    {/* Círculo central */}
                    <circle cx="0" cy="0" r="50" fill="white" />
                    <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">
                      5,630
                    </text>
                    <text x="0" y="25" textAnchor="middle" dominantBaseline="middle" fontSize="14">
                      Total de delitos
                    </text>
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Calor de Incidentes ({selectedYear})</CardTitle>
              <CardDescription>
                Distribución geográfica de delitos en{" "}
                {selectedProvince.charAt(0).toUpperCase() + selectedProvince.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full bg-slate-100 rounded-md flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-full h-[350px] relative">
                    {/* Mapa simplificado de Panamá */}
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      {/* Contorno de Panamá */}
                      <path
                        d="M100,150 C150,100 250,80 350,100 C450,120 550,150 650,130 C700,120 750,150 780,200 C750,250 700,280 650,270 C550,250 450,280 350,300 C250,320 150,300 100,250 C80,200 80,180 100,150Z"
                        fill="#e2e8f0"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      {/* Puntos de calor */}
                      <circle cx="200" cy="200" r="30" fill="url(#grad1)" opacity="0.7" />
                      <circle cx="350" cy="180" r="40" fill="url(#grad1)" opacity="0.8" />
                      <circle cx="500" cy="220" r="50" fill="url(#grad1)" opacity="0.9" />
                      <circle cx="600" cy="180" r="35" fill="url(#grad1)" opacity="0.7" />
                      <circle cx="400" cy="250" r="25" fill="url(#grad1)" opacity="0.6" />

                      {/* Gradiente para los puntos de calor */}
                      <defs>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                          <stop offset="0%" style={{ stopColor: "rgb(239, 68, 68)", stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: "rgb(239, 68, 68)", stopOpacity: 0 }} />
                        </radialGradient>
                      </defs>

                      {/* Leyenda */}
                      <g transform="translate(650, 320)">
                        <text x="0" y="0" fontSize="14" fontWeight="bold">
                          Intensidad
                        </text>
                        <rect x="0" y="10" width="20" height="10" fill="#ef4444" opacity="0.3" />
                        <rect x="20" y="10" width="20" height="10" fill="#ef4444" opacity="0.5" />
                        <rect x="40" y="10" width="20" height="10" fill="#ef4444" opacity="0.7" />
                        <rect x="60" y="10" width="20" height="10" fill="#ef4444" opacity="0.9" />
                        <text x="0" y="35" fontSize="12">
                          Baja
                        </text>
                        <text x="80" y="35" fontSize="12" textAnchor="end">
                          Alta
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
