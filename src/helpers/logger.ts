const Logger = require("simple-node-logger").createSimpleLogger(
  process.env.LOGER_FILE
);
Logger.setLevel(process.env.LOGGER_LEVEL);
console.log("por aca pasó");
const log = Logger;

export default log;
