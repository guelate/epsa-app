import type { KpiCardProps } from "@/interfaces/interface";

// KPI card 
export default function KpiCard({ label, value, sublabel, alert = false }: KpiCardProps) {
  return (
    <div
      className="rounded-lg p-4 border"
      style={{
        background: alert ? '#FAEEDA' : 'white',
        borderColor: alert ? '#FAC775' : '#e5e7eb',
      }}
    >
      <p className="text-xs mb-1.5" style={{ color: alert ? '#854F0B' : '#6b7280' }}>
        {label}
      </p>
      <p className="text-2xl font-medium" style={{ color: alert ? '#633806' : '#111827' }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: alert ? '#854F0B' : '#9ca3af' }}>
        {sublabel}
      </p>
    </div>
  )
}