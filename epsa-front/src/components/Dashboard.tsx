import { useState, useEffect } from 'react'
import KpiCard from '@/components/KpiCard'
import AccidentsTable from '@/components/AccidentsTable'
import api from '@/api/axios'
import type { Accident } from '@/interfaces/interface'
import Topbar from './TopBar'
import AtModel from './ATModal'

export default function Dashboard() {
  const [accidents, setAccidents] = useState<Accident[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [totalEmployees] = useState(247)

  // Fetches all accidents on mount.
  useEffect(() => {
    api.get('/api/accidents').then(({ data }) => setAccidents(data))
  }, [])

  // Adds the new accident to the top of the list after declaration.
  function handleNewAccident(accident: Accident) {
    setAccidents((prev) => [accident, ...prev])
  }

  //todo: utility function
  // Downloads the export file from the API.
  async function handleExport(format: 'excel' | 'pdf') {
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

  const pending = accidents.filter((a) => a.status === 'En attente').length

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <main className="flex-1 p-5 max-w-6xl mx-auto w-full">
        <h1 className="text-base font-medium text-gray-900 mb-1">Tableau de bord</h1>
        {/* <p className="text-xs text-gray-400 mb-5">Exercice 2025 — Mise à jour aujourd'hui</p> */}

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <KpiCard label="Effectif total" value={totalEmployees} sublabel="salariés actifs" />
          <KpiCard label="AT déclarés 2025" value={accidents.length} sublabel="cette année" />
          <KpiCard label="En attente CPAM" value={pending} sublabel="à traiter" alert={pending > 0} />
        </div>

        {/* Table header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-900">
            Déclarations d'accidents du travail
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-md text-white flex items-center gap-1.5"
            style={{ background: '#1a2f5a' }}
          >
            + Déclarer un AT
          </button>
        </div>

        {/* Accidents table */}
        <AccidentsTable accidents={accidents} />

        {/* todo: split component */}
        {/* Export buttons */}
        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => handleExport('excel')}
            className="text-xs px-3 py-1.5 rounded-md border flex items-center gap-1.5"
            style={{ borderColor: '#3B6D11', color: '#3B6D11' }}
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="text-xs px-3 py-1.5 rounded-md border flex items-center gap-1.5"
            style={{ borderColor: '#A32D2D', color: '#A32D2D' }}
          >
            Export PDF
          </button>
        </div>
      </main>

      <AtModel
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleNewAccident}
      />
    </div>
  )
}