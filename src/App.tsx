import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
<<<<<<< HEAD
=======
import DataExplorer from "./pages/DataExplorer";
import Laporan from "./pages/Laporan";
import SumberData from "./pages/SumberData";
import Pengaturan from "./pages/Pengaturan";
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
<<<<<<< HEAD
=======
          <Route path="/data" element={<DataExplorer />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/sumber" element={<SumberData />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
>>>>>>> f1acd96603ca26ac43bb2e1a9830182e243ccc16
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
