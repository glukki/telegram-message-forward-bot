import { help } from './help'
import { whereAmI } from './whereAmI'
import { forwardMessage } from './forwardMessage'

export { UPDATES } from './_events'

export const handlers = [help, whereAmI, forwardMessage]
