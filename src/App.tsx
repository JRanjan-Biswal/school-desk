
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import SuperAdmin from "./pages/SuperAdmin";
import SchoolAdmin from "./pages/SchoolAdmin";
import Teacher from "./pages/Teacher";
import Parent from "./pages/Parent";
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
          <Route path="/demo" element={<Demo />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/school-admin" element={<SchoolAdmin />} />
          
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
