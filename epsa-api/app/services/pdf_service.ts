import PDFDocument from 'pdfkit'
import Accident from '#models/accident'

const COL_WIDTHS = [130, 70, 55, 100, 110, 180, 100, 80]
const COL_X =     [50,  180, 250, 305, 405, 515, 695, 795]
const HEADERS =   ['Employé', 'Date', 'Heure', 'Type', 'Lieu', 'Description', 'Témoin', 'Statut']

//Make Header 
function drawHeader(doc: PDFKit.PDFDocument) {
  doc.fontSize(18).fillColor('#1a2f5a').text('EPSA Group', 50, 50)
  doc.fontSize(11).fillColor('#666666').text('Rapport — Accidents du travail', 50, 75)
  doc.fontSize(9).fillColor('#999999').text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 50, 92)
  doc.moveTo(50, 110).lineTo(790, 110).strokeColor('#1a2f5a').lineWidth(1).stroke()
}

//Make Table header 
function drawTableHeaders(doc: PDFKit.PDFDocument, y: number) {
  doc.rect(50, y, 742, 20).fill('#1a2f5a')
  doc.fontSize(8).fillColor('#ffffff')
  HEADERS.forEach((header, i) => {
    doc.text(header, COL_X[i], y + 6, { width: COL_WIDTHS[i], align: 'left' })
  })
}

//Make a document row 
function drawRow(doc: PDFKit.PDFDocument, accident: Accident, y: number, index: number) {
  const bg = index % 2 === 0 ? '#f7f8fa' : '#ffffff'
  doc.rect(50, y - 4, 742, 18).fill(bg)

  const desc = accident.description
  const row = [
    `${accident.employee.firstName} ${accident.employee.lastName}`,
    accident.accidentDate.toFormat('dd/MM/yyyy'),
    accident.accidentTime,
    accident.type,
    accident.location,
    desc.length > 45 ? desc.substring(0, 45) + '…' : desc,
    accident.witness ?? '—',
    accident.status,
  ]

  row.forEach((cell, i) => {
    doc.fontSize(7.5).fillColor('#333333').text(cell, COL_X[i], y, { width: COL_WIDTHS[i] })
  })
}

//Make document footer 
function drawFooter(doc: PDFKit.PDFDocument, y: number) {
  doc.moveTo(50, y + 10).lineTo(790, y + 10).strokeColor('#dddddd').lineWidth(0.5).stroke()
  doc.fontSize(8).fillColor('#999999').text('EPSA Group — Document confidentiel', 50, y + 18)
}

//PDF generating 
export async function generatePdf(): Promise<Buffer> {
  const accidents = await Accident.query()
    .preload('employee')
    .orderBy('created_at', 'desc')

  const doc = new PDFDocument({ margin: 50, size: 'A4', layout: 'landscape' })
  const chunks: Buffer[] = []
  doc.on('data', (chunk) => chunks.push(chunk))

  drawHeader(doc)
  drawTableHeaders(doc, 125)

  let y = 150
  accidents.forEach((accident, index) => {
    if (y > 510) {
      doc.addPage({ layout: 'landscape' })
      drawTableHeaders(doc, 50)
      y = 75
    }
    drawRow(doc, accident, y, index)
    y += 20
  })

  drawFooter(doc, y)
  doc.end()

  await new Promise((resolve) => doc.on('end', resolve))
  return Buffer.concat(chunks)
}