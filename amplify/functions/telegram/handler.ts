import type { APIGatewayProxyHandler } from "aws-lambda";

import { createBot } from './bot';

const bot = createBot(process.env.TELEGRAM_TOKEN as string);

export const handler: APIGatewayProxyHandler = async (event) => {
  const { body } = event;
  const data = JSON.parse(body as string);

  await bot.handleUpdate(data);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
