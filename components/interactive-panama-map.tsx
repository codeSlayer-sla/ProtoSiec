"use client"

import React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  PieChart,
  LineChart,
  Info,
  Download,
  Share2,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Define province data with statistics
const provinceData = {
  "bocas-del-toro": {
    name: "Bocas del Toro",
    color: "#FF9F1C",
    hoverColor: "#FFBF69",
    population: 170320,
    crimeRate: 6.4,
    incidents: 1890,
    mostCommon: "Hurto",
    trend: 0.7,
    capital: "Bocas del Toro",
    yearlyData: [
      { year: 2018, incidents: 1650 },
      { year: 2019, incidents: 1720 },
      { year: 2020, incidents: 1580 },
      { year: 2021, incidents: 1750 },
      { year: 2022, incidents: 1820 },
      { year: 2023, incidents: 1890 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 780 },
      { type: "Robo", count: 420 },
      { type: "Violencia doméstica", count: 390 },
      { type: "Otros", count: 300 },
    ],
  },
  chiriqui: {
    name: "Chiriquí",
    color: "#2EC4B6",
    hoverColor: "#7DDFD4",
    population: 462056,
    crimeRate: 5.1,
    incidents: 3210,
    mostCommon: "Hurto",
    trend: -1.8,
    capital: "David",
    yearlyData: [
      { year: 2018, incidents: 3450 },
      { year: 2019, incidents: 3380 },
      { year: 2020, incidents: 3100 },
      { year: 2021, incidents: 3250 },
      { year: 2022, incidents: 3270 },
      { year: 2023, incidents: 3210 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 1450 },
      { type: "Robo", count: 680 },
      { type: "Violencia doméstica", count: 580 },
      { type: "Otros", count: 500 },
    ],
  },
  "comarca-ngabe-bugle": {
    name: "Comarca Ngäbe-Buglé",
    color: "#E71D36",
    hoverColor: "#F26D85",
    population: 213860,
    crimeRate: 3.5,
    incidents: 1120,
    mostCommon: "Violencia doméstica",
    trend: -1.3,
    capital: "Llano Tugrí",
    yearlyData: [
      { year: 2018, incidents: 1180 },
      { year: 2019, incidents: 1210 },
      { year: 2020, incidents: 1150 },
      { year: 2021, incidents: 1140 },
      { year: 2022, incidents: 1135 },
      { year: 2023, incidents: 1120 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 320 },
      { type: "Robo", count: 180 },
      { type: "Violencia doméstica", count: 450 },
      { type: "Otros", count: 170 },
    ],
  },
  veraguas: {
    name: "Veraguas",
    color: "#3A86FF",
    hoverColor: "#7AABFF",
    population: 245284,
    crimeRate: 3.8,
    incidents: 1540,
    mostCommon: "Violencia doméstica",
    trend: -4.5,
    capital: "Santiago de Veraguas",
    yearlyData: [
      { year: 2018, incidents: 1680 },
      { year: 2019, incidents: 1720 },
      { year: 2020, incidents: 1650 },
      { year: 2021, incidents: 1610 },
      { year: 2022, incidents: 1580 },
      { year: 2023, incidents: 1540 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 520 },
      { type: "Robo", count: 280 },
      { type: "Violencia doméstica", count: 540 },
      { type: "Otros", count: 200 },
    ],
  },
  cocle: {
    name: "Coclé",
    color: "#8338EC",
    hoverColor: "#A97AF4",
    population: 260292,
    crimeRate: 4.3,
    incidents: 1870,
    mostCommon: "Hurto",
    trend: -2.1,
    capital: "Penonomé",
    yearlyData: [
      { year: 2018, incidents: 1950 },
      { year: 2019, incidents: 1980 },
      { year: 2020, incidents: 1850 },
      { year: 2021, incidents: 1910 },
      { year: 2022, incidents: 1890 },
      { year: 2023, incidents: 1870 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 820 },
      { type: "Robo", count: 380 },
      { type: "Violencia doméstica", count: 420 },
      { type: "Otros", count: 250 },
    ],
  },
  herrera: {
    name: "Herrera",
    color: "#FB5607",
    hoverColor: "#FC8A4A",
    population: 118175,
    crimeRate: 3.2,
    incidents: 980,
    mostCommon: "Violencia doméstica",
    trend: -5.2,
    capital: "Chitré",
    yearlyData: [
      { year: 2018, incidents: 1080 },
      { year: 2019, incidents: 1050 },
      { year: 2020, incidents: 1020 },
      { year: 2021, incidents: 1010 },
      { year: 2022, incidents: 990 },
      { year: 2023, incidents: 980 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 320 },
      { type: "Robo", count: 180 },
      { type: "Violencia doméstica", count: 380 },
      { type: "Otros", count: 100 },
    ],
  },
  "los-santos": {
    name: "Los Santos",
    color: "#FF006E",
    hoverColor: "#FF5A9D",
    population: 95318,
    crimeRate: 2.8,
    incidents: 760,
    mostCommon: "Violencia doméstica",
    trend: -6.3,
    capital: "Las Tablas",
    yearlyData: [
      { year: 2018, incidents: 850 },
      { year: 2019, incidents: 830 },
      { year: 2020, incidents: 810 },
      { year: 2021, incidents: 790 },
      { year: 2022, incidents: 770 },
      { year: 2023, incidents: 760 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 250 },
      { type: "Robo", count: 120 },
      { type: "Violencia doméstica", count: 310 },
      { type: "Otros", count: 80 },
    ],
  },
  panama: {
    name: "Panamá",
    color: "#FFBE0B",
    hoverColor: "#FFCE55",
    population: 1713070,
    crimeRate: 8.2,
    incidents: 12450,
    mostCommon: "Hurto",
    trend: -3.5,
    capital: "Panamá",
    yearlyData: [
      { year: 2018, incidents: 13200 },
      { year: 2019, incidents: 13100 },
      { year: 2020, incidents: 12800 },
      { year: 2021, incidents: 12700 },
      { year: 2022, incidents: 12550 },
      { year: 2023, incidents: 12450 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 5800 },
      { type: "Robo", count: 3200 },
      { type: "Violencia doméstica", count: 2100 },
      { type: "Otros", count: 1350 },
    ],
  },
  "panama-oeste": {
    name: "Panamá Oeste",
    color: "#8AC926",
    hoverColor: "#A9D95D",
    population: 510038,
    crimeRate: 7.5,
    incidents: 4850,
    mostCommon: "Hurto",
    trend: -2.8,
    capital: "La Chorrera",
    yearlyData: [
      { year: 2018, incidents: 5100 },
      { year: 2019, incidents: 5050 },
      { year: 2020, incidents: 4950 },
      { year: 2021, incidents: 4920 },
      { year: 2022, incidents: 4880 },
      { year: 2023, incidents: 4850 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 2200 },
      { type: "Robo", count: 1350 },
      { type: "Violencia doméstica", count: 850 },
      { type: "Otros", count: 450 },
    ],
  },
  colon: {
    name: "Colón",
    color: "#1982C4",
    hoverColor: "#5AABDE",
    population: 294060,
    crimeRate: 9.7,
    incidents: 4320,
    mostCommon: "Robo",
    trend: 1.2,
    capital: "Colón",
    yearlyData: [
      { year: 2018, incidents: 4150 },
      { year: 2019, incidents: 4180 },
      { year: 2020, incidents: 4220 },
      { year: 2021, incidents: 4250 },
      { year: 2022, incidents: 4290 },
      { year: 2023, incidents: 4320 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 1650 },
      { type: "Robo", count: 1850 },
      { type: "Violencia doméstica", count: 520 },
      { type: "Otros", count: 300 },
    ],
  },
  darien: {
    name: "Darién",
    color: "#6A4C93",
    hoverColor: "#9579B8",
    population: 55055,
    crimeRate: 7.1,
    incidents: 920,
    mostCommon: "Tráfico ilícito",
    trend: 2.4,
    capital: "La Palma",
    yearlyData: [
      { year: 2018, incidents: 850 },
      { year: 2019, incidents: 870 },
      { year: 2020, incidents: 880 },
      { year: 2021, incidents: 890 },
      { year: 2022, incidents: 910 },
      { year: 2023, incidents: 920 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 220 },
      { type: "Robo", count: 180 },
      { type: "Tráfico ilícito", count: 420 },
      { type: "Otros", count: 100 },
    ],
  },
  "comarca-embera": {
    name: "Comarca Emberá",
    color: "#06D6A0",
    hoverColor: "#5AE6C3",
    population: 11000,
    crimeRate: 2.9,
    incidents: 320,
    mostCommon: "Hurto",
    trend: -0.8,
    capital: "Unión Chocó",
    yearlyData: [
      { year: 2018, incidents: 330 },
      { year: 2019, incidents: 335 },
      { year: 2020, incidents: 325 },
      { year: 2021, incidents: 325 },
      { year: 2022, incidents: 322 },
      { year: 2023, incidents: 320 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 150 },
      { type: "Robo", count: 50 },
      { type: "Violencia doméstica", count: 80 },
      { type: "Otros", count: 40 },
    ],
  },
  "guna-yala": {
    name: "Guna Yala",
    color: "#118AB2",
    hoverColor: "#4FAECB",
    population: 40620,
    crimeRate: 2.1,
    incidents: 210,
    mostCommon: "Hurto",
    trend: -1.5,
    capital: "El Porvenir",
    yearlyData: [
      { year: 2018, incidents: 225 },
      { year: 2019, incidents: 220 },
      { year: 2020, incidents: 218 },
      { year: 2021, incidents: 215 },
      { year: 2022, incidents: 212 },
      { year: 2023, incidents: 210 },
    ],
    crimeTypes: [
      { type: "Hurto", count: 120 },
      { type: "Robo", count: 30 },
      { type: "Violencia doméstica", count: 40 },
      { type: "Otros", count: 20 },
    ],
  },
}

// Organizar las provincias en una cuadrícula
const gridLayout = [
  ["guna-yala", "colon", "panama-oeste", "panama", "darien"],
  ["bocas-del-toro", "comarca-ngabe-bugle", "veraguas", "cocle", "comarca-embera"],
  ["", "chiriqui", "", "herrera", "los-santos"],
]

// Chart component for province statistics
const ProvinceChart = ({
  provinceId,
  chartType = "bar",
  dataType = "yearly",
}: {
  provinceId: string
  chartType?: "bar" | "line" | "pie"
  dataType?: "yearly" | "crimeTypes"
}) => {
  const province = provinceData[provinceId as keyof typeof provinceData]
  if (!province) return null

  const data = dataType === "yearly" ? province.yearlyData : province.crimeTypes
  const maxValue = Math.max(...data.map((d) => (dataType === "yearly" ? d.incidents : d.count)))

  if (chartType === "line" && dataType === "yearly") {
    return (
      <svg className="w-full h-[200px]" viewBox="0 0 400 200">
        {/* X and Y axes */}
        <line x1="50" y1="150" x2="350" y2="150" stroke="#94a3b8" strokeWidth="1" />
        <line x1="50" y1="30" x2="50" y2="150" stroke="#94a3b8" strokeWidth="1" />

        {/* Y-axis labels */}
        <text x="45" y="150" textAnchor="end" fontSize="10" fill="#64748b">
          0
        </text>
        <text x="45" y="90" textAnchor="end" fontSize="10" fill="#64748b">
          {Math.round(maxValue / 2)}
        </text>
        <text x="45" y="30" textAnchor="end" fontSize="10" fill="#64748b">
          {Math.round(maxValue)}
        </text>

        {/* Line chart */}
        <path
          d={`M ${50 + 0 * 50} ${150 - (data[0].incidents / maxValue) * 120} 
              ${data.map((d, i) => `L ${50 + i * 50} ${150 - (d.incidents / maxValue) * 120}`).join(" ")}`}
          fill="none"
          stroke={province.color}
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={50 + i * 50} cy={150 - (d.incidents / maxValue) * 120} r="4" fill={province.color} />
            <text x={50 + i * 50} y="165" textAnchor="middle" fontSize="10" fill="#64748b">
              {d.year}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  if (chartType === "bar") {
    const barWidth = dataType === "yearly" ? 30 : 50
    const spacing = dataType === "yearly" ? 50 : 80

    return (
      <svg className="w-full h-[200px]" viewBox="0 0 400 200">
        {/* X and Y axes */}
        <line x1="50" y1="150" x2="350" y2="150" stroke="#94a3b8" strokeWidth="1" />
        <line x1="50" y1="30" x2="50" y2="150" stroke="#94a3b8" strokeWidth="1" />

        {/* Y-axis labels */}
        <text x="45" y="150" textAnchor="end" fontSize="10" fill="#64748b">
          0
        </text>
        <text x="45" y="90" textAnchor="end" fontSize="10" fill="#64748b">
          {Math.round(maxValue / 2)}
        </text>
        <text x="45" y="30" textAnchor="end" fontSize="10" fill="#64748b">
          {Math.round(maxValue)}
        </text>

        {/* Bars */}
        {data.map((d, i) => {
          const value = dataType === "yearly" ? d.incidents : d.count
          return (
            <g key={i}>
              <rect
                x={50 + i * spacing - barWidth / 2}
                y={150 - (value / maxValue) * 120}
                width={barWidth}
                height={(value / maxValue) * 120}
                fill={province.color}
                opacity="0.8"
              />
              <text x={50 + i * spacing} y="165" textAnchor="middle" fontSize="10" fill="#64748b">
                {dataType === "yearly" ? d.year : d.type}
              </text>
              <text
                x={50 + i * spacing}
                y={145 - (value / maxValue) * 120}
                textAnchor="middle"
                fontSize="10"
                fill="#1e293b"
                fontWeight="bold"
              >
                {value.toLocaleString()}
              </text>
            </g>
          )
        })}
      </svg>
    )
  }

  if (chartType === "pie" && dataType === "crimeTypes") {
    const total = data.reduce((sum, d) => sum + d.count, 0)
    let startAngle = 0

    return (
      <svg className="w-full h-[200px]" viewBox="0 0 400 200">
        <g transform="translate(200, 100)">
          {data.map((d, i) => {
            const percentage = d.count / total
            const endAngle = startAngle + percentage * 2 * Math.PI

            // Calculate the path for the pie slice
            const x1 = Math.cos(startAngle) * 70
            const y1 = Math.sin(startAngle) * 70
            const x2 = Math.cos(endAngle) * 70
            const y2 = Math.sin(endAngle) * 70

            const largeArcFlag = percentage > 0.5 ? 1 : 0

            const pathData = `M 0 0 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

            // Calculate position for the label
            const labelAngle = startAngle + percentage * Math.PI
            const labelX = Math.cos(labelAngle) * 40
            const labelY = Math.sin(labelAngle) * 40

            // Update the start angle for the next slice
            const currentStartAngle = startAngle
            startAngle = endAngle

            return (
              <g key={i}>
                <path d={pathData} fill={`hsl(${i * 40}, 70%, 60%)`} stroke="#fff" strokeWidth="1" />
                {percentage > 0.1 && (
                  <text x={labelX} y={labelY} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">
                    {Math.round(percentage * 100)}%
                  </text>
                )}
              </g>
            )
          })}

          {/* Legend */}
          <g transform="translate(120, -80)">
            {data.map((d, i) => (
              <g key={i} transform={`translate(0, ${i * 20})`}>
                <rect width="12" height="12" fill={`hsl(${i * 40}, 70%, 60%)`} />
                <text x="16" y="10" fontSize="10" fill="#64748b">
                  {d.type}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    )
  }

  return null
}

// Heat map component
const HeatMap = ({ data }: { data: Record<string, any> }) => {
  return (
    <div className="relative w-full h-[400px] bg-slate-50 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-center bg-cover opacity-20"></div>

      {/* Heat map overlay */}
      <div className="absolute inset-0">
        {Object.entries(data).map(([id, province]) => {
          const { crimeRate } = province as any
          // Calculate position based on province location
          // This is a simplified example - you would need actual coordinates
          const randomX = Math.random() * 80 + 10 // 10-90% of width
          const randomY = Math.random() * 80 + 10 // 10-90% of height

          // Size and opacity based on crime rate
          const size = 20 + crimeRate * 5
          const opacity = 0.3 + crimeRate / 15

          return (
            <div
              key={id}
              className="absolute rounded-full bg-red-500 blur-xl"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                transform: "translate(-50%, -50%)",
              }}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-sm">
        <div className="text-xs font-medium mb-1">Intensidad de criminalidad</div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-30"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-50 mx-1"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-70 mx-1"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-90"></div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Baja</span>
          <span>Alta</span>
        </div>
      </div>
    </div>
  )
}

export default function InteractivePanamaMap() {
  const [activeProvince, setActiveProvince] = useState<string | null>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState("2023")
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar")
  const [dataType, setDataType] = useState<"yearly" | "crimeTypes">("yearly")
  const [visualizationType, setVisualizationType] = useState<"map" | "heat" | "comparison">("map")
  const mapRef = useRef<HTMLDivElement>(null)

  // Handle province hover
  const handleMouseEnter = (provinceId: string) => {
    setActiveProvince(provinceId)
  }

  const handleMouseLeave = () => {
    setActiveProvince(null)
  }

  // Handle province click
  const handleProvinceClick = (provinceId: string) => {
    setSelectedProvince(provinceId === selectedProvince ? null : provinceId)
  }

  // Get province color based on state
  const getProvinceColor = (provinceId: string) => {
    const province = provinceData[provinceId as keyof typeof provinceData]
    if (!province) return "#ccc"

    if (selectedProvince === provinceId) return province.hoverColor
    if (activeProvince === provinceId) return province.hoverColor
    return province.color
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-primary/10 shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Mapa Interactivo de Panamá</CardTitle>
              <CardDescription>
                Explore las estadísticas de seguridad por provincia. Haga clic en una provincia para ver datos
                detallados.
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={visualizationType} onValueChange={(value: any) => setVisualizationType(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Visualización" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="map">Mapa estándar</SelectItem>
                  <SelectItem value="heat">Mapa de calor</SelectItem>
                  <SelectItem value="comparison">Comparativa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" className="h-10 w-10">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 lg:grid-cols-4">
            {/* Map container */}
            <div
              className={cn(
                "col-span-full md:col-span-2 lg:col-span-3 p-6 relative min-h-[500px]",
                selectedProvince && "md:col-span-1 lg:col-span-2",
              )}
            >
              {visualizationType === "heat" ? (
                <HeatMap data={provinceData} />
              ) : (
                <div ref={mapRef} className="relative w-full h-full">
                  {/* Grid-based map layout */}
                  <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                    {gridLayout.map((row, rowIndex) => (
                      <React.Fragment key={rowIndex}>
                        {row.map((provinceId, colIndex) => {
                          if (!provinceId)
                            return <div key={`empty-${rowIndex}-${colIndex}`} className="aspect-square" />

                          const province = provinceData[provinceId as keyof typeof provinceData]
                          if (!province) return null

                          return (
                            <div
                              key={provinceId}
                              className="relative aspect-square cursor-pointer transition-all duration-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md"
                              style={{
                                backgroundColor: getProvinceColor(provinceId),
                                transform: selectedProvince === provinceId ? "scale(1.05)" : "scale(1)",
                              }}
                              onMouseEnter={() => handleMouseEnter(provinceId)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleProvinceClick(provinceId)}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-center p-2">
                                  <div className="font-bold text-sm">{province.name}</div>
                                  <div className="text-xs opacity-80">{province.capital}</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Hover tooltip */}
                  {activeProvince && !selectedProvince && provinceData[activeProvince as keyof typeof provinceData] && (
                    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-primary/20 w-64 animate-fade-in">
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {provinceData[activeProvince as keyof typeof provinceData].name}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Capital:</div>
                        <div>{provinceData[activeProvince as keyof typeof provinceData].capital}</div>

                        <div className="font-medium">Población:</div>
                        <div>{formatNumber(provinceData[activeProvince as keyof typeof provinceData].population)}</div>

                        <div className="font-medium">Tasa de criminalidad:</div>
                        <div>{provinceData[activeProvince as keyof typeof provinceData].crimeRate}%</div>

                        <div className="font-medium">Incidentes reportados:</div>
                        <div>{formatNumber(provinceData[activeProvince as keyof typeof provinceData].incidents)}</div>

                        <div className="font-medium">Delito más común:</div>
                        <div>{provinceData[activeProvince as keyof typeof provinceData].mostCommon}</div>

                        <div className="font-medium">Tendencia:</div>
                        <div
                          className={
                            provinceData[activeProvince as keyof typeof provinceData].trend > 0
                              ? "text-red-500 flex items-center"
                              : "text-green-500 flex items-center"
                          }
                        >
                          {provinceData[activeProvince as keyof typeof provinceData].trend > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(provinceData[activeProvince as keyof typeof provinceData].trend)}% vs año anterior
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Province details panel */}
            {selectedProvince && (
              <div className="col-span-full md:col-span-1 lg:col-span-2 border-t md:border-t-0 md:border-l border-primary/10 p-6 bg-primary/5">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {provinceData[selectedProvince as keyof typeof provinceData].name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Capital: {provinceData[selectedProvince as keyof typeof provinceData].capital}
                        </p>
                      </div>
                      <Badge
                        variant={
                          provinceData[selectedProvince as keyof typeof provinceData].trend > 0
                            ? "destructive"
                            : "success"
                        }
                        className="flex items-center gap-1"
                      >
                        {provinceData[selectedProvince as keyof typeof provinceData].trend > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(provinceData[selectedProvince as keyof typeof provinceData].trend)}%
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-muted-foreground">Población</div>
                        <div className="text-2xl font-bold">
                          {formatNumber(provinceData[selectedProvince as keyof typeof provinceData].population)}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-muted-foreground">Tasa de criminalidad</div>
                        <div className="text-2xl font-bold">
                          {provinceData[selectedProvince as keyof typeof provinceData].crimeRate}%
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-muted-foreground">Incidentes reportados</div>
                        <div className="text-2xl font-bold">
                          {formatNumber(provinceData[selectedProvince as keyof typeof provinceData].incidents)}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-muted-foreground">Delito más común</div>
                        <div className="text-2xl font-bold">
                          {provinceData[selectedProvince as keyof typeof provinceData].mostCommon}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Estadísticas detalladas</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex border rounded-md overflow-hidden">
                              <Button
                                variant={dataType === "yearly" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setDataType("yearly")}
                                className="rounded-none h-8"
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                Anual
                              </Button>
                              <Button
                                variant={dataType === "crimeTypes" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setDataType("crimeTypes")}
                                className="rounded-none h-8"
                              >
                                <Filter className="h-3 w-3 mr-1" />
                                Por tipo
                              </Button>
                            </div>

                            <div className="flex border rounded-md overflow-hidden">
                              <Button
                                variant={chartType === "bar" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setChartType("bar")}
                                className="rounded-none px-2 h-8"
                              >
                                <BarChart3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant={chartType === "line" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setChartType("line")}
                                className="rounded-none px-2 h-8"
                                disabled={dataType === "crimeTypes"}
                              >
                                <LineChart className="h-3 w-3" />
                              </Button>
                              <Button
                                variant={chartType === "pie" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setChartType("pie")}
                                className="rounded-none px-2 h-8"
                                disabled={dataType === "yearly"}
                              >
                                <PieChart className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Card className="overflow-hidden">
                          <CardContent className="p-4">
                            <ProvinceChart provinceId={selectedProvince} chartType={chartType} dataType={dataType} />
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Descargar datos
                        </Button>

                        <Button variant="outline" size="sm" className="gap-1">
                          <Share2 className="h-4 w-4" />
                          Compartir
                        </Button>

                        <Button variant="outline" size="sm" className="gap-1">
                          <Info className="h-4 w-4" />
                          Más información
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison view */}
      {visualizationType === "comparison" && (
        <Card className="overflow-hidden border-primary/10 shadow-md">
          <CardHeader>
            <CardTitle>Comparativa entre provincias</CardTitle>
            <CardDescription>
              Compare las estadísticas de criminalidad entre diferentes provincias de Panamá.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Tasa de criminalidad por provincia</h3>
                <div className="space-y-3">
                  {Object.entries(provinceData)
                    .sort((a, b) => (b[1] as any).crimeRate - (a[1] as any).crimeRate)
                    .map(([id, province]) => (
                      <div key={id} className="flex items-center">
                        <div className="w-32 truncate">{(province as any).name}</div>
                        <div className="flex-1 mx-2">
                          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${((province as any).crimeRate / 10) * 100}%`,
                                backgroundColor: (province as any).color,
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-12 text-right font-medium">{(province as any).crimeRate}%</div>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Incidentes reportados por provincia</h3>
                <div className="space-y-3">
                  {Object.entries(provinceData)
                    .sort((a, b) => (b[1] as any).incidents - (a[1] as any).incidents)
                    .map(([id, province]) => (
                      <div key={id} className="flex items-center">
                        <div className="w-32 truncate">{(province as any).name}</div>
                        <div className="flex-1 mx-2">
                          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${((province as any).incidents / 12450) * 100}%`,
                                backgroundColor: (province as any).color,
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-16 text-right font-medium">{formatNumber((province as any).incidents)}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(provinceData).map(([id, province]) => (
          <Badge
            key={id}
            variant="outline"
            className="flex items-center gap-1 cursor-pointer"
            style={{ borderColor: (province as any).color }}
            onClick={() => handleProvinceClick(id)}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: (province as any).color }} />
            {(province as any).name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
