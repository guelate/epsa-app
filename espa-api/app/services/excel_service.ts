import ExcelJS from 'exceljs'
import Accident from '#models/accident'

//Define the columns structure for the Excel file.
function buildColumns(): Partial<ExcelJS.Column>[] {
    return [
        { header: 'Employé', key: 'employee', width: 25 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Heure', key: 'time', width: 10 },
        { header: 'Type', key: 'type', width: 20 },
        { header: 'Lieu', key: 'location', width: 25 },
        { header: 'Description', key: 'description', width: 40 },
        { header: 'Témoin', key: 'witness', width: 20 },
        { header: 'Statut', key: 'status', width: 15 },
    ]
}


//Style to the header row.
function applyHeaderStyle(sheet: ExcelJS.Worksheet) {
    sheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF1a2f5a' },
        }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
    })
}

//Style for border
function applyBorders(sheet: ExcelJS.Worksheet) {
    sheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            }
        })
    })
}


// Convert accident into Excel row
function formatRow(accident: Accident) {
    return {
        employee: `${accident.employee.firstName} ${accident.employee.lastName}`,
        date: accident.accidentDate.toFormat('dd/MM/yyyy'),
        time: accident.accidentTime,
        type: accident.type,
        location: accident.location,
        description: accident.description,
        witness: accident.witness ?? '—',
        status: accident.status,
    }
}

//File generating 
export async function generateExcel(): Promise<ExcelJS.Buffer> {
    const accidents = await Accident.query()
        .preload('employee')
        .orderBy('created_at', 'desc')

    const workbook = new ExcelJS.Workbook()
    workbook.creator = 'EPSA Group'
    workbook.created = new Date()

    const sheet = workbook.addWorksheet('Accidents du travail')
    sheet.columns = buildColumns()
    applyHeaderStyle(sheet)
    accidents.forEach((accident) => sheet.addRow(formatRow(accident)))
    applyBorders(sheet)

    return workbook.xlsx.writeBuffer()
}