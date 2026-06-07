import type { AccidentsTableProps } from "@/interfaces/interface"
import Initials from "./Initials";
import StatusBadge from "./StatusBadge";
import { COLUMNS, STATUS_STYLES, TYPE_STYLES } from "@/constants/constants";

// Table of accidents with employee initials, date, type, location and status
export default function AccidentsTable({ accidents }: AccidentsTableProps) {
  return (
    // <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white rounded-lg overflow-hidden border shadow" >

      <table className="w-full text-sm" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-gray-50">
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.label}
                className="text-left text-xs font-medium text-gray-500 px-3 py-2.5 border-b border-gray-200"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accidents.map((accident) => {
            const isPending = accident.status === 'En attente'
            const employeeName = `${accident.employee.firstName} ${accident.employee.lastName}`
            const date = new Date(accident.accidentDate).toLocaleDateString('fr-FR')

            return (
              <tr key={accident.id} style={{ background: isPending ? '#f9fafb' : 'white' }}>
                <td className="px-3 py-2.5 border-b border-gray-100 ">
                  <div className="flex items-center gap-2">
                    <Initials name={employeeName} />
                    <span className="text-gray-900 text-xs">{employeeName}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700">{date}</td>
                <td className="px-3 py-2.5 border-b border-gray-100">
                  <StatusBadge label={accident.type} styles={TYPE_STYLES[accident.type]} />
                  
                </td>
                <td className="px-3 py-2.5 border-b border-gray-100 text-xs text-gray-700">{accident.location}</td>
                <td className="px-3 py-2.5 border-b border-gray-100">
                  <StatusBadge label={accident.status} styles={STATUS_STYLES[accident.status]} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}