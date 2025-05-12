"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, TrendingUp, TrendingDown, Users, Database, Download, Clock } from "lucide-react"

export default function StatsDashboard() {
  const [activeTab, setActiveTab] = useState("general")

  const generalStats = [
    {
      title: "Conjuntos de Datos",
      value: "6,255",
      description: "Disponibles para descarga",
      trend: "+12% este año",
      trendUp: true,
      icon: <Database className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Usuarios Activos",
      value: "12,847",
      description: "Investigadores y ciudadanos",
      trend: "+24% este año",
      trendUp: true,
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Descargas Mensuales",
      value: "45,320",
      description: "Archivos descargados",
      trend: "+8% este mes",
      trendUp: true,
      icon: <Download className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      title: "Tiempo de Actualización",
      value: "24h",
      description: "Promedio de actualización",
      trend: "-15% de mejora",
      trendUp: true,
      icon: <Clock className="h-5 w-5" />,
      color: "bg-amber-500",
    },
  ]

  const crimeStats = [
    {
      title: "Tasa de Criminalidad",
      value: "5.2%",
      description: "Nacional",
      trend: "-3.8% vs año anterior",
      trendUp: false,
      icon: <TrendingDown className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Incidentes Reportados",
      value: "28,450",
      description: "Último año",
      trend: "-2.1% vs año anterior",
      trendUp: false,
      icon: <TrendingDown className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Tasa de Resolución",
      value: "68.3%",
      description: "De casos reportados",
      trend: "+4.5% vs año anterior",
      trendUp: true,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Tiempo de Respuesta",
      value: "18min",
      description: "Promedio nacional",
      trend: "-12% vs año anterior",
      trendUp: true,
      icon: <Clock className="h-5 w-5" />,
      color: "bg-blue-500",
    },
  ]

  const renderStats = (stats: typeof generalStats) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`rounded-full p-2 ${stat.color} text-white`}>{stat.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>

              <div
                className={`mt-4 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                  stat.trendUp
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {stat.trendUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Estadísticas Destacadas</h2>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
          Conozca las cifras más relevantes sobre seguridad pública y criminalidad en Panamá, así como el uso de nuestra
          plataforma.
        </p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="general">Plataforma</TabsTrigger>
            <TabsTrigger value="crime">Criminalidad</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="mt-8">
          {renderStats(generalStats)}
        </TabsContent>
        <TabsContent value="crime" className="mt-8">
          {renderStats(crimeStats)}
        </TabsContent>
      </Tabs>

      {/* Mini chart */}
      <div className="mx-auto mt-12 max-w-4xl rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Tendencia de Descargas</h3>
            <p className="text-sm text-muted-foreground">Últimos 12 meses</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">2023</span>
            <div className="ml-2 flex h-3 w-3 items-center justify-center rounded-full bg-muted"></div>
            <span className="text-xs text-muted-foreground">2022</span>
          </div>
        </div>
        <div className="h-[200px] w-full">
          <svg viewBox="0 0 800 200" className="h-full w-full">
            {/* Grid lines */}
            <line x1="50" y1="170" x2="750" y2="170" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="50" y1="130" x2="750" y2="130" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="50" y1="90" x2="750" y2="90" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="50" y1="50" x2="750" y2="50" stroke="#e2e8f0" strokeWidth="1" />

            {/* Y-axis labels */}
            <text x="40" y="170" textAnchor="end" fontSize="12" fill="#94a3b8">
              0
            </text>
            <text x="40" y="130" textAnchor="end" fontSize="12" fill="#94a3b8">
              15k
            </text>
            <text x="40" y="90" textAnchor="end" fontSize="12" fill="#94a3b8">
              30k
            </text>
            <text x="40" y="50" textAnchor="end" fontSize="12" fill="#94a3b8">
              45k
            </text>

            {/* X-axis labels */}
            {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"].map((month, i) => (
              <text key={i} x={80 + i * 58} y="190" textAnchor="middle" fontSize="12" fill="#94a3b8">
                {month}
              </text>
            ))}

            {/* Data line for 2023 */}
            <path
              d="M80,120 L138,110 L196,100 L254,90 L312,85 L370,75 L428,65 L486,60 L544,50 L602,45 L660,40 L718,35"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data line for 2022 */}
            <path
              d="M80,140 L138,135 L196,130 L254,125 L312,120 L370,115 L428,110 L486,105 L544,100 L602,95 L660,90 L718,85"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points for 2023 */}
            {[120, 110, 100, 90, 85, 75, 65, 60, 50, 45, 40, 35].map((y, i) => (
              <circle key={i} cx={80 + i * 58} cy={y} r="4" fill="hsl(var(--primary))" />
            ))}

            {/* Data points for 2022 */}
            {[140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 85].map((y, i) => (
              <circle key={i} cx={80 + i * 58} cy={y} r="4" fill="#cbd5e1" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
