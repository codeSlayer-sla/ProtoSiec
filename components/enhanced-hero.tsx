"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Database, Newspaper, FileDown, Users } from "lucide-react"
import SearchBar from "@/components/search-bar"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import HeroAnimation from "@/components/hero-animation"
import MiniCarousel from "@/components/mini-carousel"

export default function EnhancedHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    toast({
      title: "Búsqueda iniciada",
      description: `Buscando: "${query}"`,
    })
    router.push(`/datasets?search=${encodeURIComponent(query)}`)
  }

  const handleRequestData = () => {
    // Open the Excel file in the same window
    window.location.href = '/excel/FORMULARIO-DE-SOLICITUD-DE-ESTADISTICA-SIEC.xlsx'
    
    // Show instructions toast
    toast({
      title: "Pasos para solicitar estadísticas",
      description: (
        <div className="mt-2 space-y-2">
          <p>1. Descargue y complete el formulario Excel</p>
          <p>2. Envíe el formulario completado a: <a href="mailto:solicitud@siec.gob.pa" className="text-blue-600 hover:underline">solicitud@siec.gob.pa</a></p>
          <p>3. Espere la confirmación de recepción</p>
          <p>4. Recibirá los datos solicitados en un plazo máximo de 10 días hábiles</p>
        </div>
      ),
      duration: 10000, // Show for 10 seconds
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
      {/* Fondo animado de partículas */}
      <HeroAnimation />
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-4 -top-24 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-900/10"></div>
        <div className="absolute -right-4 top-32 h-[400px] w-[400px] rounded-full bg-purple-100/30 blur-3xl dark:bg-purple-900/10"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Ministerio de Seguridad Pública

          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Sistema Nacional Integrado de {" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Estadísticas Criminales</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mb-10 text-xl text-slate-600 dark:text-slate-300">
          Con el fin de conocer la situación objetiva de la delincuencia en la República de Panamá, en el año 2007 se crea la Dirección del Sistema Nacional Integrado de Estadística Criminal DNSIEC, que sustituye en sus funciones a la CONADEC.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12">
            <SearchBar
              placeholder="Busca conjuntos de datos, categorías o temas..."
              className="mx-auto max-w-2xl"
              onSearch={handleSearch}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2 rounded-full">
              <Database className="h-5 w-5" />
              Explorar datos
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              className="gap-2 rounded-full"
              onClick={handleRequestData}
            >
              <Newspaper className="h-5 w-5" />
              Solicitar datos
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <MiniCarousel />
        </motion.div>

        
      </div>
    </section>
  )
}
