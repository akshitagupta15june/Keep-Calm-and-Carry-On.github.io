const express = require("express");
const authRouter = require("./auth");
const taskRouter = require("./task");

const app = express();

// Auth Routes
app.use("/auth/", authRouter);

// task Routes
app.use("/tasks/", taskRouter);

module.exports = app;
