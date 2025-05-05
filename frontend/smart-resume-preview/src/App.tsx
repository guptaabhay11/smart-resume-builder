import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";


const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ResumeTemplateSelect = lazy(() => import('./pages/ResumeTemplateSelect'));
const ResumeEdit = lazy(() => import('./pages/ResumeEdit'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Signup = lazy(() => import('./pages/Signup'));
const MyResume = lazy(() => import('./pages/MyResume'));
const LoginForm = lazy(() => import('./pages/Login'));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />

    <Suspense
      fallback={
        <div className="p-8 space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/select-template" element={<ResumeTemplateSelect />} />
        <Route path="/edit" element={<ResumeEdit />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/my-resumes" element={<MyResume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </TooltipProvider>
);

export default App;
