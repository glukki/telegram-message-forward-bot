import { TelegramHandler } from '../telegramRouter'
import {
  isMessageUpdate,
  isTextMessage,
  makeHookResponse,
} from '../telegramUtils'
import { ReplyMethods } from '../types'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

const COMMANDS = ['/start', '/help']
const HELP_MESSAGE = `Send me anything to forward it to the community members

Available commands:
* /help - show bot description and commands
* /whereami - send it in a group chat to get the chat ID`

export const help: TelegramHandler = (update) => {
  if (!isMessageUpdate(update)) {
    return // skip
  }

  if (!isTextMessage(update.message)) {
    return // skip
  }

  const { text } = update.message
  if (!COMMANDS.some((command) => text === command)) {
    return // skip
  }

  return makeHookResponse({
    method: 'sendMessage',
    chat_id: update.message.chat.id,
    text: HELP_MESSAGE,
  } as ReplyMethods['sendMessage'])
}
