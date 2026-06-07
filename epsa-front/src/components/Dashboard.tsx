import { useState, useEffect } from 'react'
import KpiCard from '@/components/KpiCard'
import AccidentsTable from '@/components/AccidentsTable'
import Topbar from '@/components/TopBar'
import api from '@/api/axios'
import type { Accident } from '@/interfaces/interface'
import {  TOTAL_EMPLOYEES } from '@/constants/constants'
import AtModal from './AtModal'
import { DashboardHeader } from './DashboardHeader'
import { ExportButtons } from './ExportButtons'


// Fetches accidents, displays KPIs, table and export buttons.


export default function Dashboard() {
  const [accidents, setAccidents] = useState<Accident[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  // Fetches all accidents on mount.
  useEffect(() => {
    api.get('/api/accidents').then(({ data }) => setAccidents(data))
  }, [])

  // Adds the new accident to the top of the list after declaration.
  function handleNewAccident(accident: Accident) {
    setAccidents((prev) => [accident, ...prev])
  }

  const pending = accidents.filter((a) => a.status === 'En attente').length

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1 p-5 max-w-6xl mx-auto w-full">
        <h1 className="text-base font-medium text-gray-900 mb-4">Tableau de bord</h1>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <KpiCard label="Effectif total"    value={TOTAL_EMPLOYEES}  sublabel="salariés actifs" />
          <KpiCard label="AT déclarés 2026"  value={accidents.length} sublabel="cette année" />
          <KpiCard label="En attente CPAM"   value={pending}          sublabel="à traiter" alert={pending > 0} />
        </div>

        <DashboardHeader onDeclare={() => setModalOpen(true)} />
        <AccidentsTable accidents={accidents} />
        <ExportButtons />
      </main>

      <AtModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleNewAccident}
      />
    </div>
  )
}