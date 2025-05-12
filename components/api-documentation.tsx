"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  language: string
  code: string
  title?: string
  description?: string
}

function CodeSnippet({ language, code, title, description }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      {title && (
        <CardHeader className="bg-muted/50 py-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8"
              aria-label="Copiar código"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <pre
          className={cn(
            "overflow-x-auto p-4 text-sm",
            language === "bash" && "bg-black text-white",
            language === "json" && "bg-slate-950 text-emerald-300",
            language === "javascript" && "bg-slate-950 text-amber-300",
            language === "python" && "bg-slate-950 text-blue-300",
          )}
        >
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

export default function ApiDocumentation() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Documentación de la API</h3>
        <p className="text-muted-foreground">
          Nuestra API RESTful permite acceder programáticamente a todos los conjuntos de datos disponibles en el portal.
          Utiliza los siguientes endpoints y ejemplos para integrar nuestros datos en tus aplicaciones.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Descripción general</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Ejemplos</TabsTrigger>
          <TabsTrigger value="authentication">Autenticación</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API de Datos Abiertos SIEC</CardTitle>
              <CardDescription>Versión actual: v1.0 | Base URL: https://api.datos.siec.gob.pa/v1</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Características principales</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Acceso a todos los conjuntos de datos públicos</li>
                  <li>Filtrado avanzado por provincia, fecha, tipo de delito y más</li>
                  <li>Formatos de respuesta en JSON, CSV y GeoJSON</li>
                  <li>Límite de 1000 solicitudes por hora por API key</li>
                  <li>Datos actualizados cada 24 horas</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Requisitos</h4>
                <p>
                  Para utilizar la API, necesitas registrarte y obtener una API key. La autenticación se realiza
                  mediante un token JWT o una API key en el encabezado de la solicitud.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Terminal className="h-5 w-5" />
                <span className="text-sm font-medium">Prueba rápida con curl:</span>
              </div>

              <CodeSnippet
                language="bash"
                code={`curl -X GET "https://api.datos.siec.gob.pa/v1/datasets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">GET /datasets</CardTitle>
                <CardDescription>Obtiene la lista de todos los conjuntos de datos disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Parámetros de consulta:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    <code className="bg-muted px-1 rounded">page</code>: Número de página (default: 1)
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">limit</code>: Resultados por página (default: 20, max: 100)
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">category</code>: Filtrar por categoría
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">GET /datasets/{"{id}"}</CardTitle>
                <CardDescription>Obtiene un conjunto de datos específico por ID</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Parámetros de ruta:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    <code className="bg-muted px-1 rounded">id</code>: ID del conjunto de datos
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">GET /statistics</CardTitle>
                <CardDescription>Obtiene estadísticas generales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Parámetros de consulta:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    <code className="bg-muted px-1 rounded">year</code>: Filtrar por año
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">province</code>: Filtrar por provincia
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">type</code>: Tipo de estadística
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">GET /provinces/{"{id}"}/statistics</CardTitle>
                <CardDescription>Obtiene estadísticas para una provincia específica</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">Parámetros de ruta:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    <code className="bg-muted px-1 rounded">id</code>: ID de la provincia
                  </li>
                </ul>
                <p className="text-sm mb-2 mt-2">Parámetros de consulta:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    <code className="bg-muted px-1 rounded">year</code>: Filtrar por año
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">type</code>: Tipo de estadística
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4 mt-4">
          <div className="grid gap-6">
            <CodeSnippet
              language="javascript"
              code={`// Ejemplo con JavaScript (Node.js)
const axios = require('axios');

async function fetchCrimeData() {
  try {
    const response = await axios.get('https://api.datos.siec.gob.pa/v1/statistics', {
      params: {
        province: 'panama',
        year: 2023,
        type: 'crime'
      },
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchCrimeData();`}
              title="Consulta de estadísticas de criminalidad"
              description="Obtiene datos de criminalidad para la provincia de Panamá en 2023"
            />

            <CodeSnippet
              language="python"
              code={`# Ejemplo con Python
import requests

def get_province_data(province_id, year):
    url = f"https://api.datos.siec.gob.pa/v1/provinces/{province_id}/statistics"
    
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    
    params = {
        "year": year
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None

# Obtener datos para Chiriquí en 2022
data = get_province_data("chiriqui", 2022)
print(data)`}
              title="Obtener datos por provincia"
              description="Consulta estadísticas para una provincia específica por año"
            />

            <CodeSnippet
              language="bash"
              code={`# Descargar datos en formato CSV
curl -X GET "https://api.datos.siec.gob.pa/v1/datasets/crime-statistics?format=csv" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -o crime_statistics.csv`}
              title="Descarga de datos en CSV"
              description="Ejemplo de cómo descargar un conjunto de datos en formato CSV"
            />

            <CodeSnippet
              language="json"
              code={`// Ejemplo de respuesta JSON
{
  "data": [
    {
      "id": "crime-001",
      "province": "Panama",
      "year": 2023,
      "month": 1,
      "crime_type": "theft",
      "count": 245,
      "trend": "+3.2%",
      "location": {
        "lat": 8.9936,
        "lng": -79.5197
      }
    },
    {
      "id": "crime-002",
      "province": "Panama",
      "year": 2023,
      "month": 1,
      "crime_type": "robbery",
      "count": 112,
      "trend": "-1.8%",
      "location": {
        "lat": 8.9848,
        "lng": -79.5181
      }
    }
  ],
  "meta": {
    "total": 1250,
    "page": 1,
    "limit": 20,
    "pages": 63
  }
}`}
              title="Estructura de respuesta JSON"
              description="Formato típico de respuesta de la API"
            />
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Autenticación y Autorización</CardTitle>
              <CardDescription>
                Nuestra API utiliza autenticación basada en tokens JWT para garantizar la seguridad de los datos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Obtener una API Key</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    Regístrate en el portal de desarrolladores:{" "}
                    <a href="#" className="text-primary hover:underline">
                      https://developers.siec.gob.pa
                    </a>
                  </li>
                  <li>Crea un nuevo proyecto y solicita una API key</li>
                  <li>Configura los dominios permitidos y el nivel de acceso</li>
                  <li>Descarga tus credenciales</li>
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-2">Uso de la API Key</h4>
                <p className="mb-2">Incluye tu API key en el encabezado de autorización de todas tus solicitudes:</p>
                <CodeSnippet
                  language="bash"
                  code={`curl -X GET "https://api.datos.siec.gob.pa/v1/datasets" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">Límites de uso</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Plan Básico: 1,000 solicitudes por hora</li>
                  <li>Plan Estándar: 5,000 solicitudes por hora</li>
                  <li>Plan Institucional: 20,000 solicitudes por hora</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">
                  Si necesitas un mayor límite de solicitudes, contacta con nuestro equipo de soporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
