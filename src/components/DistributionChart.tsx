import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useFilters } from "@/contexts/FilterContext";

interface RegionData {
  name: string;
  value: number;
}

interface DistributionChartProps {
  data: RegionData[];
  onRegionFilterChange?: (regions: string[]) => void;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--danger))",
  "hsl(var(--accent))",
  "hsl(210, 60%, 70%)",
];

export function DistributionChart({ data }: DistributionChartProps) {
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
          <CardTitle>Distribusi Kasus per Wilayah</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Filter: {getFilterText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={(entry) => entry.name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
