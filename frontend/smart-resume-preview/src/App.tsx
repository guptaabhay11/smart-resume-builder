import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResumeTemplateSelect from "./pages/ResumeTemplateSelect";
import ResumeEdit from "./pages/ResumeEdit";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyResume from "./pages/MyResume";
import Signup from "./pages/Signup";
const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/select-template" element={<ResumeTemplateSelect />} />
      <Route path="/edit" element={<ResumeEdit />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-resumes" element={<MyResume />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </TooltipProvider>
);

export default App;
