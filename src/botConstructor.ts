import { Bot } from 'grammy'
import { handlers as middlewares } from './tg-handlers'
import { HAS_CALLBACK_QUERY_HANDLERS } from './tg-handlers/_events'

let bot: Bot

export const getBot = (): Bot => {
  if (bot) {
    return bot
  }

  bot = new Bot(TELEGRAM_API_TOKEN, {
    // TODO: let init once, or define via config, to make `/command@bot` work
    botInfo: {
      is_bot: true,
      username: 'bot',
      can_join_groups: true,
      can_read_all_group_messages: false,
      supports_inline_queries: false,
      id: 1,
      first_name: 'bot',
    },
  })

  bot.use(...middlewares)

  if (HAS_CALLBACK_QUERY_HANDLERS) {
    // wildcard to handle unhandled requests
    bot.on('callback_query:data', async (ctx) => ctx.answerCallbackQuery())
  }

  return bot
}
