import { defineFunction, secret } from "@aws-amplify/backend";

export const telegramWebhookFunction = defineFunction({
  name: "telegram-webhook",
  environment: {
    TELEGRAM_TOKEN: secret('TELEGRAM_TOKEN')
  },
});
