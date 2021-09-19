import { Update } from 'typegram/update'

const DEFAULT_HANDLER: TelegramRouterEntry = {
  match: () => true,
  handler: async () => undefined,
}

export interface TelegramRouterEntry {
  match: (update: Update) => boolean
  handler: (
    update: Update,
    request: Request,
    event: FetchEvent,
  ) => Promise<Response | void>
}

export class TelegramRouter {
  protected handlers: TelegramRouterEntry[] = []

  constructor(handlers: TelegramRouterEntry[]) {
    this.handlers = handlers
  }

  async handle(request: Request, event: FetchEvent): Promise<Response | void> {
    const body = (await request.json()) as Update

    const { handler } =
      this.handlers.find(({ match }) => match(body)) || DEFAULT_HANDLER
    return await handler(body, request, event)
  }
}
