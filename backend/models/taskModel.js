const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    statusChangeRequest: {
      requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      newStatus: {
        type: String,
      },
      approved: {
        type: Boolean,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
