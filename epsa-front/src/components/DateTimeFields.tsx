import type { DateTimeFieldsProps } from "@/interfaces/interface";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

//Date and time fields 
export function DateTimeFields({ date, time, onDateChange, onTimeChange }: DateTimeFieldsProps) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
                <Label htmlFor="date">Date de l'accident</Label>
                <Input id="date" type="date" value={date} onChange={(e) => onDateChange(e.target.value)} required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="time">Heure</Label>
                <Input id="time" type="time" value={time} onChange={(e) => onTimeChange(e.target.value)} required />
            </div>
        </div>
    )
}