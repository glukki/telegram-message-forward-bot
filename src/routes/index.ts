import { RouterEntry } from '../router'

import { status } from './status'
import { telegramWebhook } from './telegramWebhook'

export const routes: RouterEntry[] = [status, telegramWebhook]
