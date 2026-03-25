import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { getPrerenderRoutes, getRouteMetadata } from './lib/routeMetadata'

export async function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}

export { getPrerenderRoutes, getRouteMetadata }
