"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Send, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Limpiar el estado de error después de 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validación básica
    if (!name.trim()) {
      setError("Por favor, ingresa tu nombre")
      return
    }

    if (!email.trim()) {
      setError("Por favor, ingresa tu correo electrónico")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido")
      return
    }

    if (!message.trim()) {
      setError("Por favor, ingresa un mensaje")
      return
    }

    setIsSubmitting(true)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 segundos de timeout

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setName("")
        setEmail("")
        setMessage("")
        toast({
          title: "Mensaje enviado",
          description: "Gracias por contactarnos. Te responderemos a la brevedad.",
        })
      } else {
        throw new Error(data.userMessage || data.error || "Error al enviar el mensaje")
      }
    } catch (error) {
      let errorMessage = "Ocurrió un error al enviar el mensaje."

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "La solicitud tardó demasiado tiempo. Por favor, intenta nuevamente."
        } else {
          errorMessage = error.message
        }
      }

      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
          <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Contáctanos</CardTitle>
          <CardDescription>
            Envíanos tus preguntas, comentarios o sugerencias y te responderemos a la brevedad.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Nombre
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500"
                disabled={isSubmitting || isSuccess}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500"
                disabled={isSubmitting || isSuccess}
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Mensaje
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí"
                className="min-h-[120px] border-blue-200 dark:border-blue-900/50 focus-visible:ring-blue-500"
                disabled={isSubmitting || isSuccess}
                required
                aria-required="true"
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                disabled={isSubmitting || isSuccess}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : isSuccess ? (
                  "Mensaje enviado"
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            También puedes contactarnos directamente a{" "}
            <a href="mailto:info@siec.gob.pa" className="text-blue-600 hover:underline">
              info@siec.gob.pa
            </a>{" "}
            o llamando al{" "}
            <a href="tel:+5073000000" className="text-blue-600 hover:underline">
              +507 300-0000
            </a>
          </div>
        </CardFooter>
      </Card>

      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
        >
          <p className="font-medium">¡Gracias por tu mensaje!</p>
          <p className="text-sm mt-1">Te responderemos a la brevedad posible.</p>
        </motion.div>
      )}
    </div>
  )
}
