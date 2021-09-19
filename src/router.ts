const DEFAULT_HANDLER: RouterEntry = {
  match: () => true,
  handler: async () => {
    return new Response(`Couldn't find a handler for your response`, {
      status: 404,
    })
  },
}

export interface RouterEntry {
  match: (url: URL, request: Request, event: FetchEvent) => boolean
  handler: (request: Request, event: FetchEvent) => Promise<Response>
}

export class Router {
  protected handlers: RouterEntry[] = []

  constructor(handlers: RouterEntry[]) {
    this.handlers = handlers
  }

  async handle(request: Request, event: FetchEvent): Promise<Response> {
    const url = new URL(request.url)
    const { handler } =
      this.handlers.find((item) => item.match(url, request, event)) ||
      DEFAULT_HANDLER
    return await handler(request, event)
  }
}
