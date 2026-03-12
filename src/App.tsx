import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Miracosta from './pages/Miracosta'
import StoveSolutions from './pages/StoveSolutions'
import Photography from './pages/Photography'
import Socials from './pages/Socials'
import Website from './pages/Website'
import Education from './pages/Education'
import FtcRobotics from './pages/FtcRobotics'
import Season2022 from './pages/Season2022'
import Season2023 from './pages/Season2023'
import Zora2024 from './pages/Zora2024'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/miracosta" element={<Miracosta />} />
          <Route path="/stovesolutions" element={<StoveSolutions />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/website" element={<Website />} />
          <Route path="/education" element={<Education />} />
          <Route path="/ftc-robotics" element={<FtcRobotics />} />
          <Route path="/2022-23-season" element={<Season2022 />} />
          <Route path="/2023-24-season" element={<Season2023 />} />
          <Route path="/zora2024" element={<Zora2024 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
