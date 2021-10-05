const DEFAULT_HANDLER = () => {
  return new Response(`Couldn't find a handler for your response`, {
    status: 404,
  })
}

type HandlerResultType = void | Response

export type Handler = (
  url: URL,
  request: Request,
  event: FetchEvent,
) => HandlerResultType | Promise<HandlerResultType>

export class Router {
  protected handlers: Handler[] = []

  constructor(handlers: Handler[]) {
    this.handlers = handlers
  }

  async handle(request: Request, event: FetchEvent): Promise<Response> {
    const url = new URL(request.url)

    for (const handler of this.handlers) {
      const response = await handler(url, request, event)
      if (response) {
        return response
      }
    }

    return DEFAULT_HANDLER()
  }
}
