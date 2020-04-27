import lowdb from "lowdb";
import { v4 } from "uuid";
import FileAsync from "lowdb/adapters/FileAsync";

let db: lowdb.LowdbAsync<any>;

async function CreateConecion() {
  const DBFile = process.env.JSON_FILE || "";
  const adapter = new FileAsync(DBFile);
  db = await lowdb(adapter);
  db.defaults({ users: [], operations: [], currentOperations: [] }).write();
}

const GetConnection = () => db;

async function add(record: any, data: string) {
  const listData = await db.get(data).value();
  record.id = v4();
  listData.push(record);
  await db.set(data, listData).write();
  return record;
}

async function find(value: any, data: string) {}

export default { CreateConecion, GetConnection, add };
