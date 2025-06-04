import Link from "next/link"
import EnhancedHero from "@/components/enhanced-hero"
import StatsDashboard from "@/components/stats-dashboard"
import DeviceInfo from "@/components/device-info"
import InteractivePanamaMap from "@/components/interactive-panama-map"
import Chatbot from "@/components/chatbot"
import ContactForm from "@/components/contact-form"
import ApiDocumentation from "@/components/api-documentation"
import DataFormats from "@/components/data-formats"
import { Toaster } from "@/components/ui/toaster"
import DatasetsGrid from "@/components/datasets-grid"
import FeatureHighlights from "@/components/feature-highlights"
import AboutSection from "@/components/about-section"
import Navbar from "@/components/navbar"
import GridPanamaMap from "@/components/grid-panama-map"
import AdvancedVisualizations from "@/components/advanced-visualizations"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section id="hero" className="relative overflow-hidden">
          <DeviceInfo />
          <EnhancedHero />
        </section>

        <section id="about" className="py-16 md:py-24">
          <div className="container">
            
            <AboutSection />
          </div>
        </section>

        <section
          id="datasets"
          className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20"
        >
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Catálogo de Datos Abiertos
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Accede a nuestra colección completa de datos sobre seguridad pública, estadísticas criminales y más.
              Disponibles en múltiples formatos para su análisis e integración.
            </p>
            <DatasetsGrid />
          </div>
        </section>

        <section id="map" className="py-16 md:py-24">
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mapa Interactivo de Panamá
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Explore las estadísticas de seguridad por provincia. Pase el cursor sobre cada región para ver datos
              detallados sobre incidentes, tendencias y más.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Mapa por Provincias</h3>
                <InteractivePanamaMap />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Mapa por Cuadrantes</h3>
                <GridPanamaMap />
              </div>
            </div>
          </div>
        </section>

        <section
          id="statistics"
          className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20"
        >
          <div className="container">
            <StatsDashboard />
          </div>
        </section>

        <section id="visualizations" className="py-16 md:py-24">
          <div className="container">
            <AdvancedVisualizations />
          </div>
        </section>

        <section
          id="downloads"
          className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20"
        >
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Formatos y Descargas
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Descarga nuestros datos en múltiples formatos para facilitar su análisis e integración en tus proyectos.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Formatos Disponibles</h3>
                <DataFormats />
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">API para Desarrolladores</h3>
                <ApiDocumentation />
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-16 md:py-24">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="border-t py-12 md:py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SIEC Datos Abiertos
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Portal oficial de datos abiertos del Sistema Integrado de Estadísticas Criminales de Panamá.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium text-blue-700 dark:text-blue-300">Enlaces rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#datasets" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Conjuntos de Datos
                  </Link>
                </li>
                <li>
                  <Link href="#map" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Mapa Interactivo
                  </Link>
                </li>
                <li>
                  <Link href="#statistics" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Estadísticas
                  </Link>
                </li>
                <li>
                  <Link href="#contacto" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium text-blue-700 dark:text-blue-300">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Documentación API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Guías y Tutoriales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Glosario
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Metodología
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium text-blue-700 dark:text-blue-300">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Términos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Licencia de Datos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Atribuciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                    Accesibilidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Ministerio de Seguridad Pública de Panamá. Todos los derechos reservados.
            </p>
            <p className="text-center text-sm text-muted-foreground md:text-right">
              Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot component */}
      <Chatbot />
      <Toaster />
    </div>
  )
}
