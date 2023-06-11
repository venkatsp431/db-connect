import { MongoClient } from "mongodb";
import Obj from "mongodb";

const MongoURL =
  "mongodb+srv://venki31:venki31@cluster0.invs0pu.mongodb.net/?retryWrites=true&w=majority";

async function createConnection() {
  const client = new MongoClient(MongoURL);
  await client.connect();
  console.log("Success");
  return client;
}
export var ObjectId = Obj.ObjectId;
export { createConnection };
