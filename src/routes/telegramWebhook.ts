import { RouterEntry } from '../router'
import { TelegramRouter } from '../telegramRouter'
import { handlers } from '../tg-handlers'

let telegramRouter: TelegramRouter

export const telegramWebhook: RouterEntry = {
  match: (url) => url.pathname === HOOK_PATH,
  handler: async (request, event) => {
    if (!telegramRouter) {
      telegramRouter = new TelegramRouter(handlers)
    }

    return (await telegramRouter.handle(request, event)) || new Response()
  },
}
