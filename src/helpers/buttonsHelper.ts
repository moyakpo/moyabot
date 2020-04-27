//const Markup = require("telegraf/markup");
//const Extra = require("telegraf/Extra");
import Button from "../models/button";
import { Markup, Extra } from "telegraf";

function YesNoButtons() {
  const buttons = [
    Markup.callbackButton("SI", "responseYES"),
    Markup.callbackButton("NO", "responseNO"),
  ];
  return Extra.HTML().markup((m: any) =>
    m.inlineKeyboard(buttons, { columns: 2 })
  );
}

function ButtonsArray(arr: Array<Button>) {
  let arrb = arr;
  const buttons = arrb.map((m) => Markup.callbackButton(m.text, m.value));
  return Extra.HTML().markup((m: any) =>
    m.inlineKeyboard(buttons, { columns: 2 })
  );
}

export { YesNoButtons, ButtonsArray };
