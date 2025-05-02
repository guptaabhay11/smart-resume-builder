import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResumeTemplateSelect from "./pages/ResumeTemplateSelect";
import ResumeEdit from "./pages/ResumeEdit";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

// Lazy load the MyResume component
const MyResume = lazy(() => import('./pages/MyResume'));
const LoginForm = lazy(() => import('./pages/Login'));


const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/select-template" element={<ResumeTemplateSelect />} />
      <Route path="/edit" element={<ResumeEdit />} />
    
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route 
  path="/login" 
  element={
    <Suspense fallback={<div className="p-8 text-center">Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  }
/>
      <Route 
        path="/my-resumes" 
        element={
          <Suspense fallback={<div className="text-center p-8">Loading Resumes...</div>}>
            <MyResume />
          </Suspense>
        } 
      />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </TooltipProvider>
);

export default App;