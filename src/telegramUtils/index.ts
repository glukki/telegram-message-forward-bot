import { Methods } from '../types'

export const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`

export const makeTelegramRequestParams = (
  body: Methods[keyof Methods],
): RequestInit => {
  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}
