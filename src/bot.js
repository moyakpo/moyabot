import core from "./core";
import database from "./DB/database";
import log from './helpers/logger'

console.clear()
database.CreateConecion();
log.info('Iniciando BOT')

const bot = core;

bot.catch((err, ctx) => {
  console.log("Ups! Error en:", ctx.updateType, err);
});

bot.on("text", (ctx, next) => {
  ctx.session.counter = ctx.session.counter || 0;
  ctx.session.counter++;
  ctx.replyWithMarkdown(
    `Counter actualizado, nuevo valor: \`${ctx.session.counter}\``
  );
});

console.log("Iniciando BOT");
bot.launch();
