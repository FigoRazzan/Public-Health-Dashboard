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

const Index = () => {
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
                value="5,450,890"
                trend={{ direction: "up", value: "+2.4%" }}
                icon={Activity}
                variant="primary"
              />
              <KPICard
                title="Total Kematian"
                value="180,980"
                trend={{ direction: "up", value: "+1.8%" }}
                icon={Users}
                variant="danger"
              />
              <KPICard
                title="Total Sembuh"
                value="5,120,400"
                trend={{ direction: "down", value: "-0.5%" }}
                icon={Heart}
                variant="success"
              />
              <KPICard
                title="Tingkat Kematian (CFR)"
                value="3.3%"
                trend={{ direction: "down", value: "-0.2%" }}
                icon={TrendingUp}
                variant="warning"
              />
            </div>

            <TrendChart />

            <div className="grid gap-4 md:grid-cols-2">
              <DistributionChart />
              <AgeChart />
            </div>

            <DataTable />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
