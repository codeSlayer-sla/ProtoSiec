import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

// Tipo para los datos del dataset
export type DatasetData = {
  id: string
  title: string
  description: string
  date: string
  source: string
  category: string
  tags: string[]
  data: Record<string, any>[]
}

// Función para forzar la descarga de un archivo
export function forceDownload(blob: Blob, filename: string) {
  console.log(`Forzando descarga de ${filename}...`)

  // Crear un elemento <a> temporal
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.style.display = "none"

  // Añadir al DOM, simular clic y limpiar
  document.body.appendChild(link)
  link.click()

  // Pequeño retraso antes de limpiar para asegurar que la descarga comience
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    console.log(`Descarga de ${filename} iniciada correctamente`)
  }, 100)
}

// Función para generar un nombre de archivo basado en el título del dataset
export function generateFilename(title: string, format: string): string {
  const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const timestamp = new Date().toISOString().split("T")[0]
  return `${sanitizedTitle}-${timestamp}.${format}`
}

// Datos reales de Panamá para generar ejemplos más realistas
const panamaData = {
  provinces: [
    { name: "Panamá", population: 1713070, capital: "Ciudad de Panamá" },
    { name: "Colón", population: 289764, capital: "Colón" },
    { name: "Chiriquí", population: 416873, capital: "David" },
    { name: "Bocas del Toro", population: 125461, capital: "Bocas del Toro" },
    { name: "Veraguas", population: 226991, capital: "Santiago" },
    { name: "Coclé", population: 233708, capital: "Penonomé" },
    { name: "Herrera", population: 107911, capital: "Chitré" },
    { name: "Los Santos", population: 89592, capital: "Las Tablas" },
    { name: "Darién", population: 46951, capital: "La Palma" },
  ],
  crimeTypes: [
    { id: "homicide", name: "Homicidio", severity: 10 },
    { id: "robbery", name: "Robo", severity: 7 },
    { id: "theft", name: "Hurto", severity: 5 },
    { id: "assault", name: "Agresión", severity: 6 },
    { id: "domestic_violence", name: "Violencia doméstica", severity: 8 },
    { id: "drug_trafficking", name: "Tráfico de drogas", severity: 9 },
    { id: "fraud", name: "Fraude", severity: 6 },
    { id: "kidnapping", name: "Secuestro", severity: 9 },
    { id: "sexual_assault", name: "Agresión sexual", severity: 9 },
    { id: "vandalism", name: "Vandalismo", severity: 4 },
  ],
  years: [2018, 2019, 2020, 2021, 2022, 2023],
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  trends: ["+1.2%", "-0.8%", "+3.5%", "-2.1%", "+0.3%", "-1.5%", "+2.7%", "-0.5%"],
  coordinates: {
    Panamá: [-79.5197, 8.9936],
    Colón: [-79.88, 9.35],
    Chiriquí: [-82.42, 8.42],
    "Bocas del Toro": [-82.25, 9.33],
    Veraguas: [-81.08, 8.12],
    Coclé: [-80.37, 8.51],
    Herrera: [-80.7, 7.8],
    "Los Santos": [-80.42, 7.5],
    Darién: [-77.9, 8.4],
  },
}

// Función para generar datos de muestra más realistas
export const generateSampleData = (category: string, count: number, includeLocation = false): any[] => {
  const sampleData: any[] = []

  // Generar datos basados en la categoría
  switch (category.toLowerCase()) {
    case "estadisticas_criminales":
      return generateCrimeStatistics(count, includeLocation)
    case "datos_demograficos":
      return generateDemographicData(count, includeLocation)
    case "incidentes_reportados":
      return generateIncidentReports(count, includeLocation)
    case "tendencias_seguridad":
      return generateSecurityTrends(count)
    default:
      return generateGenericData(category, count, includeLocation)
  }
}

// Función para generar estadísticas criminales
function generateCrimeStatistics(count: number, includeLocation = false): any[] {
  const data: any[] = []

  for (let i = 0; i < Math.min(count, 100); i++) {
    const province = panamaData.provinces[Math.floor(Math.random() * panamaData.provinces.length)]
    const crimeType = panamaData.crimeTypes[Math.floor(Math.random() * panamaData.crimeTypes.length)]
    const year = panamaData.years[Math.floor(Math.random() * panamaData.years.length)]
    const month = panamaData.months[Math.floor(Math.random() * panamaData.months.length)]

    // Generar un valor basado en la población y la severidad del crimen
    const populationFactor = province.population / 1000000
    const severityFactor = crimeType.severity / 10
    const randomFactor = 0.5 + Math.random()

    // Calcular un valor que tenga sentido para el tipo de crimen y la población
    const value = Math.floor(populationFactor * severityFactor * randomFactor * 100)

    // Calcular una tasa por cada 100,000 habitantes
    const rate = (value / province.population) * 100000

    const item: any = {
      id: `crime-${i + 1}`,
      province: province.name,
      year: year,
      month: month,
      crime_type: crimeType.id,
      crime_name: crimeType.name,
      count: value,
      rate: Number.parseFloat(rate.toFixed(2)),
      trend: panamaData.trends[Math.floor(Math.random() * panamaData.trends.length)],
      severity: crimeType.severity,
    }

    if (includeLocation) {
      const coordinates = panamaData.coordinates[province.name as keyof typeof panamaData.coordinates] || [
        -79.5197, 8.9936,
      ]
      item.location = {
        lat: coordinates[1],
        lng: coordinates[0],
      }
    }

    data.push(item)
  }

  return data
}

// Función para generar datos demográficos
function generateDemographicData(count: number, includeLocation = false): any[] {
  const data: any[] = []

  for (let i = 0; i < Math.min(count, panamaData.provinces.length); i++) {
    const province = panamaData.provinces[i]
    const malePercentage = 48 + Math.random() * 4 // Entre 48% y 52%
    const femalePercentage = 100 - malePercentage
    const urbanPercentage = 50 + Math.random() * 40 // Entre 50% y 90%
    const ruralPercentage = 100 - urbanPercentage

    const item: any = {
      id: `demographic-${i + 1}`,
      province: province.name,
      capital: province.capital,
      population: province.population,
      population_density: Math.round(province.population / (100 + Math.random() * 900)), // Densidad por km²
      male_percentage: Number.parseFloat(malePercentage.toFixed(1)),
      female_percentage: Number.parseFloat(femalePercentage.toFixed(1)),
      urban_percentage: Number.parseFloat(urbanPercentage.toFixed(1)),
      rural_percentage: Number.parseFloat(ruralPercentage.toFixed(1)),
      growth_rate: Number.parseFloat((Math.random() * 2 - 0.5).toFixed(2)), // Entre -0.5% y 1.5%
    }

    if (includeLocation) {
      const coordinates = panamaData.coordinates[province.name as keyof typeof panamaData.coordinates] || [
        -79.5197, 8.9936,
      ]
      item.location = {
        lat: coordinates[1],
        lng: coordinates[0],
      }
    }

    data.push(item)
  }

  return data
}

// Función para generar reportes de incidentes
function generateIncidentReports(count: number, includeLocation = false): any[] {
  const data: any[] = []

  for (let i = 0; i < Math.min(count, 100); i++) {
    const province = panamaData.provinces[Math.floor(Math.random() * panamaData.provinces.length)]
    const crimeType = panamaData.crimeTypes[Math.floor(Math.random() * panamaData.crimeTypes.length)]
    const year = panamaData.years[Math.floor(Math.random() * panamaData.years.length)]
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1
    const hour = Math.floor(Math.random() * 24)
    const minute = Math.floor(Math.random() * 60)

    const date = new Date(year, month - 1, day, hour, minute)

    const item: any = {
      id: `incident-${i + 1}`,
      case_number: `SIEC-${year}-${String(i + 1000).substring(1)}`,
      date: date.toISOString(),
      province: province.name,
      district: `Distrito ${Math.floor(Math.random() * 10) + 1}`,
      crime_type: crimeType.id,
      crime_name: crimeType.name,
      status: Math.random() > 0.3 ? "Resuelto" : "En investigación",
      severity: crimeType.severity,
    }

    if (includeLocation) {
      const baseCoordinates = panamaData.coordinates[province.name as keyof typeof panamaData.coordinates] || [
        -79.5197, 8.9936,
      ]
      // Añadir una pequeña variación a las coordenadas para que no todos los puntos estén en el mismo lugar
      const lat = baseCoordinates[1] + (Math.random() * 0.2 - 0.1)
      const lng = baseCoordinates[0] + (Math.random() * 0.2 - 0.1)

      item.location = {
        lat: Number.parseFloat(lat.toFixed(4)),
        lng: Number.parseFloat(lng.toFixed(4)),
      }
    }

    data.push(item)
  }

  return data
}

// Función para generar tendencias de seguridad
function generateSecurityTrends(count: number): any[] {
  const data: any[] = []
  const years = panamaData.years.slice(-5) // Últimos 5 años

  for (let i = 0; i < Math.min(count, panamaData.crimeTypes.length * years.length); i++) {
    const crimeTypeIndex = Math.floor(i / years.length)
    const yearIndex = i % years.length

    if (crimeTypeIndex < panamaData.crimeTypes.length) {
      const crimeType = panamaData.crimeTypes[crimeTypeIndex]
      const year = years[yearIndex]

      // Generar una tendencia que tenga sentido a lo largo de los años
      const baseTrend = 100 - crimeType.severity * 5 // Valor base que depende de la severidad
      const yearFactor = (yearIndex / years.length) * 20 // Factor que cambia con los años
      const randomFactor = Math.random() * 10 - 5 // Variación aleatoria

      const value = Math.max(0, baseTrend + yearFactor + randomFactor)
      const previousValue =
        yearIndex > 0
          ? data.find((d) => d.crime_type === crimeType.id && d.year === years[yearIndex - 1])?.value || value * 0.9
          : value * 0.9

      const percentChange = ((value - previousValue) / previousValue) * 100

      const item: any = {
        id: `trend-${i + 1}`,
        year: year,
        crime_type: crimeType.id,
        crime_name: crimeType.name,
        value: Number.parseFloat(value.toFixed(1)),
        percent_change: Number.parseFloat(percentChange.toFixed(1)),
        trend_direction: percentChange > 0 ? "up" : "down",
      }

      data.push(item)
    }
  }

  return data
}

// Función para generar datos genéricos
function generateGenericData(category: string, count: number, includeLocation = false): any[] {
  const sampleData: any[] = []

  for (let i = 0; i < Math.min(count, 100); i++) {
    const province = panamaData.provinces[Math.floor(Math.random() * panamaData.provinces.length)]
    const year = panamaData.years[Math.floor(Math.random() * panamaData.years.length)]
    const value = Math.floor(Math.random() * 1000)

    const item: any = {
      id: `${category.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
      province: province.name,
      year: year,
      category: category,
      value: value,
      count: value,
      trend: panamaData.trends[Math.floor(Math.random() * panamaData.trends.length)],
    }

    if (includeLocation) {
      const coordinates = panamaData.coordinates[province.name as keyof typeof panamaData.coordinates] || [
        -79.5197, 8.9936,
      ]
      item.location = {
        lat: coordinates[1],
        lng: coordinates[0],
      }
    }

    sampleData.push(item)
  }

  return sampleData
}

// Función para traducir encabezados al español
const translateHeaders = (headers: string[]): string[] => {
  const translations: Record<string, string> = {
    id: "ID",
    title: "Título",
    description: "Descripción",
    date: "Fecha",
    source: "Fuente",
    category: "Categoría",
    tags: "Etiquetas",
    data: "Datos",
    province: "Provincia",
    year: "Año",
    month: "Mes",
    crime_type: "Tipo de Delito",
    crime_name: "Nombre del Delito",
    count: "Cantidad",
    rate: "Tasa",
    trend: "Tendencia",
    severity: "Severidad",
    location: "Ubicación",
    latitude: "Latitud",
    longitude: "Longitud",
    capital: "Capital",
    population: "Población",
    population_density: "Densidad Poblacional",
    male_percentage: "Porcentaje Masculino",
    female_percentage: "Porcentaje Femenino",
    urban_percentage: "Porcentaje Urbano",
    rural_percentage: "Porcentaje Rural",
    growth_rate: "Tasa de Crecimiento",
    case_number: "Número de Caso",
    district: "Distrito",
    status: "Estado",
    downloads: "Descargas",
    updated_at: "Actualizado",
    record_count: "Cantidad de Registros"
  }

  return headers.map(header => translations[header] || header)
}

// Funciones de descarga
export async function downloadJSON(datasetName: string, count = 20): Promise<void> {
  try {
    console.log("Iniciando descarga en formato JSON...")

    // Generar datos de muestra
    const data = generateSampleData(datasetName, count, true)

    // Convertir a JSON
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const filename = `${datasetName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.json`

    // Forzar descarga
    forceDownload(blob, filename)

    console.log("JSON descargado correctamente")
    return Promise.resolve()
  } catch (error) {
    console.error("Error al descargar JSON:", error)
    return Promise.reject(error)
  }
}

export async function downloadCSV(datasetName: string, count = 20): Promise<void> {
  try {
    console.log("Iniciando descarga en formato CSV...")

    // Generar datos de muestra
    const data = generateSampleData(datasetName, count, true)

    // Obtener encabezados
    if (data.length === 0) {
      throw new Error("No hay datos para generar el CSV")
    }

    const headers = Object.keys(data[0])
    const translatedHeaders = translateHeaders(headers)

    // Crear contenido CSV
    let csvContent = translatedHeaders.join(",") + "\n"

    // Añadir filas
    data.forEach((row) => {
      const values = headers.map((header) => {
        const cell = row[header]

        // Manejar objetos anidados (como location)
        if (typeof cell === "object" && cell !== null) {
          return `"${JSON.stringify(cell).replace(/"/g, '""')}"`
        }

        // Escapar comas y comillas
        const cellStr = cell !== undefined ? String(cell).replace(/"/g, '""') : ""
        return `"${cellStr}"`
      })

      csvContent += values.join(",") + "\n"
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
    const filename = `${datasetName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.csv`

    // Forzar descarga
    forceDownload(blob, filename)

    console.log("CSV descargado correctamente")
    return Promise.resolve()
  } catch (error) {
    console.error("Error al descargar CSV:", error)
    return Promise.reject(error)
  }
}

export async function downloadExcel(datasetName: string, count = 20): Promise<void> {
  try {
    console.log("Iniciando descarga en formato Excel...")

    // Generar datos de muestra
    const data = generateSampleData(datasetName, count, true)

    // Verificar que hay datos
    if (!data || data.length === 0) {
      throw new Error("No hay datos para generar el Excel")
    }

    // Preparar datos para Excel (aplanar objetos anidados)
    const flatData = data.map((item) => {
      const flatItem: Record<string, any> = { ...item }

      // Aplanar el objeto location si existe
      if (item.location) {
        flatItem.latitude = item.location.lat
        flatItem.longitude = item.location.lng
        delete flatItem.location
      }

      return flatItem
    })

    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new()

    // Convertir datos a formato de hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(flatData)

    // Traducir encabezados
    const headers = Object.keys(flatData[0])
    const translatedHeaders = translateHeaders(headers)
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1")
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const header = XLSX.utils.encode_col(C)
      const translatedHeader = translatedHeaders[C]
      if (ws[header + "1"]) {
        ws[header + "1"].v = translatedHeader
      }
    }

    // Añadir la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Datos")

    // Generar archivo Excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const filename = `${datasetName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.xlsx`

    // Forzar descarga
    forceDownload(blob, filename)

    console.log("Excel descargado correctamente")
    return Promise.resolve()
  } catch (error) {
    console.error("Error al descargar Excel:", error)
    return Promise.reject(error)
  }
}

export async function downloadPDF(datasetName: string, count = 20): Promise<void> {
  try {
    console.log("Iniciando descarga en formato PDF...")

    // Generar datos de muestra
    const data = generateSampleData(datasetName, count, true)

    // Verificar que hay datos
    if (!data || data.length === 0) {
      throw new Error("No hay datos para generar el PDF")
    }

    // Crear documento PDF
    const doc = new jsPDF()

    // Añadir título
    doc.setFontSize(18)
    doc.text(datasetName, 14, 22)

    // Añadir descripción
    doc.setFontSize(12)
    doc.text("Datos generados por el Portal de Datos Abiertos SIEC", 14, 32)

    // Añadir metadatos
    doc.setFontSize(10)
    doc.text(`Fuente: Sistema Integrado de Estadísticas Criminales`, 14, 42)
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 48)
    doc.text(`Categoría: ${datasetName}`, 14, 54)

    // Preparar datos para la tabla (aplanar objetos anidados)
    const flatData = data.map((item) => {
      const flatItem: Record<string, any> = { ...item }

      // Aplanar el objeto location si existe
      if (item.location) {
        flatItem.latitude = item.location.lat
        flatItem.longitude = item.location.lng
        delete flatItem.location
      }

      return flatItem
    })

    // Preparar datos para la tabla
    const headers = Object.keys(flatData[0])
    const translatedHeaders = translateHeaders(headers)
    const rows = flatData.map((row) => headers.map((header) => row[header]))

    // Añadir tabla
    autoTable(doc, {
      head: [translatedHeaders],
      body: rows,
      startY: 60,
      margin: { top: 60 },
      styles: { overflow: "linebreak", fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], fontSize: 9 },
      columnStyles: {
        // Ajustar el ancho de las columnas según sea necesario
        0: { cellWidth: 20 },
        1: { cellWidth: 25 },
      },
    })

    // Generar blob
    const pdfBlob = doc.output("blob")
    const filename = `${datasetName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`

    // Forzar descarga
    forceDownload(pdfBlob, filename)

    console.log("PDF descargado correctamente")
    return Promise.resolve()
  } catch (error) {
    console.error("Error al descargar PDF:", error)
    return Promise.reject(error)
  }
}

export async function downloadGeoJSON(datasetName: string, count = 20): Promise<void> {
  try {
    console.log("Iniciando descarga en formato GeoJSON...")

    // Generar datos de muestra con ubicaciones
    const data = generateSampleData(datasetName, count, true)

    // Verificar que hay datos
    if (!data || data.length === 0) {
      throw new Error("No hay datos para generar el GeoJSON")
    }

    // Crear estructura GeoJSON básica
    const geoJSON = {
      type: "FeatureCollection",
      features: data.map((item) => {
        // Extraer las coordenadas del objeto location
        const coordinates = item.location ? [item.location.lng, item.location.lat] : [0, 0]

        // Crear una copia del item sin el campo location para las propiedades
        const properties = { ...item }
        delete properties.location

        return {
          type: "Feature",
          properties: properties,
          geometry: {
            type: "Point",
            coordinates: coordinates,
          },
        }
      }),
    }

    const jsonString = JSON.stringify(geoJSON, null, 2)
    const blob = new Blob([jsonString], { type: "application/geo+json" })
    const filename = `${datasetName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.geojson`

    // Forzar descarga
    forceDownload(blob, filename)

    console.log("GeoJSON descargado correctamente")
    return Promise.resolve()
  } catch (error) {
    console.error("Error al descargar GeoJSON:", error)
    return Promise.reject(error)
  }
}

// Función para compartir datos
export const shareData = async (title: string, format: string) => {
  try {
    // Usar la API Web Share si está disponible
    if (navigator.share) {
      await navigator.share({
        title: `Datos de ${title} en formato ${format.toUpperCase()}`,
        text: `Accede a los datos de ${title} en formato ${format.toUpperCase()} desde el Portal de Datos Abiertos de Panamá.`,
        url: window.location.href,
      })
    } else {
      // Fallback: copiar al portapapeles
      const shareUrl = `${window.location.origin}${window.location.pathname}?dataset=${encodeURIComponent(title)}&format=${format}`
      await navigator.clipboard.writeText(shareUrl)
    }
  } catch (error) {
    // Propagar el error para que pueda ser manejado por el componente
    throw error
  }
}

// Función para descargar un conjunto de datos en el formato seleccionado
export async function downloadDataset(datasetName: string, format: string, count = 20): Promise<void> {
  switch (format.toLowerCase()) {
    case "json":
      return await downloadJSON(datasetName, count)
    case "csv":
      return await downloadCSV(datasetName, count)
    case "geojson":
      return await downloadGeoJSON(datasetName, count)
    case "excel":
      return await downloadExcel(datasetName, count)
    case "pdf":
      return await downloadPDF(datasetName, count)
    default:
      throw new Error(`Formato no soportado: ${format}`)
  }
}
