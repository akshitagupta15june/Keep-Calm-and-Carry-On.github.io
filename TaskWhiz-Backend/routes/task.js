const express = require("express");
const taskController = require("../controllers/taskController.js");

const router = express.Router();

// Register a User
router.post("/addTask", taskController.addTask);

router.post("/getTask", taskController.getTasks);

router.post("/markComplete", taskController.markComplete);

module.exports = router;
