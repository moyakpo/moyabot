import core from "../core";
let ChatId: number;
let Ingreso: String;
let Sucursal: string;
let Terminal: string;

function LoadModuale(chatId: number) {
  ChatId = chatId;
  core.telegram.sendMessage(ChatId, "Indicá la sucursal");
  Ingreso = "SUC";

  core.on("text", (ctx) => {
    let text = ctx.message?.text!;
    if (Ingreso == "SUC") {
      Sucursal = text;
      Ingreso = "TERMINAL";
    } else if (Ingreso == "TERMINAL") {
      Terminal = text;
      if (EsTerminalValida(Sucursal, Terminal))
        RebootTerminal(Sucursal, Terminal);
    }
  });
}

function EsTerminalValida(sucursal: String, terminal: string) {
  return true;
}

function RebootTerminal(sucursal: String, terminal: string) {
  return true;
}

export default LoadModuale;
