import { Router, RouterEntry } from './router'
import { routes as appRoutes } from './routes'

const routes: RouterEntry[] = [
  ...appRoutes,
  {
    match: (url) => url.pathname === '/',
    handler: async (request) => {
      return new Response(`request method: ${request.method}`)
    },
  },
]

let router: Router

export async function handleRequest(
  request: Request,
  event: FetchEvent,
): Promise<Response> {
  if (!router) {
    router = new Router(routes)
  }

  return await router.handle(request, event)
}
