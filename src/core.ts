import dotenv from "dotenv";
import Telegraf from "telegraf";
const LocalSession = require("telegraf-session-local");
const {
  generateUpdateMiddleware,
} = require("telegraf-middleware-console-time");

//Config
dotenv.config();
const TELEGRAF_TOKEN = process.env.BOT_TOKEN || "";
const bot = new Telegraf(TELEGRAF_TOKEN);

//Scenes

//Middlewares
import checkAccess from "./middlewares/checkAccess";
import LogUserConnection from "./middlewares/LogUserConnection";
bot.use(new LocalSession({ database: "session.json" }).middleware());
if (process.env.NODE_ENV !== "PROD") {
  bot.use(generateUpdateMiddleware());
}

import Login from "./commands/login";
bot.use(Login.middleware());

bot.use(checkAccess);
bot.use(LogUserConnection);

export default bot;
