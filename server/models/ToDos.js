const mongoose = require("mongoose");
const schema = mongoose.Schema;

// newTask Schema
const newTask = new schema({
  task: String,
  priorität: Number,
});

const Task = mongoose.model("Task", newTask);

module.exports = Task;
