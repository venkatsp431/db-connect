import express from "express";
import {
  addlearner,
  deletelearner,
  editlearner,
  getAllStudents,
  getAllStudentsById,
} from "../Controllers/learners.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const learners = await getAllStudents(req);
    if (learners.length <= 0) {
      res.status(400).json({ data: "No data found" });
      return;
    }
    res.status(200).json({ data: learners });
  } catch (error) {
    res.status(500).json({ data: "Internal Server Error" });
  }
});

router.get(":/id", async (req, res) => {
  try {
    const { id } = req.params;
    const learners = await getAllStudentsById(id);
    if (learners.length <= 0) {
      res.status(400).json({ data: "No data found" });
      return;
    }
    res.status(200).json({ data: learners });
  } catch (error) {
    res.status(500).json({ data: "Internal Server Error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newLearner = req.body;
    if (!newLearner)
      return res.status(400).json({ data: "No details entered" });
    const result = await addlearner(newLearner);
    res
      .status(200)
      .json({ data: { result: result, message: "Added Successfully" } });
  } catch (error) {
    res.status(500).json({ data: "Internal Server Error" });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedlearner = req.body;
    if (!id || !updatedlearner) {
      return res.status(400).json({ data: "Not valid" });
    }
    const result = await editlearner(id, updatedlearner);
    res.status(200).json({ data: { result: result, message: "Edited" } });
  } catch (error) {
    res.status(500).json({ data: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ data: "Invalid data" });
    const result = await deletelearner(id);
    res.status(200).json({ data: { result: result, message: "Deleted" } });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }
});

export const learnerRouter = router;
//sRUiN6ccbZRBehLG
