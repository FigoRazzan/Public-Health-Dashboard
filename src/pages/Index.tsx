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
import { FilterProvider, useFilters } from "@/contexts/FilterContext";

const DashboardContent = () => {
  const { filters } = useFilters();
  const { loading, error, getStats, getTrendData, getRegionData, getAgeData, getTableData } = useCovidData(filters);
  
  const stats = getStats();
  const trendData = getTrendData(filters.chartTimeRange);
  
  // Use main region filter for both charts
  const regionFilter = filters.region === 'all' 
    ? ['AFR', 'AMR', 'EMR', 'EUR', 'SEAR', 'WPR'] 
    : [filters.region];
  
  const regionData = getRegionData(regionFilter);
  const ageData = getAgeData(regionFilter);
  const tableData = getTableData(10);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Memuat Dashboard COVID-19</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="animate-pulse">●</div>
              <span>Sedang memproses data global...</span>
            </div>
          </div>
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

            <TrendChart data={trendData} />

            <div className="grid gap-4 md:grid-cols-2">
              <DistributionChart data={regionData} />
              <AgeChart data={ageData} />
            </div>

            <DataTable data={tableData} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const Index = () => {
  return (
    <FilterProvider>
      <DashboardContent />
    </FilterProvider>
  );
};

export default Index;
