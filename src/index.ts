import { log } from './log'
import { handleRequest } from './handler'

async function handleEvent(event: FetchEvent): Promise<Response> {
  try {
    return await handleRequest(event.request, event)
  } catch (e) {
    event.waitUntil(log(e, event.request))
    return new Response(e.message || 'An error occurred!', {
      status: e.statusCode || 500,
    })
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
})
