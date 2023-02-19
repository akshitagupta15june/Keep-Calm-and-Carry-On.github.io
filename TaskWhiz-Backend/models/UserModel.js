const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
			default: null,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
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
	{ timestamps: true, versionKey: false, collection: "users" },
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
