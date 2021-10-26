import { Methods, ReplyMethods } from '../types'
import { Update } from 'typegram/update'
import { Chat, Message } from 'typegram'

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

export const makeHookResponse = (
  body: ReplyMethods[keyof ReplyMethods],
): Response => {
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const isMessageUpdate = (
  update: Update,
): update is Update.MessageUpdate => {
  return !!(update as Update.MessageUpdate).message
}

export const isTextMessage = (
  message?: Message,
): message is Message.TextMessage => {
  return !!(message as Message.TextMessage)?.text
}

export const isGroupChat = (
  chat: Chat,
): chat is Chat.GroupChat | Chat.SupergroupChat => {
  return chat.type === 'group' || chat.type === 'supergroup'
}
