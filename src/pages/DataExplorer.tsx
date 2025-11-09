import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataTable } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Filter } from "lucide-react";

export default function DataExplorer() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-background to-muted/20">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Data Explorer</h1>
                  <p className="text-muted-foreground mt-1">
                    Eksplorasi data COVID-19 secara detail dengan filter dan pencarian
                  </p>
                </div>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Filter & Pencarian Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Cari negara, kode negara, atau wilayah WHO..." 
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filter Lanjutan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <DataTable />

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>Menampilkan 5 dari 50,000+ data</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Previous</Button>
                      <Button variant="outline" size="sm">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
