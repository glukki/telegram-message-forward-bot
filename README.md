# telegram-message-forward-bot

This bot will forward messages from 1-on-1 chat into an "inbox" group chat.

### The interaction flow

When user sends a message to the bot, without any known command in it:

- bot forwards message to the "Inbox" chat/channel with a link to the sender, and a mute button

When mute button hit:

- bot replaces the mute button with a confirmation request

When mute confirmation button hit:

- bot mutes sender for 24 hours
- bot updates sent message with the mute action timestamp
- bot replaces mute button with an unmute button

When unmute button hit:

- bot replaces the unmute button with a confirmation prompt

When unmute confirmation button hit:

- bot unmutes sender
- bot updates sent message with the unmute action timestamp
- bot replaces unmute button with a mute button

### Setup

Make a `wrangler.toml` file after the `wrangler.example.toml` and define variables:

- `HOOK_PATH` - webhook path, that Telegram server will call
- `TELEGRAM_API_TOKEN` - Telegram Bot API token
- `FORWARD_TO_CHAT_ID` - "inbox" chat ID

### Development

Run `wrangler dev`

### Deployment

Run `wrangler publish`
