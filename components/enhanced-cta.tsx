"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function EnhancedCTA() {
  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="opacity-10"
        >
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M 0 0 L 0 8 L 8 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Mantente al día con nuestros datos
            </h2>
            <p className="mx-auto mb-8 max-w-[700px] text-lg opacity-90">
              Suscríbete para recibir notificaciones sobre nuevos conjuntos de datos, actualizaciones y mejoras en
              nuestra plataforma.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mb-8 flex max-w-md flex-col gap-4 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-foreground/50" />
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="h-12 border-primary-foreground/20 bg-primary-foreground/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:border-primary-foreground/30 focus-visible:ring-primary-foreground/20"
              />
            </div>
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Suscribirse
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary-foreground/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-sm">Actualizaciones semanales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary-foreground/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <span className="text-sm">Notificaciones personalizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary-foreground/20 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-sm">Comunidad de usuarios</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
