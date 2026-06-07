import api from '@/api/axios'

// Downloads an export file from 

export async function downloadExport(format: 'excel' | 'pdf') {
  const url = format === 'excel' ? '/api/exports/excel' : '/api/exports/pdf'
  const mimeType = format === 'excel'
    ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    : 'application/pdf'
  const filename = format === 'excel' ? 'accidents_travail.xlsx' : 'accidents_travail.pdf'

  const response = await api.get(url, { responseType: 'blob' })
  const blob = new Blob([response.data], { type: mimeType })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}