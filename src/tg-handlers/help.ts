import { Composer } from 'grammy'
import { BotContext } from '../types'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

export const helpMiddleware = new Composer<BotContext>()

const HELP_MESSAGE = `Send me anything to forward it to the community members

Available commands:
* /help - show bot description and commands
* /whereami - send it in a group chat to get the chat ID`

helpMiddleware.on('message:text').command(['help', 'start'], async (ctx) => {
  return ctx.reply(HELP_MESSAGE)
})
