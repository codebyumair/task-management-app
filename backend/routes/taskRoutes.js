const express = require("express");
const {
  getTask,
  createTask,

  deleteTask,
  requestStatusChange,
  approvedStatusChange,
} = require("../controllers/taskController");

const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(authenticate, getTask);
router.route("/create").post(authenticate, createTask);

router.post(
  "/request-status-change/:taskId",
  authenticate,
  requestStatusChange
);
router.put(
  "/approve-status-change/:taskId",
  authenticate,
  approvedStatusChange
);

router.route("/:id").delete(authenticate, deleteTask);

module.exports = router;
