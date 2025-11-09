import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { useFilters } from "@/contexts/FilterContext";

interface AgeData {
  age: string;
  cases: number;
}

interface AgeChartProps {
  data: AgeData[];
  onRegionFilterChange?: (regions: string[]) => void;
}

export function AgeChart({ data }: AgeChartProps) {
  const { filters } = useFilters();

  const regionLabels: Record<string, string> = {
    'all': 'Semua Wilayah',
    'AFR': 'Africa',
    'AMR': 'Americas',
    'EMR': 'Eastern Mediterranean',
    'EUR': 'Europe',
    'SEAR': 'South-East Asia',
    'WPR': 'Western Pacific',
  };

  const getFilterText = () => {
    return regionLabels[filters.region] || 'Semua Wilayah';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Kasus Berdasarkan Kelompok Usia</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Filter: {getFilterText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="age"
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
            <Bar dataKey="cases" fill="hsl(var(--primary))" name="Jumlah Kasus" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
