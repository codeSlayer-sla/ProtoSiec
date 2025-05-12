"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Globe, Award } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <Tabs defaultValue="mission" className="h-full w-full">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre el SIEC</h2>
              <p className="text-muted-foreground md:text-xl">
                Conoce más sobre nuestra misión, visión y el equipo detrás del Portal de Datos Abiertos del SIEC.
              </p>
              <TabsList className="grid w-full grid-cols-3 gap-4">
                <TabsTrigger value="mission">Misión</TabsTrigger>
                <TabsTrigger value="vision">Visión</TabsTrigger>
                <TabsTrigger value="team">Equipo</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="mission" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Misión del SIEC</CardTitle>
                  {/* Cambiado de CardDescription a div para evitar el elemento p anidado */}
                  <div className="text-base text-muted-foreground">Sistema Integrado de Estadísticas Criminales</div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      Desarrollar programas, proyectos, y actividades destinados al procesamiento de las estadísticas
                      criminales con fines de investigación, observación, análisis situacional, y formulación de
                      políticas públicas, para la toma de decisiones a nivel estratégico, en la lucha por la disminución
                      de los índices de criminalidad en nuestra sociedad
                    </p>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="font-medium">Educación y capacitación en el uso de datos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="font-medium">Accesibilidad universal a la información</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span className="font-medium">Excelencia en la calidad de los datos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="vision" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Visión del SIEC</CardTitle>
                  {/* Cambiado de CardDescription a div para evitar el elemento p anidado */}
                  <div className="text-base text-muted-foreground">Sistema Integrado de Estadísticas Criminales</div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      Contribuir a la generación, desarrollo y aplicación del conocimiento científico y tecnológico, que
                      permita reducir los índices delictivos y mejorar la convivencia ciudadana, para la prevención y
                      control de la criminalidad, con orientación hacia la excelencia en el ámbito nacional e
                      internacional
                    </p>
                    <div className="mt-4 rounded-lg bg-muted p-4">
                      <h4 className="mb-2 font-semibold">Objetivos a largo plazo</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>100% de las instituciones públicas compartiendo datos abiertos</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Ecosistema de innovación basado en datos abiertos</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                          <span>Formación ciudadana en análisis y uso de datos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="team" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Nuestro Equipo</CardTitle>
                  {/* Cambiado de CardDescription a div para evitar el elemento p anidado */}
                  <div className="text-base text-muted-foreground">
                    Profesionales comprometidos con la transparencia y la innovación
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Foto de perfil"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">María Rodríguez</h4>
                      <p className="text-sm text-muted-foreground">Directora de Datos Abiertos</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Foto de perfil"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">Carlos Gómez</h4>
                      <p className="text-sm text-muted-foreground">Jefe de Desarrollo Tecnológico</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Foto de perfil"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">Ana Martínez</h4>
                      <p className="text-sm text-muted-foreground">Especialista en Datos</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 text-center">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Foto de perfil"
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-semibold">Luis Pérez</h4>
                      <p className="text-sm text-muted-foreground">Coordinador de Alianzas</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" className="gap-1">
                      <Users className="h-4 w-4" />
                      Ver equipo completo
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative hidden aspect-square overflow-hidden rounded-xl lg:block"
          >
            <Image src="/placeholder.svg?height=600&width=600" alt="Equipo de trabajo" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-2xl font-bold">Comprometidos con Panamá</h3>
              <p className="mt-2 max-w-md text-white/90">
                Nuestro equipo trabaja incansablemente para hacer que los datos públicos sean accesibles para todos los
                panameños.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
