import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { normalizePathname } from './lib/routeMetadata'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found.')
}

const currentPathname = normalizePathname(window.location.pathname)
const prerenderedPathname = normalizePathname(rootElement.dataset.prerenderedPath ?? '')
const shouldHydrate = rootElement.hasChildNodes() && prerenderedPathname === currentPathname

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (shouldHydrate) {
  hydrateRoot(rootElement, app)
} else {
  rootElement.replaceChildren()
  createRoot(rootElement).render(app)
}
