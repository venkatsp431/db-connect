import { createConnection } from "../db.js";
import jwt from "jsonwebtoken";

const client = await createConnection();

export function addUser(user) {
  return client.db("b45").collection("users").insertOne(user);
}

export function getUser(userEmail) {
  return client.db("b45").collection("users").findOne({ email: userEmail });
}

export function generatejwttoken(id) {
  return jwt.sign({ id }, process.env.SECRETKEY, { expiresIn: "30d" });
}
