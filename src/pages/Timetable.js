import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/timetable";

const periodTimeMap = {
  "Period 1": "00:00", "Period 2": "01:00", "Period 3": "02:00", "Period 4": "03:00",
  "Period 5": "04:00", "Period 6": "05:00", "Period 7": "06:00", "Period 8": "07:00",
  "Period 9": "08:00", "Period 10": "09:00", "Period 11": "10:00", "Period 12": "11:00",
  "Period 13": "12:00", "Period 14": "13:00", "Period 15": "14:00", "Period 16": "15:00",
  "Period 17": "16:00", "Period 18": "17:00", "Period 19": "18:00", "Period 20": "19:00",
  "Period 21": "20:00", "Period 22": "21:00", "Period 23": "22:00", "Period 24": "23:00"
};

const periods = Object.keys(periodTimeMap);

const Timetable = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    day: "", time: "", subject: "", task: "", completed: false
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchTasks();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    tasks.forEach((task) => checkIfTimedOut(task));
  }, [tasks, currentTime]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTasks(data);
    } catch {
      toast.error("Error fetching tasks.");
    }
  };

  const addTask = async () => {
    if (!form.day || !form.time || !form.subject || !form.task) {
      return toast.warn("All fields are required!");
    }
    try {
      await axios.post(API_URL, form);
      toast.success("✅ Task added successfully!");
      setForm({ day: "", time: "", subject: "", task: "", completed: false });
      fetchTasks();
    } catch {
      toast.error("Error adding task.");
    }
  };

  const updateTask = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed });
      fetchTasks();
    } catch {
      toast.error("Error updating task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.info("🗑️ Task deleted.");
      fetchTasks();
    } catch {
      toast.error("Error deleting task.");
    }
  };

  const checkIfTimedOut = (task) => {
    if (task.completed || !task.time) return;

    const [taskHour, taskMinute] = task.time.split(":").map(Number);
    const taskTime = new Date(currentTime);
    taskTime.setHours(taskHour, taskMinute, 0, 0);

    const taskKey = `alerted-${task._id}`;
    if (currentTime > taskTime && !localStorage.getItem(taskKey)) {
      toast.warn(`⏰ Task "${task.task}" is overdue!`);
      localStorage.setItem(taskKey, "true"); // Prevent spamming
    }
  };

  const formatToAMPM = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = ((hour + 11) % 12) + 1;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📚 Study Room Timetable</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
          <option value="">Select Day</option>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>

        <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
          <option value="">Select Period</option>
          {periods.map((p) => (
            <option key={p} value={periodTimeMap[p]}>
              {p} ({formatToAMPM(periodTimeMap[p])})
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task"
          value={form.task}
          onChange={(e) => setForm({ ...form, task: e.target.value })}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "15px"
      }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: task.completed ? "#d4edda" : "#f8d7da",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <div><strong>{task.day}</strong> - {formatToAMPM(task.time)}</div>
            <div><em>{task.subject}</em></div>
            <div>{task.task}</div>
            <label style={{ display: "block", marginTop: "10px" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => updateTask(task._id, !task.completed)}
              /> Completed
            </label>
            <button onClick={() => deleteTask(task._id)} style={{ marginTop: "10px", color: "red" }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;




