import { Metadata } from "next"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import DeviceInfo from "@/components/device-info"
import EnhancedHero from "@/components/enhanced-hero"
import AboutSection from "@/components/about-section"
import ContactForm from "@/components/contact-form"
import { Toaster } from "@/components/ui/sonner"
import AboutDetail from "@/components/aboutdetail"
import { CarouselSection } from "@/components/carousel-section"

export const metadata: Metadata = {
  title: "SIEC Datos Abiertos | Portal Oficial",
  description: "Portal oficial de datos abiertos del Sistema Integrado de Estadísticas Criminales de Panamá.",
}

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

        <section id="aboutdetail" className="py-16 md:py-24">
          <div className="container">
            <AboutDetail />
            <CarouselSection />
          </div>
        </section>

        <section id="contacto" className="py-16 md:py-24">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>
      <Toaster />
    </div>
  )
}


