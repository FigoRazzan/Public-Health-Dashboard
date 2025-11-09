import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tableData = [
  {
    date_reported: "2020-01-04",
    country_code: "AF",
    country: "Afghanistan",
    who_region: "EMR",
    new_cases: 0,
    cumulative_cases: 0,
    new_deaths: 0,
    cumulative_deaths: 0,
  },
  {
    date_reported: "2020-01-04",
    country_code: "DZ",
    country: "Algeria",
    who_region: "AFR",
    new_cases: 0,
    cumulative_cases: 0,
    new_deaths: 0,
    cumulative_deaths: 0,
  },
  {
    date_reported: "2020-01-04",
    country_code: "AL",
    country: "Albania",
    who_region: "EUR",
    new_cases: 0,
    cumulative_cases: 0,
    new_deaths: 0,
    cumulative_deaths: 0,
  },
  {
    date_reported: "2020-01-04",
    country_code: "AI",
    country: "Anguilla",
    who_region: "AMR",
    new_cases: 0,
    cumulative_cases: 0,
    new_deaths: 0,
    cumulative_deaths: 0,
  },
  {
    date_reported: "2020-01-04",
    country_code: "AS",
    country: "American Samoa",
    who_region: "WPR",
    new_cases: 0,
    cumulative_cases: 0,
    new_deaths: 0,
    cumulative_deaths: 0,
  },
];

export function DataTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Rinci (Live)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Kode <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Negara <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Wilayah WHO <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
                    Kasus Baru <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
                    Total Kasus <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
                    Kematian Baru <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
                    Total Kematian <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={`${row.country_code}-${row.date_reported}-${index}`}>
                  <TableCell className="font-medium">{row.date_reported}</TableCell>
                  <TableCell>{row.country_code}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.who_region}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.new_cases.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.cumulative_cases.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.new_deaths.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.cumulative_deaths.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
