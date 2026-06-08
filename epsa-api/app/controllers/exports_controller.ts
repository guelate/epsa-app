import type { HttpContext } from '@adonisjs/core/http'
import { generateExcel } from '#services/excel_service'
import { generatePdf } from '#services/pdf_service'

export default class ExportsController {

    // Generate and download Excel file
    async excel({ response }: HttpContext) {
        const buffer = await generateExcel()
        response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response.header('Content-Disposition', 'attachment; filename="accidents_travail.xlsx"')
        return response.send(buffer)
    }


    // Generate and download PDF file.
    async pdf({ response }: HttpContext) {
        const buffer = await generatePdf()
        response.header('Content-Type', 'application/pdf')
        response.header('Content-Disposition', 'attachment; filename="accidents_travail.pdf"')
        return response.send(buffer)
    }
}