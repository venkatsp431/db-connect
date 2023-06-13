import express from "express";
import { addUser, generatejwttoken, getUser } from "../Controllers/users.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const user = await getUser(req.body.email);
  if (!user) {
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedUser = await { ...req.body, password: hashedPassword };
    const result = await addUser(hashedUser);
    return res.status(200).json({ result, data: "Added Successfull" });
  }

  res.status(400).json({ data: "User already found" });
});

router.post("/login", async (req, res) => {
  try {
    const loginUser = await getUser(req.body.email);
    if (!loginUser) {
      return res.status(404).json({ data: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!validPassword) {
      return res.status(400).json({ data: "Invalid Password.Try Again" });
    }
    const token = generatejwttoken(loginUser._id);
    res.status(200).json({
      data: {
        message: "Successfully LOgged in",
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ data: "InternalServer Eroor" });
  }
});

export const userRouter = router;
