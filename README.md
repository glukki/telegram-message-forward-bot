# telegram-message-forward-bot

This bot will forward messages from 1-on-1 chat into an "inbox" group chat.

### Setup

Make a `wrangler.toml` file after the `wrangler.example.toml` and define variables:

- `HOOK_PATH` - webhook path, that Telegram server will call
- `TELEGRAM_API_TOKEN` - Telegram Bot API token
- `FORWARD_TO_CHAT_ID` - "inbox" chat ID

### Development

Run `wrangler dev`

### Deployment

Run `wrangler publish`
