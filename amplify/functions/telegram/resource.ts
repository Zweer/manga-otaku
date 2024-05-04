import { defineFunction, secret } from "@aws-amplify/backend";

export const telegramFunction = defineFunction({
  name: "telegram",
  environment: {
    TELEGRAM_TOKEN: secret('TELEGRAM_TOKEN')
  },
});
