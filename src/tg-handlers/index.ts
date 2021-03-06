import { helpMiddleware } from './help'
import { muteMiddleware } from './mute'
import { whereAmIMiddleware } from './whereAmI'
import { forwardMiddleware } from './forwardMessage'

export { UPDATES } from './_events'

export const middlewares = [helpMiddleware, muteMiddleware, whereAmIMiddleware, forwardMiddleware]
