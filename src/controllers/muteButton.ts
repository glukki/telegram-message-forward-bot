import { InlineKeyboard } from 'grammy'
import { InlineKeyboardButton, InlineKeyboardMarkup } from '@grammyjs/types'

const QUERY_MUTE = '/mute'
const QUERY_MUTE_CONFIRM = '/confirmMute'
const QUERY_UNMUTE = '/unmute'
const QUERY_UNMUTE_CONFIRM = '/confirmUnmute'

const USER_ID_PARAM = 'id'

const BASE_URL = 'http://bot/'

type ButtonStateName = typeof QUERY_MUTE | typeof QUERY_MUTE_CONFIRM | typeof QUERY_UNMUTE | typeof QUERY_UNMUTE_CONFIRM

interface ButtonState {
  name: ButtonStateName
  next: ButtonStateName
  value: (queryUrl: URL) => InlineKeyboardButton.CallbackButton
}

const BUTTON_STATES: ButtonState[] = [
  {
    name: QUERY_MUTE,
    next: QUERY_MUTE_CONFIRM,
    value: (queryUrl) => ({
      text: 'Mute',
      callback_data: QUERY_MUTE + queryUrl.search,
    }),
  },
  {
    name: QUERY_MUTE_CONFIRM,
    next: QUERY_UNMUTE,
    value: (queryUrl) => ({
      text: 'Really mute?',
      callback_data: QUERY_MUTE_CONFIRM + queryUrl.search,
    }),
  },
  {
    name: QUERY_UNMUTE,
    next: QUERY_UNMUTE_CONFIRM,
    value: (queryUrl) => ({
      text: 'Unmute',
      callback_data: QUERY_UNMUTE + queryUrl.search,
    }),
  },
  {
    name: QUERY_UNMUTE_CONFIRM,
    next: QUERY_MUTE,
    value: (queryUrl) => ({
      text: 'Really unmute?',
      callback_data: QUERY_UNMUTE_CONFIRM + queryUrl.search,
    }),
  },
]

export class MuteButton {
  static getInitialKeyboard(userId: number): InlineKeyboardMarkup {
    return new InlineKeyboard().add(MuteButton.getInitialMuteButton(userId))
  }

  static getNextKeyboard(queryUrl: URL): InlineKeyboardMarkup {
    return new InlineKeyboard().add(MuteButton.getNextMuteButton(queryUrl))
  }

  private static getInitialMuteButton(userId: number): InlineKeyboardButton.CallbackButton {
    const url = new URL(QUERY_MUTE, BASE_URL)
    url.searchParams.set(USER_ID_PARAM, encodeURIComponent(userId))

    return (BUTTON_STATES.find((state) => state.name === QUERY_MUTE) as ButtonState).value(url)
  }

  private static getNextMuteButton(queryUrl: URL): InlineKeyboardButton.CallbackButton {
    const nextPath = BUTTON_STATES.find(({ name }) => name === queryUrl.pathname)?.next

    return (BUTTON_STATES.find((state) => state.name === nextPath) as ButtonState).value(queryUrl)
  }
}
