import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PerformanceTierProvider } from "@/contexts/PerformanceTierContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <PerformanceTierProvider>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </PerformanceTierProvider>
);

export default App;
