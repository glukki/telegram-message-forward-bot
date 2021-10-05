import { Handler } from '../router'
import { TelegramRouter } from '../telegramRouter'
import { handlers } from '../tg-handlers'

let telegramRouter: TelegramRouter

export const telegramWebhook: Handler = async (url, request, event) => {
  if (url.pathname !== HOOK_PATH) {
    return
  }

  if (!telegramRouter) {
    telegramRouter = new TelegramRouter(handlers)
  }

  return (await telegramRouter.handle(request, event)) || new Response()
}
