require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./helpers/logger");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");
// const adminApiRouter = require("./routes/adminApi");

const app = express();

// body parser middleware
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS middleware
app.use(cors());

// morgan middleware
morgan.token("host", (req) => {
	return req.hostname;
});
app.use(
	morgan(
		":host :method :url :status :res[content-length] - :response-time ms",
	),
);

// setup Access-Control-Allow-Origin
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/", apiRouter);
// app.use("/admin/api/", adminApiRouter);

const port = process.env.PORT || 5000;

/**
 *	Server bootup section
 **/
try {
	// DB Connect
	mongoose.connect(
		`${process.env.MONGO_URI}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
		},
		(d) => {
			if (d)
				return logger.info(
					`ERROR CONNECTING TO DB ${process.env.MONGO_URI}`,
					d,
				);
			logger.info(`Connected to database: `, `${process.env.MONGO_URI}`);
			app.listen(port, function () {
				logger.info(`Server started on port ${port}`);
			});
		},
	);
} catch (err) {
	logger.info("DBCONNECT ERROR", err);
}
