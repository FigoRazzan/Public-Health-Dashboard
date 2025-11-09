import { Calendar, MapPin, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function FilterBar() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card p-4 border">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd MMM yyyy", { locale: id })} -{" "}
                    {format(date.to, "dd MMM yyyy", { locale: id })}
                  </>
                ) : (
                  format(date.from, "dd MMM yyyy", { locale: id })
                )
              ) : (
                <span>Pilih Rentang Tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={id}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Wilayah" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">Semua Wilayah</SelectItem>
            <SelectItem value="jakarta">DKI Jakarta</SelectItem>
            <SelectItem value="jabar">Jawa Barat</SelectItem>
            <SelectItem value="jateng">Jawa Tengah</SelectItem>
            <SelectItem value="jatim">Jawa Timur</SelectItem>
            <SelectItem value="bali">Bali</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-muted-foreground" />
        <Select defaultValue="covid">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipe Data" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="covid">COVID-19</SelectItem>
            <SelectItem value="dengue">Dengue</SelectItem>
            <SelectItem value="all">Semua</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="ml-auto bg-primary hover:bg-primary-dark">Terapkan Filter</Button>
    </div>
  );
}
