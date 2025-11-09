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
import { useFilters } from "@/contexts/FilterContext";
import { DateRange } from "react-day-picker";

export function FilterBar() {
  const { filters, setDateRange, setRegion, setDataType } = useFilters();

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-card p-4 border">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
                    {format(filters.dateRange.to, "dd MMM yyyy", { locale: id })}
                  </>
                ) : (
                  format(filters.dateRange.from, "dd MMM yyyy", { locale: id })
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
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              locale={id}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Select value={filters.region} onValueChange={setRegion}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Pilih Wilayah WHO" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">Semua Wilayah</SelectItem>
            <SelectItem value="AFR">AFR - Africa</SelectItem>
            <SelectItem value="AMR">AMR - Americas</SelectItem>
            <SelectItem value="EMR">EMR - Eastern Mediterranean</SelectItem>
            <SelectItem value="EUR">EUR - Europe</SelectItem>
            <SelectItem value="SEAR">SEAR - South-East Asia</SelectItem>
            <SelectItem value="WPR">WPR - Western Pacific</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-muted-foreground" />
        <Select value={filters.dataType} onValueChange={setDataType}>
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

      <div className="ml-auto text-sm text-muted-foreground">
        Filter aktif diterapkan secara otomatis
      </div>
    </div>
  );
}
