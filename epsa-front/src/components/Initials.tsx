import type { InitialsProps } from "@/interfaces/interface"

// Displays the first two letters of a full name user
export default function Initials({ name }: InitialsProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium flex-shrink-0">
      {initials}
    </div>
  )
}
