import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { KPICard } from "@/components/KPICard";
import { FilterBar } from "@/components/FilterBar";
import { TrendChart } from "@/components/TrendChart";
import { DistributionChart } from "@/components/DistributionChart";
import { AgeChart } from "@/components/AgeChart";
import { DataTable } from "@/components/DataTable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Activity, Users, Heart, TrendingUp } from "lucide-react";
import { useCovidData } from "@/hooks/useCovidData";

const Index = () => {
  const { loading, error, getStats, getTrendData, getRegionData, getAgeData, getTableData } = useCovidData();
  const stats = getStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-danger">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Ringkasan Eksekutif Wabah</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Pemantauan real-time status kesehatan masyarakat
                </p>
              </div>
              <SidebarTrigger />
            </div>

            <FilterBar />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Total Kasus Terkonfirmasi"
                value={stats.totalCases.toLocaleString('id-ID')}
                trend={{ 
                  direction: stats.casesTrend >= 0 ? "up" : "down", 
                  value: `${stats.casesTrend >= 0 ? '+' : ''}${stats.casesTrend.toFixed(1)}%` 
                }}
                icon={Activity}
                variant="primary"
              />
              <KPICard
                title="Total Kematian"
                value={stats.totalDeaths.toLocaleString('id-ID')}
                trend={{ 
                  direction: stats.deathsTrend >= 0 ? "up" : "down", 
                  value: `${stats.deathsTrend >= 0 ? '+' : ''}${stats.deathsTrend.toFixed(1)}%` 
                }}
                icon={Users}
                variant="danger"
              />
              <KPICard
                title="Total Sembuh"
                value={stats.totalRecovered.toLocaleString('id-ID')}
                trend={{ direction: "down", value: "-0.5%" }}
                icon={Heart}
                variant="success"
              />
              <KPICard
                title="Tingkat Kematian (CFR)"
                value={`${stats.cfr.toFixed(1)}%`}
                trend={{ direction: "down", value: "-0.2%" }}
                icon={TrendingUp}
                variant="warning"
              />
            </div>

            <TrendChart data={getTrendData()} />

            <div className="grid gap-4 md:grid-cols-2">
              <DistributionChart data={getRegionData()} />
              <AgeChart data={getAgeData()} />
            </div>

            <DataTable data={getTableData(10)} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
