const apiResponse = require("../helpers/apiResponse");
const UserModel = require("../models/UserModel");
const TaskModel = require("../models/TasksModel");
const { check, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

module.exports = {
	// addTask
	addTask: async (req, res) => {
		try {
			let task = await new TaskModel({
				title: req.body.title,
				user_id: req.body.user_id,
			}).save();

			return apiResponse.successResponseWithData(
				res,
				"Task added successfully",
				task,
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},

	getTasks: async (req, res) => {
		try {
			let tasks = await TaskModel.find({
				user_id: mongoose.Types.ObjectId(req.body.user_id),
			});

			return apiResponse.successResponseWithData(
				res,
				"Tasks fetched successfully",
				tasks,
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},

	markComplete: async (req, res) => {
		try {
			let task = await TaskModel.findOneAndUpdate(
				{
					_id: mongoose.Types.ObjectId(req.body.task_id),
				},
				{
					is_completed: true,
				},
				{
					new: true,
					upsert: true,
				},
			);

			return apiResponse.successResponseWithData(
				res,
				"Task marked as complete",
				task,
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},

	deleteTask: async (req, res) => {
		try {
			let task = await TaskModel.findOneAndDelete({
				_id: mongoose.Types.ObjectId(req.body.task_id),
			});

			if (!task)
				return apiResponse.validationError(res, "Task not found");

			return apiResponse.successResponseWithData(
				res,
				"Task deleted successfully",
				{
					status: 1,
					message: "Task deleted successfully",
				},
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},
};
