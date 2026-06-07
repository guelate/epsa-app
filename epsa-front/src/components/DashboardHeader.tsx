import type { DashboardHeaderProps } from "@/interfaces/interface";

// Renders the table title and the declare button.
export function DashboardHeader({ onDeclare }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-medium text-gray-900">
        Déclarations d'accidents du travail
      </h2>
      <button
        onClick={onDeclare}
        className="text-xs px-3 py-1.5 rounded-md text-white flex items-center gap-1.5"
        style={{ background: '#1a2f5a' }}
      >
        + Déclarer un AT
      </button>
    </div>
  )
}