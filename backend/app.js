const express = require("express");
const app = express();
const cors = require("cors");
const { NotFound, errorHandler } = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/db");
const userRouter = require("./routes/userRoutes");

// Module middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Handling errors
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/.env",
  });
}

dbConnection();

// routes for production
app.use("/api/users", userRouter);

// Errors handling middlewares
app.use(NotFound);
app.use(errorHandler);
module.exports = app;
