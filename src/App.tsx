import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PageUnderConstruction from './pages/PageUnderConstruction'
import { isPageUnderConstruction } from './config/siteFlags'

const Miracosta = lazy(() => import('./pages/Miracosta'))
const StoveSolutions = lazy(() => import('./pages/StoveSolutions'))
const Photography = lazy(() => import('./pages/Photography'))
const Socials = lazy(() => import('./pages/Socials'))
const Website = lazy(() => import('./pages/Website'))
const Season2022 = lazy(() => import('./pages/Season2022'))
const Season2023 = lazy(() => import('./pages/Season2023'))
const Zora2024 = lazy(() => import('./pages/Zora2024'))

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/miracosta"
              element={isPageUnderConstruction('miracosta') ? <PageUnderConstruction title="MiraCosta" /> : <Miracosta />}
            />
            <Route path="/stovesolutions" element={<StoveSolutions />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/socials" element={<Socials />} />
            <Route
              path="/website"
              element={isPageUnderConstruction('website') ? <PageUnderConstruction title="Website" /> : <Website />}
            />
            <Route path="/2022-23-season" element={<Season2022 />} />
            <Route path="/2023-24-season" element={<Season2023 />} />
            <Route path="/zora2024" element={<Zora2024 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
