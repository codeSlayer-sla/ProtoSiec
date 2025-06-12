"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    secciones: [
      { label: "Inicio", href: "/" },
      { label: "Datos", href: "/datos" },
      { label: "Publicaciones", href: "/publicaciones" },
      { label: "Biblioteca SIEC", href: "/biblioteca" },
    ],
    recursos: [
      { label: "Documentos Legales", href: "/biblioteca#legales" },
      { label: "Estadísticas", href: "/datos" },
      { label: "Informes", href: "/biblioteca#informes" },
      { label: "Contacto", href: "#contacto" },
    ],
    
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ]

  return (
    <footer className="bg-white/80 dark:bg-black/20 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y Descripción */}
          <div className="space-y-4">
            <div className="h-20 w-[280px]">
              <img
                src="/logo.png"
                alt="Gobierno Nacional con Paso Firme - Ministerio de Seguridad Pública"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sistema Integrado de Estadísticas Criminales (SIEC) - Ministerio de Seguridad Pública
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Secciones</h3>
            <ul className="space-y-2">
              {footerLinks.secciones.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto y Enlaces Externos */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  Panama
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  (507) 2222-2222
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  info@siec.gob.pa
                </li>
              </ul>
            </div>

            
          </div>
        </div>

        {/* Redes Sociales y Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Sistema Integrado de Estadísticas Criminales. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 