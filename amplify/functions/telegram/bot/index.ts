import { Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";

export function createBot(token: string): Telegraf<Scenes.SceneContext> {
  const bot = new Telegraf<Scenes.SceneContext>(token);

  setCommandsMenu(bot);
  addStart(bot);

  bot.help((ctx) => ctx.reply('Send me a sticker'));
  bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));

  return bot;
}

function setCommandsMenu(bot: Telegraf<Scenes.SceneContext>) {
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

function addStart(bot: Telegraf<Scenes.SceneContext>) {
  bot.start((ctx) => {
    const userId = ctx.from.id;
    const language = ctx.from.language_code;

    return ctx.reply(`Welcome ${ctx.from.first_name} ${ctx.from.last_name}, nice to meet you`);
  });
}

const searchScene = new Scenes.BaseScene<Scenes.SceneContext>('search');
searchScene.enter((ctx) => ctx.reply('What are you looking for?'));
searchScene.on(message('text'), async (ctx) => {
  const search = ctx.message.text;

  if (!search || search.length < 3) {
    return ctx.reply('The search phrase must be 3 characters or more');
  }


});
searchScene.on('message', (ctx) => ctx.reply('I\'ve never heard of manga titles without text!'));

function addSearch(bot: Telegraf<Scenes.SceneContext>) {
  bot.command('search', (ctx) => ctx.scene.enter('search'));
}
