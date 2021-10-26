import { Update } from 'typegram/update'
import { TelegramHandler } from '../telegramRouter'
import {
  isGroupChat,
  isMessageUpdate,
  isTextMessage,
  makeHookResponse,
} from '../telegramUtils'
import { ReplyMethods } from '../types'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

const COMMAND = '/whereami'

export const whereAmI: TelegramHandler = (update: Update) => {
  if (!isMessageUpdate(update)) {
    return // skip
  }

  if (!isTextMessage(update.message)) {
    return // skip
  }

  if (update.message.text !== COMMAND) {
    return // skip
  }

  if (!isGroupChat(update.message.chat)) {
    return new Response() // catch
  }

  return makeHookResponse({
    method: 'sendMessage',
    chat_id: update.message.chat.id,
    text: 'Current chat ID is:\n' + update.message.chat.id,
    reply_to_message_id: update.message.message_id,
  } as ReplyMethods['sendMessage'])
}
