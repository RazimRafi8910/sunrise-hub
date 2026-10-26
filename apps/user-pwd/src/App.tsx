import { BrowserRouter, Route, Routes } from 'react-router'
import { BottomNav } from './components/BottomNav'
import { HomePage } from './features/home/HomePage'
import { ProfilePage } from './features/profile/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative mx-auto min-h-dvh max-w-[430px] bg-bg font-sans text-ink">
        <main className="px-5 py-7 pb-[112px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
