import type { Accident } from "@/interfaces/interface";

//todo: export 
interface AccidentsTableProps {
  accidents: Accident[]
}


const statusStyles: Record<string, { bg: string; color: string }> = {
  'En attente':  { bg: '#FAEEDA', color: '#854F0B' },
  'Envoyé CPAM': { bg: '#E6F1FB', color: '#185FA5' },
  'Reconnu':     { bg: '#EAF3DE', color: '#3B6D11' },
  'Contesté':    { bg: '#F1EFE8', color: '#5F5E5A' },
}

const typeStyles: Record<string, { bg: string; color: string }> = {
  'Lieu de travail': { bg: '#EEEDFE', color: '#3C3489' },
  'Trajet':          { bg: '#FAECE7', color: '#993C1D' },
}

//Update interface ? 
function Badge({ label, styles }: { label: string; styles: { bg: string; color: string } }) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ background: styles.bg, color: styles.color }}
    >
      {label}
    </span>
  )
}

//update make string directly
function Initials({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium flex-shrink-0">
      {initials}
    </div>
  )
}

export default function AccidentsTable({ accidents }: AccidentsTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-gray-50">
          {/* update this part */}
          <tr>
            <th className="text-left text-xs font-medium text-gray-500 px-3 py-2.5 border-b border-gray-200" style={{ width: '28%' }}>Employé</th>
            <th className="text-left text-xs font-medium text-gray-500 px-3 py-2.5 border-b border-gray-200" style={{ width: '16%' }}>Date</th>
            <th className="text-left text-xs font-medium text-gray-500 px-3 py-2.5 border-b border-gray-200" style={{ width: '18%' }}>Type</th>
            <th className="text-left text-xs font-medium text-gray-500 px-3 py-2.5 border-b border-gray-200" style={{ width: '22%' }}>Lieu</th>
            <th className="text-left text-xs font-medium text-gray-500 px-3 py-2.5 border-b border-gray-200" style={{ width: '16%' }}>Statut</th>
          </tr>
        </thead>

        <tbody>
          {accidents.map((accident) => {
            
            const isPending = accident.status === 'En attente'
            const employeeName = `${accident.employee.firstName} ${accident.employee.lastName}`
            const date = new Date(accident.accidentDate).toLocaleDateString('fr-FR')

            return (
              <tr key={accident.id} style={{ background: isPending ? '#FAEEDA' : 'white' }}>
                <td className="px-3 py-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Initials name={employeeName} />
                    <span className="text-gray-900 text-xs">{employeeName}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700">{date}</td>
                <td className="px-3 py-2.5 border-b border-gray-100">
                  <Badge label={accident.type} styles={typeStyles[accident.type]} />
                </td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700">{accident.location}</td>
                <td className="px-3 py-2.5 border-b border-gray-100">
                  <Badge label={accident.status} styles={statusStyles[accident.status]} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}