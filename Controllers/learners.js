import { ObjectId } from "bson";
import { createConnection } from "../db.js";

const client = await createConnection();
export function getAllStudents(req) {
  return client.db("b45").collection("learners").find(req.query).toArray();
}
export function getAllStudentsById(id) {
  return client
    .db("b45")
    .collection("learners")
    .findOne({ _id: new ObjectId(id) });
}
export function addlearner(newlearner) {
  return client.db("b45").collection("learners").insertOne(newlearner);
}

export function editlearner(id, updatedlearner) {
  return client
    .db("b45")
    .collection("learners")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedlearner });
}

export function deletelearner(id) {
  return client
    .db("b45")
    .collection("learners")
    .deleteOne({ _id: new ObjectId(id) });
}
