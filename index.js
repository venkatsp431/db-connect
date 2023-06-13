import express from "express";
import { learnerRouter } from "./Routers/learners.js";
import dotenv from "dotenv";
import { userRouter } from "./Routers/users.js";
import { isAuthenticated } from "./Authentication/auth.js";
import cors from "cors";

//initiating server
const app = express();

dotenv.config();

const PORT = process.env.PORT;
//middleware
app.use(express.json());
app.use("/learners", isAuthenticated, learnerRouter);
app.use("/users", userRouter);
app.use(cors());
//starting server
app.listen(PORT, () => console.log("Working yay"));
