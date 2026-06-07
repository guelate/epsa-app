import type { BadgeProps } from "@/interfaces/interface";

// Displays a status badge 
export default function StatusBadge({ label, styles }: BadgeProps) {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ background: styles.bg, color: styles.color }}
    >
      {label}
    </span>
  )
}