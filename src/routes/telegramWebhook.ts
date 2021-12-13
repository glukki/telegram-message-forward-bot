import { webhookCallback } from 'grammy'
import { Handler } from '../router'
import { getBot } from '../botConstructor'
import { webhookAdapter } from '../telegramUtils'

let hook: Handler

export const telegramWebhook: Handler = async (url, request, event) => {
  if (url.pathname !== HOOK_PATH) {
    return
  }

  if (!hook) {
    hook = webhookCallback(getBot(), webhookAdapter)
  }

  return hook(url, request, event)
}
