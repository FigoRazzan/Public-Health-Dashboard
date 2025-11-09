import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Upload, Link2, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SumberData() {
  const dataSources = [
    {
      name: "WHO COVID-19 Database",
      type: "API",
      status: "Aktif",
      lastSync: "2 menit yang lalu",
      records: "50,234 data"
    },
    {
      name: "Johns Hopkins University",
      type: "CSV Import",
      status: "Aktif",
      lastSync: "15 menit yang lalu",
      records: "48,892 data"
    },
    {
      name: "National Health Ministry",
      type: "Manual Upload",
      status: "Pending",
      lastSync: "1 jam yang lalu",
      records: "12,450 data"
    },
    {
      name: "Regional Health Office",
      type: "API",
      status: "Error",
      lastSync: "2 jam yang lalu",
      records: "0 data"
    }
  ];

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
                  <h1 className="text-3xl font-bold text-foreground">Sumber Data</h1>
                  <p className="text-muted-foreground mt-1">
                    Kelola koneksi dan integrasi sumber data COVID-19
                  </p>
                </div>
                <Button className="gap-2">
                  <Link2 className="h-4 w-4" />
                  Tambah Sumber Data
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-success/10 text-success">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-muted-foreground">Sumber Aktif</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-warning/10 text-warning">
                        <AlertCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm text-muted-foreground">Pending Sync</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-danger/10 text-danger">
                        <AlertCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm text-muted-foreground">Error</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Daftar Sumber Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataSources.map((source, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Database className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{source.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Last sync: {source.lastSync} • {source.records}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{source.type}</Badge>
                          <Badge 
                            variant={
                              source.status === "Aktif" ? "default" : 
                              source.status === "Pending" ? "secondary" : 
                              "destructive"
                            }
                          >
                            {source.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Konfigurasi
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Data Manual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Upload File CSV</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop file CSV atau klik untuk memilih
                    </p>
                    <Button>Pilih File</Button>
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
