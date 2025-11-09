import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useFilters } from "@/contexts/FilterContext";

interface TrendData {
  date: string;
  kasusHarian: number;
  kematian: number;
}

interface TrendChartProps {
  data: TrendData[];
  onTimeRangeChange?: (timeRange: string) => void;
}

const REGION_COLORS: Record<string, string> = {
  'all': 'hsl(var(--primary))',
  'AFR': 'hsl(25, 45%, 35%)',       // Dark Brown for Africa
  'AMR': 'hsl(var(--success))',     // Green for Americas
  'EMR': 'hsl(var(--warning))',     // Orange for Eastern Mediterranean
  'EUR': 'hsl(var(--primary))',     // Blue for Europe
  'SEAR': 'hsl(328, 100%, 54%)',    // Fuschia for South-East Asia
  'WPR': 'hsl(300, 47%, 75%)',      // Plum for Western Pacific
};

export function TrendChart({ data, onTimeRangeChange }: TrendChartProps) {
  const { filters, setChartTimeRange } = useFilters();

  const handleTimeRangeChange = (range: string) => {
    setChartTimeRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  const timeRanges = [
    { value: '1m', label: '1 Bulan' },
    { value: '3m', label: '3 Bulan' },
    { value: '6m', label: '6 Bulan' },
    { value: '1y', label: '1 Tahun' },
    { value: 'all', label: 'Semua' },
  ];

  const primaryColor = REGION_COLORS[filters.region] || REGION_COLORS['all'];
  const deathColor = 'hsl(var(--danger))'; // Always red for deaths

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tren Kasus Harian</CardTitle>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={filters.chartTimeRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleTimeRangeChange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="kasusHarian"
              stroke={primaryColor}
              strokeWidth={2}
              name="Kasus Baru"
              dot={{ fill: primaryColor }}
            />
            <Line
              type="monotone"
              dataKey="kematian"
              stroke={deathColor}
              strokeWidth={2}
              name="Kematian Baru"
              dot={{ fill: deathColor }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
