"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "El Portal de Datos Abiertos de SIEC ha transformado nuestra forma de investigar patrones de criminalidad. Los datos son completos, actualizados y fáciles de acceder.",
      author: "Dra. María Rodríguez",
      role: "Investigadora, Universidad de Panamá",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "Como periodista de datos, valoro enormemente la transparencia y facilidad de uso de esta plataforma. Me permite crear visualizaciones impactantes para mis reportajes sobre seguridad pública.",
      author: "Carlos Mendoza",
      role: "Periodista de Datos, La Prensa",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "La API del portal nos ha permitido integrar datos de criminalidad en tiempo real en nuestra aplicación de seguridad ciudadana, mejorando significativamente nuestro servicio.",
      author: "Ing. Patricia Gómez",
      role: "CTO, SafeCity Panamá",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative overflow-hidden bg-muted py-16">
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">Lo que dicen nuestros usuarios</h2>
          <p className="mx-auto mb-12 max-w-[700px] text-muted-foreground">
            Descubre cómo investigadores, periodistas y desarrolladores utilizan nuestros datos para impulsar sus
            proyectos.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <Card className="border-primary/10 bg-background/80 backdrop-blur">
            <CardContent className="p-8">
              <Quote className="mb-4 h-12 w-12 text-primary/20" />
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-xl font-medium italic">{testimonials[activeIndex].quote}</p>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                      alt={testimonials[activeIndex].author}
                    />
                    <AvatarFallback>
                      {testimonials[activeIndex].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={() => setActiveIndex(index)}
                className={`h-3 w-3 rounded-full p-0 ${activeIndex === index ? "bg-primary" : "bg-primary/20"}`}
              />
            ))}
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-primary/5"></div>
        <div className="absolute -bottom-40 -right-20 h-[600px] w-[600px] rounded-full bg-primary/5"></div>
      </div>
    </div>
  )
}
