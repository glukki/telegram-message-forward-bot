import { Composer } from 'grammy'
import { MuteButton } from '../controllers'
import {
  registerCallbackQueryHandler,
  registerUpdatesSubscription,
} from './_events'

registerUpdatesSubscription('callback_query')
registerCallbackQueryHandler()

const QUERY_MUTE = '/mute'
const QUERY_MUTE_CONFIRM = '/confirmMute'
const QUERY_UNMUTE = '/unmute'
const QUERY_UNMUTE_CONFIRM = '/confirmUnmute'

const BASE_URL = new URL('http://bot/')

const matchingQueries = [
  QUERY_MUTE,
  QUERY_MUTE_CONFIRM,
  QUERY_UNMUTE,
  QUERY_MUTE_CONFIRM,
]

const queryRegex = new RegExp(`^(${matchingQueries.join('|')})`)

export const muteMiddleware = new Composer()

muteMiddleware.callbackQuery(queryRegex, async (ctx, next) => {
  if (!ctx.callbackQuery.message?.text) {
    return next()
  }

  const queryUrl = new URL(ctx.callbackQuery.data, BASE_URL)

  const commonMessageEditProps = {
    reply_markup: MuteButton.getNextKeyboard(queryUrl),
  }

  if (queryUrl.pathname === QUERY_MUTE || queryUrl.pathname === QUERY_UNMUTE) {
    return ctx.editMessageReplyMarkup({
      ...commonMessageEditProps,
    })
  }

  const key = `${queryUrl.searchParams.get('id')}`
  if (queryUrl.pathname === QUERY_MUTE_CONFIRM) {
    await MUTE.put(key, JSON.stringify(new Date()), {
      expirationTtl: 24 * 60 * 60,
    })
  } else if (queryUrl.pathname === QUERY_UNMUTE_CONFIRM) {
    await MUTE.delete(key)
  }

  if (
    queryUrl.pathname === QUERY_MUTE_CONFIRM ||
    queryUrl.pathname === QUERY_UNMUTE_CONFIRM
  ) {
    const messageSuffix = `Was ${
      queryUrl.pathname === QUERY_MUTE_CONFIRM ? 'muted' : 'unmuted'
    } at ${new Date().toISOString()}`

    return ctx.editMessageText(
      ctx.callbackQuery.message?.text + '\n' + messageSuffix,
      {
        ...commonMessageEditProps,
        entities: ctx.callbackQuery.message.entities,
      },
    )
  }
})
