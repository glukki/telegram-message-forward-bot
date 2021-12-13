import { helpMiddleware } from './help'
import { whereAmIMiddleware } from './whereAmI'
import { forwardMiddleware } from './forwardMessage'

export { UPDATES } from './_events'

export const handlers = [helpMiddleware, whereAmIMiddleware, forwardMiddleware]
