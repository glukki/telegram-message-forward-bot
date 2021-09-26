import { Message } from 'typegram'
import { Update } from 'typegram/update'
import { TelegramRouterEntry } from '../telegramRouter'
import { makeHookResponse } from '../telegramUtils'
import { ReplyMethods } from '../types'

const COMMAND = '/help'
const HELP_MESSAGE = `Send me anything to forward it to the community members

Available commands:
* /help - show bot description and commands
* /whereami - send it in a group chat to get the chat ID`

export const help: TelegramRouterEntry = {
  match: (update: Update) => {
    const u = update as Update.MessageUpdate
    if (!u.message) {
      return false
    }

    const m = u.message as Message.TextMessage
    if (!m.text) {
      return false
    }

    return m.text === COMMAND
  },
  handler: async (update) => {
    const u = update as Update.MessageUpdate

    return makeHookResponse({
      method: 'sendMessage',
      chat_id: u.message.chat.id,
      text: HELP_MESSAGE,
    } as ReplyMethods['sendMessage'])
  },
}
