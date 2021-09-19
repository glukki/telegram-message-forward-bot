import { Update } from 'typegram/update'
import { Telegram } from 'typegram'

type UnionKeys<T> = T extends unknown ? keyof T : never
export type UpdateType = Exclude<UnionKeys<Update>, keyof Update>

export type Methods = {
  [K in keyof Telegram]: Parameters<Telegram[K]>[0]
}
