import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { generateSampleData } from "./data-generator"

export async function generatePDF(title = "Dataset"): Promise<Blob> {
  // Crear un nuevo documento PDF
  const doc = new jsPDF()

  // Añadir título
  doc.setFontSize(22)
  doc.text(title, 105, 20, { align: "center" })

  // Añadir fecha
  doc.setFontSize(10)
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" })

  // Generar datos de muestra
  const data = generateSampleData(title, 10)

  // Obtener encabezados y filas para la tabla
  const headers = Object.keys(data[0])
  const rows = data.map((item) => Object.values(item))

  // Añadir tabla
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 40,
    styles: { overflow: "linebreak" },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  // Añadir pie de página
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(
      `Página ${i} de ${pageCount} - Portal de Datos Abiertos de Panamá`,
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" },
    )
  }

  // Generar blob
  return doc.output("blob")
}
