const apiResponse = require("../helpers/apiResponse");
const UserModel = require("../models/UserModel");
const { check, validationResult } = require("express-validator");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

module.exports = {
	// sendOTP
	sendOTP: (req, res) => {
		try {
			client.verify
				.services(process.env.TWILIO_SERVICE_SID)
				.verifications.create({
					to: `${req.body.phone}`,
					channel: req.body.channel ? req.body.channel : "sms",
				})
				.then((data) => {
					res.status(200).send({
						message: `Verification code sent to ${req.body.phone}`,
						phoneNumber: req.body.phone,
						data,
					});
				})
				.catch((err) => {
					res.status(400).send({
						message: `Error sending verification code to ${req.body.phone}`,
						phoneNumber: req.body.phone,
						data: err,
					});
				});
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},

	// verifyOTP
	verifyOTP: (req, res) => {
		try {
			client.verify
				.services(process.env.TWILIO_SERVICE_SID)
				.verificationChecks.create({
					to: `+${req.body.phone}`,
					code: req.body.code,
				})
				.then((data) => {
					if (data.status == "approved") {
						return res.status(200).send({
							message: "User verified",
							data,
						});
					}

					return res.status(400).send({
						message: "Invalid code",
						data,
					});
				});
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},

	// signup
	signup: [
		check("username")
			.not()
			.isEmpty()
			.withMessage("Username is required")
			.isLength({ min: 5 })
			.withMessage("Username must be at least 5 characters long"),
		check("email")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email must be a valid format"),
		// check("password")
		// 	.not()
		// 	.isEmpty()
		// 	.withMessage("Password is required")
		// 	.isLength({ min: 8 })
		// 	.withMessage("Password must be at least 8 characters long"),
		check("phone")
			.not()
			.isEmpty()
			.withMessage("Phone is required")
			.isMobilePhone()
			.withMessage("Phone must be a valid format"),
		async (req, res) => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return apiResponse.validationErrorWithData(
						res,
						"Validation Error",
						errors.array(),
					);
				}

				try {
					// save user to database
					let newUser = await UserModel({
						username: req.body.username,
						email: req.body.email,
						password: req.body.password,
						phone: req.body.phone,
					}).save();

					if (newUser) {
						return apiResponse.successResponseWithData(
							res,
							"User created successfully",
							newUser,
						);
					}
				} catch (error) {
					return apiResponse.validationError(
						res,
						"Please use a different email or phone number or username",
					);
				}
			} catch (error) {
				console.log(error.message);
				return apiResponse.ErrorResponse(res, error);
			}
		},
	],
};
