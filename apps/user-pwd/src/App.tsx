import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'
import { BottomNav } from './components/BottomNav'
import { LoginPage } from './features/auth/LoginPage'
import { SignupPage } from './features/auth/SignupPage'
import { HomePage } from './features/home/HomePage'
import {ProtectedRoute} from './components/authComponent/ProtectedRoute'
import { ProfilePage } from './features/profile/ProfilePage'

function ProtectedLayout() {


  return (
    <div className="relative mx-auto min-h-dvh max-w-[430px] bg-bg font-sans text-ink">
      <main className="px-5 py-7 pb-[112px]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

function PublicLayout() {

  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes - No bottom nav */}
        <Route element={<PublicLayout />}>
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
