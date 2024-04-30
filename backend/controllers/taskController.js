const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

const getTask = asyncHandler(async (req, res) => {
  let tasks;
  if (req.user.isAdmin) {
    tasks = await Task.find().sort({ createdAt: -1 });
  } else {
    tasks = await Task.find({ assignedTo: req.user._id }).sort({
      createdAt: -1,
    });
  }
  res.status(200).json({ tasks: tasks, isAdmin: req.user.isAdmin });
});

const createTask = asyncHandler(async (req, res) => {
  if (!req.body.taskName || !req.body.assignedTo || !req.body.status) {
    res.status(400);
    throw new Error("Please provide task name, assigned user, and status");
  }

  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("Only admin can create tasks");
  }

  const task = await Task.create({
    taskName: req.body.taskName,
    assignedTo: req.body.assignedTo,
    status: req.body.status,
  });

  res.status(201).json(task);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error("Only admin can delete tasks");
  }

  await task.deleteOne();

  res.status(200).json({ message: "Task deleted successfully" });
});
const requestStatusChange = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { newStatus } = req.body;
  const userId = req.user._id;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  if (task.assignedTo.toString() !== userId.toString()) {
    res.status(403).json({ message: "You are not assigned to this task" });
    return;
  }

  task.statusChangeRequest = {
    requestedBy: userId,
    newStatus,
  };

  await task.save();

  res.status(200).json({ message: "Status change request submitted" });
});

const approvedStatusChange = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { approved } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  if (!task.statusChangeRequest || !task.statusChangeRequest.requestedBy) {
    res
      .status(400)
      .json({ message: "No status change request found for this task" });
    return;
  }

  if (!approved) {
    await Task.findByIdAndUpdate(taskId, {
      $unset: { statusChangeRequest: "" },
    });
    await task.save();
    res.status(200).json({ message: "Status change request rejected" });
  } else {
    task.status = task.statusChangeRequest.newStatus;
    await Task.findByIdAndUpdate(taskId, {
      $set: {
        status: task.statusChangeRequest.newStatus,
        "statusChange.approved": true,
      },
      $unset: {
        statusChangeRequest: "",
      },
    });
    await task.save();
    res.status(200).json({ message: "Status change request approved" });
  }
});

module.exports = {
  getTask,
  createTask,
  deleteTask,
  requestStatusChange,
  approvedStatusChange,
};
