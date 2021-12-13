import { Composer } from 'grammy'
import { User } from '@grammyjs/types'
import { registerUpdatesSubscription } from './_events'

registerUpdatesSubscription('message')

export const forwardMiddleware = new Composer()

forwardMiddleware
  .on('message')
  .filter((ctx) => ctx.chat.type === 'private')
  .use(async (ctx, next) => {
    if (typeof FORWARD_TO_CHAT_ID === 'undefined' || !FORWARD_TO_CHAT_ID) {
      return next()
    }

    const from = ctx.message.from as User
    const userName =
      from?.first_name + (from?.last_name ? ` ${from.last_name}` : '') ||
      from?.username ||
      'anonymous'

    await ctx.api.sendMessage(
      FORWARD_TO_CHAT_ID,
      `We got a new message from [${userName}](tg://user?id=${from.id})`,
      {
        parse_mode: 'MarkdownV2',
      },
    )

    await ctx.api.forwardMessage(
      FORWARD_TO_CHAT_ID,
      ctx.message.chat.id,
      ctx.message.message_id,
    )

    return ctx.reply('Your message got forwarded.')
  })
