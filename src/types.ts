import { Update } from '@grammyjs/types'

export type UpdateType = Exclude<keyof Update, 'update_id'>
