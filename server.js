require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/studyrooms";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Timetable Schema
const timetableSchema = new mongoose.Schema({
  day: String,
  time: String,
  subject: String,
  task: String,
  completed: Boolean,
});

const Timetable = mongoose.model("Timetable", timetableSchema);

// API Routes

// Authentication Routes
app.use("/api/auth", authRoutes);

// Timetable Routes

// 1. Add Task
app.post("/api/timetable", async (req, res) => {
  try {
    const newTask = new Timetable(req.body);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding task" });
  }
});

// 2. Get Tasks
app.get("/api/timetable", async (req, res) => {
  try {
    const tasks = await Timetable.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// 3. Update Task
app.put("/api/timetable/:id", async (req, res) => {
  try {
    const updatedTask = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// 4. Delete Task
app.delete("/api/timetable/:id", async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

// 5. Pending Alert
app.get("/api/timetable/pending", async (req, res) => {
  try {
    const pendingTasks = await Timetable.find({ completed: false });
    res.json(pendingTasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending tasks" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

