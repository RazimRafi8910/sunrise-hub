import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'
import { LoginPage } from './features/auth/LoginPage'
import { SignupPage } from './features/auth/SignupPage'
import { HomePage } from './features/home/HomePage'
import { ProtectedRoute } from './components/authComponent/ProtectedRoute'
import { ProfilePage } from './features/profile/ProfilePage'
import AuthProtectRoute from './components/authComponent/AuthRoute'
import { ReportsHomePage } from './features/report/ReportsHomePage'
import {
  AgainstMeReportsPage,
  MyReportsPage,
  NewReportPage,
  NotificationsPage,
  ReportDetailPage,
  RulesPage,
} from './features/report/PlaceholderPages'

function PublicLayout() {
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / standalone routes */}
        <Route element={<PublicLayout />}>
          <Route path="/report" element={<ReportsHomePage />} />
          <Route path="/reports" element={<MyReportsPage />} />
          <Route path="/reports/new" element={<NewReportPage />} />
          <Route path="/reports/against-me" element={<AgainstMeReportsPage />} />
          <Route path="/reports/:id" element={<ReportDetailPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        {/* Auth routes - No bottom nav */}
        <Route element={<AuthProtectRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Authenticated routes - With bottom nav */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
