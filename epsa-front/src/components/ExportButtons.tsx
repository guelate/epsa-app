// Renders the Excel and PDF export buttons.

import { EXPORT_BUTTONS } from "@/constants/constants";
import { downloadExport } from "@/utils/export";

export function ExportButtons() {
  return (
    <div className="flex justify-end gap-2 mt-3">
      {EXPORT_BUTTONS.map(({ format, label, borderColor, color }) => (
        <button
          key={format}
          onClick={() => downloadExport(format)}
          className="text-xs px-3 py-1.5 rounded-md border flex items-center gap-1.5"
          style={{ borderColor, color }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
