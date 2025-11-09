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

const data = [
  { date: "Jan", kasusHarian: 4500, kematian: 120 },
  { date: "Feb", kasusHarian: 5200, kematian: 145 },
  { date: "Mar", kasusHarian: 6800, kematian: 198 },
  { date: "Apr", kasusHarian: 8200, kematian: 234 },
  { date: "Mei", kasusHarian: 7500, kematian: 210 },
  { date: "Jun", kasusHarian: 6200, kematian: 178 },
];

export function TrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Kasus Harian (6 Bulan Terakhir)</CardTitle>
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
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Kasus Baru"
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line
              type="monotone"
              dataKey="kematian"
              stroke="hsl(var(--danger))"
              strokeWidth={2}
              name="Kematian Baru"
              dot={{ fill: "hsl(var(--danger))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
