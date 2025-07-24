import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import TenantManagement from "pages/tenant-management";
import FreeSWitchServerManagement from "pages/free-s-witch-server-management";
import CallManagement from "pages/call-management";
import ExtensionManagement from "pages/extension-management";
import AiServicesDashboard from "pages/ai-services-dashboard";
import CallDetailRecordsCdr from "pages/call-detail-records-cdr";
import BillingDashboard from "pages/billing-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tenant-management" element={<TenantManagement />} />
        <Route path="/free-s-witch-server-management" element={<FreeSWitchServerManagement />} />
        <Route path="/call-management" element={<CallManagement />} />
        <Route path="/extension-management" element={<ExtensionManagement />} />
        <Route path="/ai-services-dashboard" element={<AiServicesDashboard />} />
        <Route path="/call-detail-records-cdr" element={<CallDetailRecordsCdr />} />
        <Route path="/billing-dashboard" element={<BillingDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;