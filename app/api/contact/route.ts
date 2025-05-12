import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Configuración del runtime para usar Node.js en lugar de Edge
export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, department } = body

    // Validar los datos recibidos
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Configurar el transporte de correo con Gmail
    // Utilizamos una configuración más robusta con manejo de errores mejorado
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER || "solcucionesopctest@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "lzqc xiys ggdq swyy",
      },
      tls: {
        // No rechazar conexiones no autorizadas (útil para desarrollo)
        rejectUnauthorized: false,
      },
      // Aumentar el tiempo de espera para la conexión
      connectionTimeout: 10000, // 10 segundos
      // Aumentar el tiempo de espera para los comandos
      greetingTimeout: 10000, // 10 segundos
      socketTimeout: 15000, // 15 segundos
    })

    // Configurar el correo
    const mailOptions = {
      from: `"Portal de Datos Abiertos SIEC" <${process.env.EMAIL_USER || "solcucionesopctest@gmail.com"}>`,
      to: process.env.EMAIL_RECIPIENT || "solcucionesopctest@gmail.com",
      replyTo: email,
      subject: `Formulario de contacto SIEC: ${subject || "Sin asunto"}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        ${department ? `Departamento: ${department}` : ""}
        Mensaje: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #3b82f6; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Nuevo mensaje de contacto - SIEC</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${department ? `<p><strong>Departamento:</strong> ${department}</p>` : ""}
          ${subject ? `<p><strong>Asunto:</strong> ${subject}</p>` : ""}
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 5px;">
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Este mensaje fue enviado desde el formulario de contacto del Portal de Datos Abiertos del SIEC.</p>
        </div>
      `,
    }

    try {
      // Verificar la conexión antes de enviar
      await new Promise((resolve, reject) => {
        // Verificar la conexión al servidor SMTP
        transporter.verify((error, success) => {
          if (error) {
            console.error("Error al verificar la conexión SMTP:", error)
            reject(error)
          } else {
            console.log("Servidor listo para recibir mensajes")
            resolve(success)
          }
        })
      })

      // Enviar el correo
      const info = await transporter.sendMail(mailOptions)
      console.log("Mensaje enviado:", info.messageId)

      return NextResponse.json({
        success: true,
        message: "Mensaje enviado correctamente",
        id: info.messageId,
      })
    } catch (error) {
      console.error("Error al enviar el correo:", error)

      // Proporcionar información más detallada sobre el error
      let errorMessage = "Error al enviar el correo"
      let errorDetails = "Error desconocido"

      if (error instanceof Error) {
        errorMessage = error.message

        // Verificar si es un error de DNS
        if (errorMessage.includes("getaddrinfo") || errorMessage.includes("dns.lookup")) {
          errorDetails =
            "Problema de conexión con el servidor de correo. Verifique su conexión a internet o contacte al administrador."
        } else if (errorMessage.includes("authentication failed")) {
          errorDetails = "Error de autenticación con el servidor de correo. Verifique las credenciales."
        } else if (errorMessage.includes("timeout")) {
          errorDetails = "Tiempo de espera agotado al conectar con el servidor de correo."
        }
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorDetails,
          userMessage:
            "No pudimos enviar tu mensaje en este momento. Por favor, intenta más tarde o contacta directamente por teléfono.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error)
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        details: error instanceof Error ? error.message : "Error desconocido",
        userMessage: "Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.",
      },
      { status: 500 },
    )
  }
}
