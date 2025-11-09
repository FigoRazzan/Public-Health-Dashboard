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
                    ID <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Negara <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Provinsi <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
                    Kasus <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button variant="ghost" size="sm" className="h-8">
                    Kematian <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="h-8">
                    Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
