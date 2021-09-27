import { Update } from 'typegram/update'
import { Methods, ReplyMethods } from '../types'
import { TelegramRouterEntry } from '../telegramRouter'
import {
  TELEGRAM_API_URL,
  makeHookResponse,
  makeTelegramRequestParams,
} from '../telegramUtils'

export const forwardMessage: TelegramRouterEntry = {
  match: (update) => {
    if (typeof FORWARD_TO_CHAT_ID === 'undefined' || !FORWARD_TO_CHAT_ID) {
      return false
    }

    const u = update as Update.MessageUpdate
    if (!u.message || u.message.chat.type !== 'private') {
      return false
    }

    return u.message.chat.id.toString() !== FORWARD_TO_CHAT_ID
  },
  handler: async (update, request, event) => {
    const u = update as Update.MessageUpdate

    event.waitUntil(
      Promise.resolve().then(async () => {
        const { from } = u.message
        const userName =
          from.first_name + (from.last_name ? ` ${from.last_name}` : '') ||
          from.username ||
          'anonymous'

        await fetch(
          `${TELEGRAM_API_URL}/sendMessage`,
          makeTelegramRequestParams({
            chat_id: FORWARD_TO_CHAT_ID,
            parse_mode: 'MarkdownV2',
            text: `We got a new message from [${userName}](tg://user?id=${u.message.from.id})`,
          } as Methods['sendMessage']),
        )

        await fetch(
          `${TELEGRAM_API_URL}/forwardMessage`,
          makeTelegramRequestParams({
            chat_id: FORWARD_TO_CHAT_ID,
            from_chat_id: u.message.chat.id,
            message_id: u.message.message_id,
          } as Methods['forwardMessage']),
        )
      }),
    )

    return makeHookResponse({
      method: 'sendMessage',
      chat_id: u.message.chat.id,
      text: 'Your message got forwarded.',
    } as ReplyMethods['sendMessage'])
  },
}
