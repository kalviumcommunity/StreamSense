import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const ContentDetails = lazy(() => import('./pages/ContentDetails'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const DatasetUpload = lazy(() => import('./pages/DatasetUpload'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));

const LoadingSpinner = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-950 p-8">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/content/:id" element={<ContentDetails />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/dataset-upload" element={<DatasetUpload />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
