"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data for provinces
const provinceData = {
  "Bocas del Toro": {
    color: "#e65c00", // orange
    population: "170,320",
    crimeRate: "6.4%",
    incidents: "1,890",
    mostCommon: "Hurto",
    trend: "+0.7% vs año anterior",
    capital: "Bocas del Toro",
  },
  Chiriquí: {
    color: "#0066cc", // blue
    population: "462,056",
    crimeRate: "5.1%",
    incidents: "3,210",
    mostCommon: "Hurto",
    trend: "-1.8% vs año anterior",
    capital: "David",
  },
  "Ngobe-Bugle": {
    color: "#e60000", // red
    population: "213,860",
    crimeRate: "3.5%",
    incidents: "1,120",
    mostCommon: "Violencia doméstica",
    trend: "-1.3% vs año anterior",
    capital: "Chichica",
  },
  Veraguas: {
    color: "#009933", // green
    population: "245,284",
    crimeRate: "3.8%",
    incidents: "1,540",
    mostCommon: "Violencia doméstica",
    trend: "-4.5% vs año anterior",
    capital: "Santiago de Veraguas",
  },
  Coclé: {
    color: "#e6007a", // pink
    population: "260,292",
    crimeRate: "4.3%",
    incidents: "1,870",
    mostCommon: "Hurto",
    trend: "-2.1% vs año anterior",
    capital: "Penonomé",
  },
  Herrera: {
    color: "#9933cc", // purple
    population: "118,175",
    crimeRate: "3.2%",
    incidents: "980",
    mostCommon: "Violencia doméstica",
    trend: "-5.2% vs año anterior",
    capital: "Chitré",
  },
  "Los Santos": {
    color: "#cc0000", // dark red
    population: "95,318",
    crimeRate: "2.8%",
    incidents: "760",
    mostCommon: "Violencia doméstica",
    trend: "-6.3% vs año anterior",
    capital: "Las Tablas",
  },
  Panamá: {
    color: "#ffaa00", // yellow/orange
    population: "1,713,070",
    crimeRate: "8.2%",
    incidents: "12,450",
    mostCommon: "Hurto",
    trend: "-3.5% vs año anterior",
    capital: "Panamá",
  },
  Colón: {
    color: "#0066cc", // blue
    population: "294,060",
    crimeRate: "9.7%",
    incidents: "4,320",
    mostCommon: "Robo",
    trend: "+1.2% vs año anterior",
    capital: "Colón",
  },
  Darién: {
    color: "#9933cc", // purple
    population: "55,055",
    crimeRate: "7.1%",
    incidents: "920",
    mostCommon: "Tráfico ilícito",
    trend: "+2.4% vs año anterior",
    capital: "La Palma",
  },
  Emberá: {
    color: "#0099cc", // light blue
    population: "11,000",
    crimeRate: "2.9%",
    incidents: "320",
    mostCommon: "Hurto",
    trend: "-0.8% vs año anterior",
    capital: "Unión Chocó",
  },
  "Kuna Yala": {
    color: "#00cc66", // light green
    population: "40,620",
    crimeRate: "2.1%",
    incidents: "210",
    mostCommon: "Hurto",
    trend: "-1.5% vs año anterior",
    capital: "El Porvenir",
  },
  "Kuna de Madugandí": {
    color: "#ff3333", // bright red
    population: "5,000",
    crimeRate: "1.8%",
    incidents: "90",
    mostCommon: "Hurto",
    trend: "-0.5% vs año anterior",
    capital: "Akua Yala",
  },
  "Kuna de Wargandí": {
    color: "#ff8533", // orange-red
    population: "1,800",
    crimeRate: "1.5%",
    incidents: "27",
    mostCommon: "Hurto",
    trend: "0% vs año anterior",
    capital: "Nurra",
  },
}

export default function PanamaMap() {
  const [activeProvince, setActiveProvince] = useState<string | null>(null)

  const handleMouseEnter = (province: string) => {
    setActiveProvince(province)
  }

  const handleMouseLeave = () => {
    setActiveProvince(null)
  }

  return (
    <div className="relative w-full">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Mapa Interactivo de Panamá</CardTitle>
          <CardDescription>Pase el cursor sobre cada provincia para ver estadísticas detalladas</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative w-full h-[600px] bg-slate-50 rounded-lg overflow-hidden">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Bocas del Toro */}
              <path
                d="M100,100 C120,80 150,70 180,90 C200,100 190,130 170,150 C150,170 120,160 100,140 C80,120 80,120 100,100"
                fill={activeProvince === "Bocas del Toro" ? "#ff7c33" : provinceData["Bocas del Toro"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Bocas del Toro")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="140" y="120" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Bocas del Toro
              </text>
              <circle cx="140" cy="100" r="3" fill="#fff" />
              <text x="150" y="100" fill="#fff" fontSize="8">
                Bocas del Toro
              </text>

              {/* Chiriquí */}
              <path
                d="M120,170 C140,150 180,150 200,170 C220,190 220,230 200,250 C180,270 140,270 120,250 C100,230 100,190 120,170"
                fill={activeProvince === "Chiriquí" ? "#3399ff" : provinceData["Chiriquí"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Chiriquí")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="160" y="210" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Chiriquí
              </text>
              <circle cx="160" cy="240" r="3" fill="#fff" />
              <text x="170" y="240" fill="#fff" fontSize="8">
                David
              </text>

              {/* Ngobe-Bugle */}
              <path
                d="M200,170 C230,150 260,150 280,170 C300,190 300,220 280,240 C260,260 230,260 200,240 C180,220 180,190 200,170"
                fill={activeProvince === "Ngobe-Bugle" ? "#ff3333" : provinceData["Ngobe-Bugle"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Ngobe-Bugle")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="240" y="200" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Ngobe-Bugle
              </text>
              <circle cx="240" cy="220" r="3" fill="#fff" />
              <text x="250" y="220" fill="#fff" fontSize="8">
                Chichica
              </text>

              {/* Veraguas */}
              <path
                d="M280,170 C310,150 340,150 370,170 C400,190 400,230 370,250 C340,270 310,270 280,250 C250,230 250,190 280,170"
                fill={activeProvince === "Veraguas" ? "#00cc44" : provinceData["Veraguas"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Veraguas")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="325" y="210" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Veraguas
              </text>
              <circle cx="325" cy="240" r="3" fill="#fff" />
              <text x="335" y="240" fill="#fff" fontSize="8">
                Santiago
              </text>

              {/* Coclé */}
              <path
                d="M370,170 C400,150 430,150 460,170 C490,190 490,220 460,240 C430,260 400,260 370,240 C340,220 340,190 370,170"
                fill={activeProvince === "Coclé" ? "#ff33a1" : provinceData["Coclé"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Coclé")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="415" y="200" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Coclé
              </text>
              <circle cx="415" cy="220" r="3" fill="#fff" />
              <text x="425" y="220" fill="#fff" fontSize="8">
                Penonomé
              </text>

              {/* Herrera */}
              <path
                d="M370,250 C390,230 410,230 430,250 C450,270 450,290 430,310 C410,330 390,330 370,310 C350,290 350,270 370,250"
                fill={activeProvince === "Herrera" ? "#b366ff" : provinceData["Herrera"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Herrera")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="400" y="280" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Herrera
              </text>
              <circle cx="400" cy="300" r="3" fill="#fff" />
              <text x="410" y="300" fill="#fff" fontSize="8">
                Chitré
              </text>

              {/* Los Santos */}
              <path
                d="M430,250 C450,230 470,230 490,250 C510,270 510,290 490,310 C470,330 450,330 430,310 C410,290 410,270 430,250"
                fill={activeProvince === "Los Santos" ? "#ff1a1a" : provinceData["Los Santos"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Los Santos")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="460" y="280" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Los Santos
              </text>
              <circle cx="460" cy="300" r="3" fill="#fff" />
              <text x="470" y="300" fill="#fff" fontSize="8">
                Las Tablas
              </text>

              {/* Panamá */}
              <path
                d="M460,170 C490,150 520,150 550,170 C580,190 580,220 550,240 C520,260 490,260 460,240 C430,220 430,190 460,170"
                fill={activeProvince === "Panamá" ? "#ffcc33" : provinceData["Panamá"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Panamá")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="505" y="200" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Panamá
              </text>
              <circle cx="505" cy="220" r="3" fill="#fff" />
              <text x="515" y="220" fill="#fff" fontSize="8">
                Panamá
              </text>

              {/* Colón */}
              <path
                d="M460,120 C490,100 520,100 550,120 C580,140 580,170 550,190 C520,210 490,210 460,190 C430,170 430,140 460,120"
                fill={activeProvince === "Colón" ? "#3399ff" : provinceData["Colón"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Colón")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="505" y="150" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Colón
              </text>
              <circle cx="505" cy="130" r="3" fill="#fff" />
              <text x="515" y="130" fill="#fff" fontSize="8">
                Colón
              </text>

              {/* Darién */}
              <path
                d="M550,170 C580,150 610,150 640,170 C670,190 670,220 640,240 C610,260 580,260 550,240 C520,220 520,190 550,170"
                fill={activeProvince === "Darién" ? "#b366ff" : provinceData["Darién"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Darién")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="595" y="200" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Darién
              </text>
              <circle cx="595" cy="220" r="3" fill="#fff" />
              <text x="605" y="220" fill="#fff" fontSize="8">
                La Palma
              </text>

              {/* Emberá */}
              <path
                d="M640,170 C660,150 680,150 700,170 C720,190 720,210 700,230 C680,250 660,250 640,230 C620,210 620,190 640,170"
                fill={activeProvince === "Emberá" ? "#33ccff" : provinceData["Emberá"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Emberá")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="670" y="200" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Emberá
              </text>

              {/* Kuna Yala */}
              <path
                d="M550,120 C580,100 610,100 640,120 C670,140 670,160 640,180 C610,200 580,200 550,180 C520,160 520,140 550,120"
                fill={activeProvince === "Kuna Yala" ? "#33ff99" : provinceData["Kuna Yala"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Kuna Yala")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="595" y="140" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Kuna Yala
              </text>
              <circle cx="595" cy="120" r="3" fill="#fff" />
              <text x="605" y="120" fill="#fff" fontSize="8">
                El Porvenir
              </text>

              {/* Kuna de Madugandí */}
              <path
                d="M640,120 C660,100 680,100 700,120 C720,140 720,160 700,180 C680,200 660,200 640,180 C620,160 620,140 640,120"
                fill={activeProvince === "Kuna de Madugandí" ? "#ff5c5c" : provinceData["Kuna de Madugandí"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Kuna de Madugandí")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="670" y="150" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Kuna de
              </text>
              <text x="670" y="165" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Madugandí
              </text>

              {/* Kuna de Wargandí */}
              <path
                d="M700,120 C720,100 740,100 760,120 C780,140 780,160 760,180 C740,200 720,200 700,180 C680,160 680,140 700,120"
                fill={activeProvince === "Kuna de Wargandí" ? "#ff9966" : provinceData["Kuna de Wargandí"].color}
                stroke="#fff"
                strokeWidth="2"
                onMouseEnter={() => handleMouseEnter("Kuna de Wargandí")}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer transition-colors duration-300"
              />
              <text x="730" y="150" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Kuna de
              </text>
              <text x="730" y="165" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Wargandí
              </text>

              {/* Compass */}
              <circle cx="900" cy="80" r="20" fill="white" stroke="#1e40af" strokeWidth="1" />
              <path d="M900,60 L900,100 M880,80 L920,80" stroke="#1e40af" strokeWidth="1" />
              <text x="900" y="70" fontSize="10" fill="#1e40af" textAnchor="middle">
                N
              </text>
              <text x="910" y="80" fontSize="10" fill="#1e40af" textAnchor="middle">
                E
              </text>
              <text x="900" y="90" fontSize="10" fill="#1e40af" textAnchor="middle">
                S
              </text>
              <text x="890" y="80" fontSize="10" fill="#1e40af" textAnchor="middle">
                O
              </text>

              {/* Scale */}
              <line x1="850" y1="450" x2="950" y2="450" stroke="#1e40af" strokeWidth="1" />
              <text x="900" y="465" fontSize="10" fill="#1e40af" textAnchor="middle">
                100 km
              </text>

              {/* Title */}
              <text x="500" y="40" fontSize="24" fill="#1e40af" fontWeight="bold" textAnchor="middle">
                Panamá
              </text>
            </svg>

            {/* Statistics Panel */}
            {activeProvince && provinceData[activeProvince as keyof typeof provinceData] && (
              <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-primary/20 w-64">
                <h3 className="text-lg font-bold text-primary mb-2">{activeProvince}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Capital:</div>
                  <div>{provinceData[activeProvince as keyof typeof provinceData].capital}</div>

                  <div className="font-medium">Población:</div>
                  <div>{provinceData[activeProvince as keyof typeof provinceData].population}</div>

                  <div className="font-medium">Tasa de criminalidad:</div>
                  <div>{provinceData[activeProvince as keyof typeof provinceData].crimeRate}</div>

                  <div className="font-medium">Incidentes reportados:</div>
                  <div>{provinceData[activeProvince as keyof typeof provinceData].incidents}</div>

                  <div className="font-medium">Delito más común:</div>
                  <div>{provinceData[activeProvince as keyof typeof provinceData].mostCommon}</div>

                  <div className="font-medium">Tendencia:</div>
                  <div
                    className={
                      provinceData[activeProvince as keyof typeof provinceData].trend.includes("+")
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {provinceData[activeProvince as keyof typeof provinceData].trend}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
