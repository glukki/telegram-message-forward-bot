import { WebhookInfo } from 'typegram/manage'
import { Handler } from '../router'
import { makeTelegramRequestParams, TELEGRAM_API_URL } from '../telegramUtils'
import { Methods, UpdateType } from '../types'

const ALLOWED_UPDATES = ['message', 'my_chat_member'] as UpdateType[]

let isHookBound = false

export const status: Handler = async (url, request) => {
  if (url.pathname !== '/status') {
    return
  }

  if (!isHookBound) {
    const url = new URL(request.url)
    url.pathname = HOOK_PATH

    const response = await fetch(
      `${TELEGRAM_API_URL}/setWebhook`,
      makeTelegramRequestParams({
        url: url.toString(),
        allowed_updates: ALLOWED_UPDATES,
      } as Methods['setWebhook']),
    )

    const responseBody = (await response.json()) as WebhookInfo

    isHookBound = !!responseBody.url?.length
  }

  return fetch(TELEGRAM_API_URL + '/getWebhookInfo')
}
