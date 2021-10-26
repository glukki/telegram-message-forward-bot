import { Update } from 'typegram/update'

const DEFAULT_HANDLER = () => new Response()

type MismatchingHandlerResponse = void | Promise<undefined>
type MatchingHandlerResponse = Response | Promise<Response>

export type TelegramHandler = (
  update: Update,
  request: Request,
  event: FetchEvent,
) => MismatchingHandlerResponse | MatchingHandlerResponse

export class TelegramRouter {
  protected handlers: TelegramHandler[] = []

  constructor(handlers: TelegramHandler[]) {
    this.handlers = handlers
  }

  async handle(request: Request, event: FetchEvent): Promise<Response> {
    const body = (await request.json()) as Update

    for (const handler of this.handlers) {
      const response = await handler(body, request, event)
      if (response) {
        return response
      }
    }

    return DEFAULT_HANDLER()
  }
}
