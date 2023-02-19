const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const TasksSchema = new Schema(
	{
		user_id: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: "Users",
		},
		title: {
			type: String,
			required: true,
		},
		is_completed: {
			type: Boolean,
			required: true,
			default: false,
		},
		date: {
			type: Date,
			required: true,
			default: Date.now(),
		},
		is_deleted: {
			type: Boolean,
			required: true,
			default: false,
		},
		is_active: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{ timestamps: true, versionKey: false, collection: "task" },
);

const TasksModel = mongoose.model("Tasks", TasksSchema);

module.exports = TasksModel;
