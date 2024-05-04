import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  setCommandsMenu(bot);
  addStart(bot);

  bot.help((ctx) => ctx.reply('Send me a sticker'));
  bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));

  return bot;
}

function setCommandsMenu(bot: Telegraf) {
  bot.telegram.setMyCommands([
    {
      command: '/search',
      description: 'Search for a specific manga',
    },
    {
      command: '/list',
      description: 'List all tracked mangas',
    },
  ]);
}

function addStart(bot: Telegraf) {
  bot.start((ctx) => {
    const userId = ctx.from.id;
    const language = ctx.from.language_code;

    ctx.reply(`Welcome ${ctx.from.first_name} ${ctx.from.last_name}, nice to meet you`);
  });
}
