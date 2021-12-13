import { FrameworkAdapter } from 'grammy'
import { Chat } from '@grammyjs/types'

export const webhookAdapter: FrameworkAdapter = (
  url: URL,
  request: Request,
) => {
  let resolveHandler: (response: Response) => void

  const responsePromise = new Promise((resolve) => {
    resolveHandler = resolve
  })

  return {
    handlerReturn: responsePromise,
    update: request.json(),
    end: () => resolveHandler(new Response()),
    respond: (json: string) =>
      resolveHandler(
        new Response(json, {
          headers: {
            'content-type': 'application/json',
          },
        }),
      ),
  }
}

export const isGroupChat = (
  chat: Chat,
): chat is Chat.GroupChat | Chat.SupergroupChat => {
  return chat.type === 'group' || chat.type === 'supergroup'
}
