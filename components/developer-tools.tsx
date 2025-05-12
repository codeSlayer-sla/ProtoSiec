"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, Download, ExternalLink } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  language: string
  code: string
  title?: string
}

function CodeSnippet({ language, code, title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <div className="relative">
        <pre
          className={cn(
            "overflow-x-auto p-4 text-sm rounded-md",
            language === "bash" && "bg-black text-white",
            language === "javascript" && "bg-slate-950 text-amber-300",
            language === "python" && "bg-slate-950 text-blue-300",
            language === "r" && "bg-slate-950 text-green-300",
          )}
        >
          <code>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
          aria-label="Copiar código"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

export default function DeveloperTools() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Herramientas para Desarrolladores</h3>
        <p className="text-muted-foreground">
          Utiliza nuestras bibliotecas y herramientas para integrar los datos de SIEC en tus aplicaciones y análisis.
        </p>
      </div>

      <Tabs defaultValue="libraries" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="libraries">Bibliotecas</TabsTrigger>
          <TabsTrigger value="tools">Herramientas</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="libraries" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>siec-js</CardTitle>
                <CardDescription>Biblioteca JavaScript para acceder a la API de SIEC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Una biblioteca JavaScript que facilita la integración con nuestra API. Compatible con Node.js y
                  navegadores.
                </p>
                <CodeSnippet
                  language="javascript"
                  code={`// Instalar con npm
npm install siec-js

// O con yarn
yarn add siec-js

// Uso básico
import { SiecClient } from 'siec-js';

const client = new SiecClient({
  apiKey: 'YOUR_API_KEY'
});

// Obtener estadísticas de criminalidad
async function getCrimeStats() {
  const stats = await client.statistics.get({
    province: 'panama',
    year: 2023
  });
  
  console.log(stats);
}`}
                  title="Instalación y uso básico"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>siec-py</CardTitle>
                <CardDescription>Biblioteca Python para análisis de datos de SIEC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Una biblioteca Python que permite acceder a los datos de SIEC y realizar análisis avanzados.
                  Integración con pandas y matplotlib.
                </p>
                <CodeSnippet
                  language="python"
                  code={`# Instalar con pip
pip install siec-py

# Uso básico
from siec_py import SiecClient

client = SiecClient(api_key="YOUR_API_KEY")

# Obtener datos y convertir a DataFrame
df = client.get_crime_data(
    province="panama",
    year=2023,
    as_dataframe=True
)

# Análisis básico
print(df.describe())

# Visualización
df.plot(kind="bar", x="month", y="count")`}
                  title="Instalación y uso básico"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>siec-r</CardTitle>
                <CardDescription>Paquete R para análisis estadístico de datos de SIEC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Un paquete R que permite acceder a los datos de SIEC y realizar análisis estadísticos avanzados.
                </p>
                <CodeSnippet
                  language="r"
                  code={`# Instalar desde CRAN
install.packages("siec")

# O desde GitHub
devtools::install_github("siec-panama/siec-r")

# Uso básico
library(siec)

# Configurar API key
siec_config(api_key = "YOUR_API_KEY")

# Obtener datos
crime_data <- get_crime_data(
  province = "panama",
  year = 2023
)

# Análisis básico
summary(crime_data)

# Visualización
library(ggplot2)
ggplot(crime_data, aes(x = month, y = count, fill = crime_type)) +
  geom_bar(stat = "identity", position = "dodge")`}
                  title="Instalación y uso básico"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>siec-widgets</CardTitle>
                <CardDescription>Componentes web para visualizar datos de SIEC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Una biblioteca de componentes web que permite integrar visualizaciones de datos de SIEC en cualquier
                  sitio web.
                </p>
                <CodeSnippet
                  language="javascript"
                  code={`<!-- Incluir la biblioteca -->
<script src="https://cdn.siec.gob.pa/widgets/v1/siec-widgets.js"></script>

<!-- Añadir un widget de estadísticas -->
<div id="siec-crime-chart" data-province="panama" data-year="2023"></div>

<script>
  // Inicializar widgets
  SIEC.widgets.init({
    apiKey: 'YOUR_API_KEY'
  });
  
  // Configurar el widget
  SIEC.widgets.createChart('siec-crime-chart', {
    type: 'line',
    title: 'Estadísticas de Criminalidad 2023'
  });
</script>`}
                  title="Integración en sitios web"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>API Explorer</CardTitle>
                <CardDescription>Herramienta interactiva para explorar la API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Una interfaz web que permite explorar y probar todos los endpoints de la API de SIEC sin escribir
                  código.
                </p>
                <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-sm text-muted-foreground mb-4">Vista previa de API Explorer</p>
                    <Button>Abrir API Explorer</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Playground</CardTitle>
                <CardDescription>Entorno interactivo para análisis de datos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Un entorno Jupyter-like que permite explorar y analizar los datos de SIEC directamente en el
                  navegador.
                </p>
                <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-sm text-muted-foreground mb-4">Vista previa de Data Playground</p>
                    <Button>Abrir Data Playground</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CLI de SIEC</CardTitle>
                <CardDescription>Herramienta de línea de comandos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Una herramienta de línea de comandos que permite acceder a los datos de SIEC desde la terminal.
                </p>
                <CodeSnippet
                  language="bash"
                  code={`# Instalar con npm
npm install -g siec-cli

# Configurar API key
siec config set-key YOUR_API_KEY

# Obtener estadísticas
siec stats get --province panama --year 2023

# Descargar datos en CSV
siec data download --dataset crime-stats --format csv --output ./data.csv

# Ver ayuda
siec --help`}
                  title="Instalación y comandos básicos"
                />
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    Documentación
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generador de Informes</CardTitle>
                <CardDescription>Crea informes personalizados con datos de SIEC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Una herramienta web que permite crear informes personalizados con datos de SIEC en formato PDF, Excel
                  o PowerPoint.
                </p>
                <div className="aspect-video bg-slate-100 rounded-md flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-sm text-muted-foreground mb-4">Vista previa del Generador de Informes</p>
                    <Button>Crear informe</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Guías y Tutoriales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Primeros pasos con la API de SIEC
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Análisis de datos criminales con Python
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Creación de dashboards interactivos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Visualización geoespacial de datos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Integración con sistemas GIS
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ejemplos de Código</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Dashboard con React y siec-js
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Análisis predictivo con Python
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Mapa de calor con Leaflet
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Integración con Power BI
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Aplicación móvil con React Native
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comunidad y Soporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Foro de desarrolladores
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      GitHub de SIEC
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Canal de Slack
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Eventos y webinars
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      Soporte técnico
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
