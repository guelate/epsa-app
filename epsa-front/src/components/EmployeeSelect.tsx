import type { EmployeeSelectProps } from "@/interfaces/interface";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "./ui/select";
import { Label } from "./ui/label";

// Renders the employee dropdown list
export function EmployeeSelect({ employees, value, onChange }: EmployeeSelectProps) {
  return (
    <div className="space-y-1">
      <Label>Employé</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner un employé" />
        </SelectTrigger>
        <SelectContent>
          {employees.map((emp) => (
            <SelectItem key={emp.id} value={String(emp.id)}>
              {emp.firstName} {emp.lastName} — {emp.position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}