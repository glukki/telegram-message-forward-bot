import { Message } from 'typegram'
import { Update } from 'typegram/update'
import { TelegramHandler } from '../telegramRouter'
import { makeHookResponse } from '../telegramUtils'
import { ReplyMethods } from '../types'

const COMMAND = '/whereami'

export const whereAmI: TelegramHandler = (update: Update) => {
  const u = update as Update.MessageUpdate
  if (!u.message) {
    return // skip
  }

  const m = u.message as Message.TextMessage
  if (!m.text) {
    return // skip
  }

  if (m.text !== COMMAND) {
    return // skip
  }

  if (m.chat.type !== 'group' && m.chat.type !== 'supergroup') {
    return new Response() // catch
  }

  return makeHookResponse({
    method: 'sendMessage',
    chat_id: u.message.chat.id,
    text: 'Current chat ID is:\n' + u.message.chat.id,
    reply_to_message_id: u.message.message_id,
  } as ReplyMethods['sendMessage'])
}
