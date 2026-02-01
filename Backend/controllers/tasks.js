const Task = require('../models/TaskModel');

// CREATE Task
exports.createTask = async (req, res) => {
    try {
        const { userId, title, description } = req.body;

        if (!userId || !title) {
            return res.status(400).json({ msg: "User ID and Title are required." });
        }

        const newTask = new Task({ userId, title, description });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task." });
    }
};

// GET All Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks." });
    }
};

// UPDATE Task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ msg: "Task not found" });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Failed to update task." });
    }
};

// DELETE Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ msg: "Task not found" });
        res.json({ msg: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task." });
    }
};