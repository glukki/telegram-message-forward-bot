import { Message } from 'typegram'
import { Update } from 'typegram/update'
import { TelegramHandler } from '../telegramRouter'
import { makeHookResponse } from '../telegramUtils'
import { ReplyMethods } from '../types'

const COMMANDS = ['/start', '/help']
const HELP_MESSAGE = `Send me anything to forward it to the community members

Available commands:
* /help - show bot description and commands
* /whereami - send it in a group chat to get the chat ID`

export const help: TelegramHandler = (update) => {
  const u = update as Update.MessageUpdate
  if (!u.message) {
    return // skip
  }

  const m = u.message as Message.TextMessage
  if (!m.text) {
    return // skip
  }

  if (!COMMANDS.some((command) => m.text === command)) {
    return // skip
  }

  return makeHookResponse({
    method: 'sendMessage',
    chat_id: u.message.chat.id,
    text: HELP_MESSAGE,
  } as ReplyMethods['sendMessage'])
}
