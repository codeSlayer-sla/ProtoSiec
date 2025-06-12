"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Globe, Award, X, Info, Handshake, Settings, ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function AboutDetail() {
  const [modalOpen, setModalOpen] = useState<null | "servicios" | "colaboradores" | "subunidad" | "equipo" | "organigrama">(null)

  return (
    <section id="about" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[500px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative hidden aspect-square overflow-hidden rounded-xl lg:block cursor-pointer"
          >
            <Image src="/edificio.jpg" alt="Equipo de trabajo" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
          </motion.div>
          <Tabs defaultValue="servicios" className="h-full w-full">
            <div className="flex flex-col items-start space-y-4">
              <TabsList className="grid w-full grid-cols-3 gap-4">
                <TabsTrigger value="servicios">Servicios</TabsTrigger>
                <TabsTrigger value="colaboradores">Colaboradores</TabsTrigger>
                <TabsTrigger value="subunidad">Sub Unidad Técnica</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="servicios" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Info className="h-6 w-6" /> Nuestros Servicios
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="list-disc pl-6 space-y-3 text-base text-slate-700 dark:text-slate-200">
                    <li><b>Coordinación:</b> con las instituciones que forman parte del Sistema Integrado de Estadísticas Criminales, el diseño, las normas de análisis, y la estandarización de todos los datos e información estadísticos necesarios para la toma de decisiones en el proceso de combate de la criminalidad.</li>
                    <li><b>Informes:</b> Elaboración y publicación de informes estadísticos, dándole seguimiento a las condiciones de la delincuencia por medio de múltiples variables de las ciencias sociales.</li>
                    <li><b>Capacitación y asesoramiento:</b> Realizamos actividades de capacitación y asesoramiento como parte de nuestras funciones, en temas estadísticos, criminológicos, sociológicos, entre otros, tanto a los estamentos e instituciones gubernamentales, como también cualquier otra entidad que maneje y produzca información criminal.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colaboradores" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Handshake className="h-6 w-6" /> Colaboradores Estratégicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-base text-slate-700 dark:text-slate-200 space-y-4">
                    <p>Colaboramos con instituciones nacionales e internacionales para fortalecer la calidad y el alcance de los datos estadísticos criminales.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-items-center py-2">
                      {[...Array(10)].map((_, idx) => (
                        <img
                          key={idx}
                          src={`/colab${idx + 1}.png`}
                          alt={`Colaborador ${idx + 1}`}
                          className="h-20 w-auto object-contain rounded shadow bg-white p-2"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subunidad" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Settings className="h-6 w-6" /> Sub Unidad Técnica
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <SubUnidadTecnicaStepper />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* Modal para imagen y popups */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in"
            onClick={e => {
              if (e.target === e.currentTarget) setModalOpen(null)
            }}
          >
            <div
              className={
                modalOpen === "subunidad"
                  ? "relative bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-blue-900 rounded-2xl shadow-2xl max-w-xl w-full mx-4 p-8 border border-blue-200 dark:border-blue-800 animate-modal-pop"
                  : modalOpen === "organigrama"
                  ? "relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 p-8 flex flex-col items-center animate-modal-pop"
                  : "relative bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-900 dark:via-blue-950 dark:to-blue-900 rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 border border-blue-200 dark:border-blue-800 animate-modal-pop"
              }
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 bg-white/80 dark:bg-slate-800/80 rounded-full p-1 shadow transition-colors z-10"
                onClick={() => setModalOpen(null)}
                aria-label="Cerrar"
              >
                <X className="h-7 w-7" />
              </button>
              {/* Modal Organigrama con zoom */}
              {modalOpen === "organigrama" && (
                <OrganigramaZoomModal />
              )}
              
              {modalOpen === "servicios" && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700"><Info className="h-6 w-6" /> Nuestros Servicios</h3>
                  <ul className="list-disc pl-6 space-y-3 text-base text-slate-700 dark:text-slate-200">
                    <li><b>Coordinación:</b> con las instituciones que forman parte del Sistema Integrado de Estadísticas Criminales, el diseño, las normas de análisis, y la estandarización de todos los datos e información estadísticos necesarios para la toma de decisiones en el proceso de combate de la criminalidad.</li>
                    <li><b>Informes:</b> Elaboración y publicación de informes estadísticos, dándole seguimiento a las condiciones de la delincuencia por medio de múltiples variables de las ciencias sociales.</li>
                    <li><b>Capacitación y asesoramiento:</b> Realizamos actividades de capacitación y asesoramiento como parte de nuestras funciones, en temas estadísticos, criminológicos, sociológicos, entre otros, tanto a los estamentos e instituciones gubernamentales, como también cualquier otra entidad que maneje y produzca información criminal.</li>
                  </ul>
                </div>
              )}
              {modalOpen === "colaboradores" && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-700"><Handshake className="h-6 w-6" /> Colaboradores Estratégicos</h3>
                  <div className="text-base text-slate-700 dark:text-slate-200 space-y-2 mb-4">
                    <p>Colaboramos con instituciones nacionales e internacionales para fortalecer la calidad y el alcance de los datos estadísticos criminales.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-items-center py-2">
                    {[...Array(10)].map((_, idx) => (
                      <img
                        key={idx}
                        src={`/colab${idx + 1}.png`}
                        alt={`Colaborador ${idx + 1}`}
                        className="h-20 w-auto object-contain rounded shadow bg-white p-2"
                      />
                    ))}
                  </div>
                </div>
              )}
              {modalOpen === "subunidad" && (
                <SubUnidadTecnicaStepper />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
    
  )
}

function OrganigramaZoomModal() {
  const [zoom, setZoom] = useState(1)
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [start, setStart] = useState({ x: 0, y: 0 })
  const [last, setLast] = useState({ x: 0, y: 0 })

  function onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault()
    setDragging(true)
    setStart({ x: e.clientX, y: e.clientY })
  }
  function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!dragging) return
    setDrag({
      x: last.x + (e.clientX - start.x),
      y: last.y + (e.clientY - start.y),
    })
  }
  function onMouseUp() {
    setDragging(false)
    setLast(drag)
  }
  function onMouseLeave() {
    setDragging(false)
    setLast(drag)
  }
  function resetPan() {
    setDrag({ x: 0, y: 0 })
    setLast({ x: 0, y: 0 })
  }

  return (
    <div className="flex flex-col items-center w-full select-none">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => { setZoom(z => Math.max(0.5, z - 0.2)); resetPan() }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow transition-all"
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          onClick={() => { setZoom(z => Math.min(3, z + 0.2)); resetPan() }}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow transition-all"
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
      </div>
      <div
        className="overflow-auto max-h-[70vh] w-full flex justify-center items-center cursor-grab"
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <img
          src="/equipo.png"
          alt="Organigrama SIEC"
          draggable={false}
          style={{
            transform: `scale(${zoom}) translate(${drag.x / zoom}px, ${drag.y / zoom}px)`,
            transition: dragging ? 'none' : 'transform 0.3s',
            maxWidth: '100%',
            maxHeight: '60vh',
            userSelect: 'none',
            pointerEvents: 'auto',
          }}
          className="rounded-lg shadow-lg select-none"
        />
      </div>
    </div>
  )
}

function SubUnidadTecnicaStepper() {
  const [step, setStep] = useState(0)
  const steps = [
    {
      title: "Orígenes",
      content: (
        <div>
          <p className="text-base text-slate-700 dark:text-slate-200">
            Panamá se incorporó al Sistema Regional de Indicadores Estandarizados de Convivencia y Seguridad Ciudadana (SES) en noviembre del 2012. La coordinación de la SUT en Panamá es ejercida por el Ministerio de Seguridad, a través del Sistema Integrado de Estadísticas Criminales (SIEC). Por lo que es el garante de coordinar el flujo de información procedente de las instituciones miembros del Sistema Regional de Indicadores Estandarizados de Seguridad y Convivencia Ciudadana de América Latina, al igual que es el responsable de organizar la dinámica de coordinación interinstitucional por medio del sistema de mesas temáticas de acuerdo a la prioridad y requerimiento de la información sobre criminalidad, seguridad y convivencia ciudadana.
          </p>
        </div>
      ),
    },
    {
      title: "Funciones",
      content: (
        <ul className="list-disc pl-6 space-y-2 text-base text-slate-700 dark:text-slate-200">
          <li>Concertar y establecer, los contenidos y la dinámica de información remitida al Sistema Nacional Integrado de Estadísticas Criminales (SIEC), de acuerdo a los requerimientos de la evolución de la situación de criminalidad, violencia y convivencia ciudadana en el país; en concordancia con los compromisos internacionales (Acuerdos, Convenios y Tratados, referentes a la materia antes detallada).</li>
          <li>Avalar la calidad de los datos mediante el mecanismo de validación de la información generada entre las Instituciones como parte de la estrategia de país.</li>
          <li>Desarrollar los planes de cooperación interinstitucional para el fortalecimiento de capacidades en función del diagnóstico de los sistemas de cada Institución.</li>
          <li>Garantizar el suministro de la información institucional oportuna que permita medir, supervisar y analizar los riesgos poblacionales, la situación de criminalidad, violencia y convivencia ciudadana.</li>
        </ul>
      ),
    },
    {
      title: "Entidades Miembro",
      content: (
        <ul className="list-disc pl-6 columns-2 gap-8 text-sm md:text-base text-slate-700 dark:text-slate-200">
          <li>Policía Nacional – Dirección Nacional de Operaciones</li>
          <li>Dirección de Investigación Judicial</li>
          <li>Servicio Nacional de Fronteras</li>
          <li>Servicio Nacional Aeronaval</li>
          <li>Ministerio Público</li>
          <li>Órgano Judicial</li>
          <li>Ministerio de Salud</li>
          <li>Instituto de Medicina Legal y Ciencias Forenses de Panamá</li>
          <li>Hospital Santo Tomás</li>
          <li>Instituto Nacional de Estadística y Censo</li>
          <li>Ministerio de Relaciones Exteriores</li>
          <li>Ministerio de Educación</li>
          <li>Servicio Nacional de Migración</li>
          <li>Municipio de Panamá</li>
          <li>Municipio de La Chorrera</li>
          <li>Municipio de San Miguelito</li>
          <li>Municipio de Arraiján</li>
          <li>Municipio de David</li>
          <li>Municipio de Colón</li>
          <li>Dirección General del Sistema Penitenciario</li>
          <li>Sistema Penitenciario</li>
          <li>Caja de Seguro Social</li>
          <li>Autoridad del Tránsito y Transporte Terrestre</li>
          <li>Instituto de Estudios Interdisciplinarios</li>
          <li>Hospital San Miguel Arcángel</li>
          <li>Autoridad Nacional de Aduanas</li>
          <li>Autoridad de Recursos Acuáticos de Panamá</li>
        </ul>
      ),
    },
    {
      title: "Documentos de Interés",
      content: (
        <ul className="space-y-3">
          <li>
            <a
              href="/pdf/tecnica1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline hover:text-blue-900 font-medium"
            >
              <span>📄</span>
              Informe Analítico de la Sub Unidad Técnica (2014)
            </a>
          </li>
          <li>
            <a
              href="/pdf/tecnica2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline hover:text-blue-900 font-medium"
            >
              <span>📄</span>
              Resolución No. 458-R-457 que crea la Sub Unidad Técnica del Sistema de Indicadores de Seguridad y Convivencia Ciudadana
            </a>
          </li>
          <li>
            <a
              href="/pdf/tecnica3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline hover:text-blue-900 font-medium"
            >
              <span>📄</span>
              Acuerdo Interinstitucional Municipio de Chorrera – SIEC
            </a>
          </li>
        </ul>
      ),
    },
  ]

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-2xl font-bold mb-4 text-green-700">{steps[step].title}</h3>
      <div className="text-base text-slate-700 dark:text-slate-200 space-y-4 w-full mb-6">
        {steps[step].content}
      </div>
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Anterior
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        {steps.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block h-2 w-2 rounded-full ${idx === step ? "bg-green-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}
