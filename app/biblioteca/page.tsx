"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { FileText, ChevronDown, Search, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface DocumentSection {
  title: string
  subsections: {
    title: string
    years: {
      year: string
      months: {
        month: string
        link?: string
        special?: string
      }[]
    }[]
  }[]
}

const documentSections: DocumentSection[] = [
  {
    title: "1. Informes Preliminares",
    subsections: [
      {
        title: "1.1 Incautación de Drogas",
        years: [
          {
            year: "2025",
            months: [
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2024",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2023",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2022",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2021",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2020",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          }
        ]
      },
      {
        title: "1.2 Armas Recuperadas",
        years: [
          {
            year: "2025",
            months: [
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2024",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2023",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2022",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2021",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2020",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Enero a Julio", special: "Enero-Julio" }
            ]
          }
        ]
      },
      {
        title: "1.3 Homicidios",
        years: [
          {
            year: "2025",
            months: [
              { month: "Mayo 18" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2024",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2023",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2022",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Junio" },
              { month: "Mayo" },
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2021",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2020",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2019",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2018 (Fuente: DIJ)",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2017 (Fuente: DIJ)",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          },
          {
            year: "2016 (Fuente: DIJ)",
            months: [
              { month: "Diciembre" },
              { month: "Noviembre" },
              { month: "Octubre" },
              { month: "Septiembre" },
              { month: "Agosto" },
              { month: "Julio" },
              { month: "Enero a Junio", special: "Enero-Junio" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "2. Informes de Criminalidad Anual",
    subsections: [
      {
        title: "Informes Anuales",
        years: [
          {
            year: "2024",
            months: [
              { month: "Número de delitos e incidencias registradas en la república de panamá, año 2024 (Preliminar)" }
            ]
          },
          {
            year: "2023",
            months: [
              { month: "Número de delitos e incidencias registradas en la república de panamá, año 2023" }
            ]
          },
          {
            year: "2022",
            months: [{ month: "Informe 2022" }]
          },
          {
            year: "2021",
            months: [{ month: "Informe 2021" }]
          },
          {
            year: "2020",
            months: [{ month: "Informe 2020" }]
          },
          {
            year: "2019",
            months: [{ month: "Informe 2019" }]
          },
          {
            year: "2018",
            months: [{ month: "Informe 2018" }]
          },
          {
            year: "2017",
            months: [{ month: "Informe 2017" }]
          },
          {
            year: "2016",
            months: [{ month: "Informe 2016" }]
          },
          {
            year: "2015",
            months: [{ month: "Informe 2015" }]
          },
          {
            year: "2014",
            months: [{ month: "Informe 2014" }]
          },
          {
            year: "2013",
            months: [{ month: "Informe 2013" }]
          },
          {
            year: "2012",
            months: [{ month: "Informe 2012" }]
          },
          {
            year: "1991-2010",
            months: [{ month: "Informes 1991-2010" }]
          }
        ]
      }
    ]
  },
  {
    title: "3. Resúmenes Ejecutivos de Delitos de Alto Impacto Social",
    subsections: [
      {
        title: "Resúmenes Mensuales",
        years: [
          {
            year: "2025",
            months: [
              { month: "Abril" },
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2024",
            months: [
              { month: "Estadísticas Comparativas 2024" },
              { month: "Enero - Diciembre" },
              { month: "Enero - Noviembre" },
              { month: "Enero - Octubre" },
              { month: "Enero - Septiembre" },
              { month: "Enero - Agosto" },
              { month: "Enero - Julio" }
            ]
          },
          {
            year: "2023",
            months: [
              { month: "Marzo" },
              { month: "Febrero" },
              { month: "Enero" }
            ]
          },
          {
            year: "2022",
            months: [
              { month: "Enero - Diciembre" }
            ]
          }
        ]
      },
      {
        title: "DAIS por Provincia",
        years: [
          {
            year: "2019 - 2024",
            months: [
              { month: "DAIS Veraguas" },
              { month: "DAIS Panamá Oeste" },
              { month: "DAIS Panamá" },
              { month: "DAIS Ngäbe Buglé" },
              { month: "DAIS Los Santos" },
              { month: "DAIS Herrera" },
              { month: "DAIS Guna Yala" },
              { month: "DAIS Emberá Wounaán" },
              { month: "DAIS Darién" },
              { month: "DAIS Colón" },
              { month: "DAIS Coclé" },
              { month: "DAIS Chiriquí" },
              { month: "DAIS Bocas del Toro" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "4. Incidentes Comunitarios (Faltas Administrativas)",
    subsections: [
      {
        title: "Informes por Provincia",
        years: [
          {
            year: "2022",
            months: [
              { month: "Incidentes Comunitarios por Provincia enero - noviembre 2022" }
            ]
          },
          {
            year: "2021",
            months: [
              { month: "Incidentes Comunitarios por Provincia 2021" }
            ]
          },
          {
            year: "2017",
            months: [
              { month: "Incidentes Comunitarios San Miguelito 2017" },
              { month: "Incidentes Comunitarios Santiago 2017" },
              { month: "Incidentes Comunitarios Penonomé 2017" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "5. Documentos Legales",
    subsections: [
      {
        title: "Documentos Legales",
        years: [
          {
            year: "Documentos",
            months: [
              { month: "Decreto Ejecutivo No. 471" },
              { month: "Acuerdo Interinstitucional Municipio de Chorrera- Siec" },
              { month: "Resolución 458-R-457" },
              { month: "Manual de codificación del Delito Panamá con fines estadísticos" },
              { month: "Clasificación Internacional de Delitos con fines estadísticos" },
              { month: "Ley 38 que establece la Política Criminológica en la República de Panamá" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "6. Comparativo de Delitos",
    subsections: [
      {
        title: "Comparativos",
        years: [
          {
            year: "2024",
            months: [
              { month: "Comparativo DAIS por 100 mil habitantes 2009 - Marzo 2024" },
              { month: "Consolidado de los 15 títulos del Código Penal por mes y por provincia marzo 2024" }
            ]
          },
          {
            year: "2023",
            months: [
              { month: "Comparativo DAIS por 100 mil habitantes 2009 – 2023" },
              { month: "Resumen Ejecutivo Acumulativo del 1 de enero al 30 de septiembre 2023" },
              { month: "Comparativo DAIS y delitos frecuentes 2019 - Octubre 2023" }
            ]
          },
          {
            year: "2022",
            months: [
              { month: "Comparativo DAIS y delitos frecuentes 2022" },
              { month: "Comparativo 2018 a Septiembre 2022" }
            ]
          },
          {
            year: "2020",
            months: [
              { month: "Consolidado preliminar enero a dic. de 2020" },
              { month: "Comparativo preliminar, agosto 2019 vs. agosto 2020" }
            ]
          },
          {
            year: "2019",
            months: [
              { month: "Comparativo Anual 2018-2019" }
            ]
          },
          {
            year: "2018",
            months: [
              { month: "Comparativo Anual 2017-2018" }
            ]
          },
          {
            year: "2017",
            months: [
              { month: "Comparativo Anual 2016-2017" }
            ]
          },
          {
            year: "2015",
            months: [
              { month: "Comparativo Anual 2015-2016" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "7. Estadísticas Criminales",
    subsections: [
      {
        title: "Estadísticas por Instituciones",
        years: [
          {
            year: "2022-2023",
            months: [
              { month: "Estadísticas criminales por instituciones 2022 - 2023" }
            ]
          },
          {
            year: "2021",
            months: [
              { month: "Estadísticas criminales por instituciones enero 2021" }
            ]
          },
          {
            year: "2020",
            months: [
              { month: "Estadísticas criminales por instituciones diciembre 2020" },
              { month: "Estadísticas criminales por instituciones noviembre 2020" },
              { month: "Estadísticas criminales por instituciones octubre 2020" },
              { month: "Estadísticas criminales por instituciones septiembre 2020" },
              { month: "Estadísticas criminales por instituciones agosto 2020" },
              { month: "Estadísticas criminales por instituciones julio 2020" },
              { month: "Estadísticas criminales por instituciones junio 2020" },
              { month: "Estadísticas criminales por instituciones mayo 2020" },
              { month: "Estadísticas criminales por instituciones abril 2020" },
              { month: "Estadísticas criminales por instituciones marzo 2020" },
              { month: "Estadísticas criminales por instituciones febrero 2020" },
              { month: "Estadísticas criminales por instituciones enero 2020" }
            ]
          },
          {
            year: "2019",
            months: [
              { month: "Estadísticas criminales por instituciones diciembre 2019" },
              { month: "Estadísticas criminales por instituciones noviembre 2019" },
              { month: "Estadísticas criminales por instituciones octubre 2019" },
              { month: "Estadísticas criminales por instituciones septiembre 2019" },
              { month: "Estadísticas criminales por instituciones enero - agosto 2019" }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "8. Encuestas de Victimización",
    subsections: [
      {
        title: "ENVI 2017",
        years: [
          {
            year: "Resultados",
            months: [
              { month: "VI Desempeño institucional ENVI 2017" },
              { month: "V Valoración sobre la seguridad pública ENVI 2017" },
              { month: "IV Características de los delitos y los daños ENVI 2017" },
              { month: "III Denuncia de delitos ENVI 2017" },
              { month: "II Caracterización del agresor ENVI 2017" },
              { month: "I Nivel de victimización ENVI 2017" }
            ]
          }
        ]
      },
      {
        title: "ENVIP",
        years: [
          {
            year: "2017",
            months: [
              { month: "Resultados ENVIP 2017" }
            ]
          },
          {
            year: "2016",
            months: [
              { month: "Manual encuestador ENVIP 2016" },
              { month: "Cuestionario ENVIP 2016" }
            ]
          },
          {
            year: "2015",
            months: [
              { month: "Diseño muestral de la ENVIP 2015" }
            ]
          }
        ]
      }
    ]
  }
]

export default function BibliotecaPage() {
  const [expandedSection, setExpandedSection] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const handleDownload = (section: string, subsection: string, year: string, month: string) => {
    console.log(`Descargando: ${section} - ${subsection} - ${year} - ${month}`)
  }

  // Función para filtrar documentos basada en la búsqueda
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return documentSections

    const query = searchQuery.toLowerCase().trim()
    return documentSections.map(section => {
      const filteredSubsections = section.subsections.map(subsection => {
        const filteredYears = subsection.years.map(year => {
          const filteredMonths = year.months.filter(month => 
            month.month.toLowerCase().includes(query) ||
            year.year.toLowerCase().includes(query) ||
            subsection.title.toLowerCase().includes(query) ||
            section.title.toLowerCase().includes(query)
          )
          return filteredMonths.length > 0 ? { ...year, months: filteredMonths } : null
        }).filter((year): year is NonNullable<typeof year> => year !== null)

        return filteredYears.length > 0 ? { ...subsection, years: filteredYears } : null
      }).filter((subsection): subsection is NonNullable<typeof subsection> => subsection !== null)

      return filteredSubsections.length > 0 ? { ...section, subsections: filteredSubsections } : null
    }).filter((section): section is NonNullable<typeof section> => section !== null)
  }, [searchQuery])

  // Función para manejar la expansión de secciones durante la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const newExpandedSections = new Set<string>()
      filteredSections.forEach((section, sectionIndex) => {
        section.subsections.forEach((_, subsectionIndex) => {
          newExpandedSections.add(`${sectionIndex}-${subsectionIndex}`)
        })
      })
      setExpandedSections(newExpandedSections)
    } else {
      setExpandedSections(new Set())
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col gap-6 mb-8">
            <h1 className="text-3xl font-bold">Biblioteca de Documentos</h1>
            
            {/* Barra de búsqueda */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar documentos..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-10 h-12 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearch("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-muted-foreground mt-2"
                >
                  {filteredSections.reduce((acc, section) => 
                    acc + section.subsections.reduce((subAcc, subsection) => 
                      subAcc + subsection.years.reduce((yearAcc, year) => 
                        yearAcc + year.months.length, 0), 0), 0
                  )} resultados encontrados
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filteredSections.length > 0 ? (
                filteredSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <span className="text-sm text-muted-foreground font-normal ml-2">
                                    presiona cada categoria para ver los documentos segmentados por año.
                        </span>
                      </CardHeader>
                      <CardContent className="p-6">
                        <Accordion
                          type="multiple"
                          value={Array.from(expandedSections)}
                          onValueChange={(value) => setExpandedSections(new Set(value))}
                          className="w-full"
                        >
                          {section.subsections.map((subsection, subsectionIndex) => 
                            subsection ? (
                            <AccordionItem
                              key={subsectionIndex}
                              value={`${sectionIndex}-${subsectionIndex}`}
                              className="border-b last:border-0"
                            >
                              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                <div className="flex items-center justify-between w-full">
                                  <span>{subsection.title}</span>
                                  
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4 mt-4">
                                  {subsection.years.map((year, yearIndex) => 
                                    year ? (
                                    <div key={yearIndex} className="space-y-2">
                                      <h4 className="font-medium text-lg text-primary">{year.year}</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {year.months.map((month, monthIndex) => (
                                          <Button
                                            key={monthIndex}
                                            variant="outline"
                                            className="justify-start text-left h-auto py-2 px-4 hover:bg-primary/5"
                                            onClick={() => handleDownload(section.title, subsection.title, year.year, month.month)}
                                          >
                                            <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <span className="truncate">{month.month}</span>
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                    ) : null
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                            ) : null
                          )}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-lg text-muted-foreground">No se encontraron resultados para tu búsqueda.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
} 