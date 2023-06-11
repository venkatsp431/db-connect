import express from "express";
import { learnerRouter } from "./Routers/learners.js";
import dotenv from "dotenv";

//initiating server
const app = express();

dotenv.config();

const PORT = process.env.PORT;
//middleware
app.use(express.json());
app.use("/learners", learnerRouter);
//starting server
app.listen(PORT, () => console.log("Working yay"));
