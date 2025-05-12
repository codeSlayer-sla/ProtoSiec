"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Database, FileDown, Users } from "lucide-react"
import SearchBar from "@/components/search-bar"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

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
            Portal Nacional de Datos Abiertos
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Descubre los datos de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Panamá</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mb-10 text-xl text-slate-600 dark:text-slate-300">
            Accede a información pública, transparente y actualizada para impulsar la innovación y el desarrollo del
            país.
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
            <Button size="lg" variant="outline" className="gap-2 rounded-full">
              <FileDown className="h-5 w-5" />
              Descargar API
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-4xl grid-cols-1 gap-8 rounded-2xl border bg-white/80 p-8 backdrop-blur-sm sm:grid-cols-3 dark:bg-slate-800/80 dark:border-slate-700"
        >
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">1,240+</span>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Conjuntos de datos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">32</span>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Instituciones</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">15K+</span>
              <Users className="ml-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Usuarios activos</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
