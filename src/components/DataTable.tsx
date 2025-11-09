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
<<<<<<< HEAD
    id: "001",
    negara: "Indonesia",
    provinsi: "DKI Jakarta",
    kasus: "1,245,890",
    kematian: "45,230",
    tanggal: "09 Nov 2025",
    status: "Tinggi",
  },
  {
    id: "002",
    negara: "Indonesia",
    provinsi: "Jawa Barat",
    kasus: "982,340",
    kematian: "32,120",
    tanggal: "09 Nov 2025",
    status: "Sedang",
  },
  {
    id: "003",
    negara: "Indonesia",
    provinsi: "Jawa Tengah",
    kasus: "876,230",
    kematian: "28,940",
    tanggal: "09 Nov 2025",
    status: "Sedang",
  },
  {
    id: "004",
    negara: "Indonesia",
    provinsi: "Jawa Timur",
    kasus: "1,124,560",
    kematian: "38,670",
    tanggal: "09 Nov 2025",
    status: "Tinggi",
  },
  {
    id: "005",
    negara: "Indonesia",
    provinsi: "Bali",
    kasus: "321,870",
    kematian: "11,240",
    tanggal: "09 Nov 2025",
    status: "Rendah",
  },
  {
    id: "006",
    negara: "Indonesia",
    provinsi: "Sumatera Utara",
    kasus: "654,320",
    kematian: "21,890",
    tanggal: "09 Nov 2025",
    status: "Sedang",
  },
  {
    id: "007",
    negara: "Indonesia",
    provinsi: "Sulawesi Selatan",
    kasus: "432,190",
    kematian: "15,670",
    tanggal: "09 Nov 2025",
    status: "Rendah",
=======
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
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
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
<<<<<<< HEAD
                    ID <ArrowUpDown className="ml-2 h-4 w-4" />
=======
                    Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Kode <ArrowUpDown className="ml-2 h-4 w-4" />
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Negara <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
<<<<<<< HEAD
                    Provinsi <ArrowUpDown className="ml-2 h-4 w-4" />
=======
                    Wilayah WHO <ArrowUpDown className="ml-2 h-4 w-4" />
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
<<<<<<< HEAD
                    Kasus <ArrowUpDown className="ml-2 h-4 w-4" />
=======
                    Kasus Baru <ArrowUpDown className="ml-2 h-4 w-4" />
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
<<<<<<< HEAD
                    Kematian <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
=======
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
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
<<<<<<< HEAD
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.negara}</TableCell>
                  <TableCell>{row.provinsi}</TableCell>
                  <TableCell className="text-right font-mono">{row.kasus}</TableCell>
                  <TableCell className="text-right font-mono">{row.kematian}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Tinggi"
                          ? "destructive"
                          : row.status === "Sedang"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.tanggal}</TableCell>
=======
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
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
