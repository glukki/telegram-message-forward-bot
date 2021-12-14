export {}

export interface Env {
  LOGS: KVNamespace
  MUTE: KVNamespace
  HOOK_PATH: string
  TELEGRAM_API_TOKEN: string
  FORWARD_TO_CHAT_ID: string
}
