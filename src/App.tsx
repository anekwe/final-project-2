/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import PublicLayout from './pages/PublicLayout';
import Home from './pages/Home';
import ApplyNow from './pages/ApplyNow';
import ResultChecker from './pages/ResultChecker';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdmissionManagement from './pages/admin/AdmissionManagement';
import StudentRecords from './pages/admin/StudentRecords';
import StaffRecords from './pages/admin/StaffRecords';
import NewsManagement from './pages/admin/NewsManagement';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="apply" element={<ApplyNow />} />
          <Route path="results" element={<ResultChecker />} />
        </Route>

        {/* Backend Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="admissions" element={<AdmissionManagement />} />
          <Route path="students" element={<StudentRecords />} />
          <Route path="staff" element={<StaffRecords />} />
          <Route path="news" element={<NewsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
