const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");

//loading env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
const user = require("./routes/user");
const auth = require("./routes/auth");
const note = require("./routes/note");
const transaction = require("./routes/transaction");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

//mount routers
app.use("/api/users", user);
app.use("/api/users/auth", auth);
app.use("/api/note", note);
app.use("/api/transaction", transaction);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";
const server = app.listen(
  PORT,
  console.log(`Server is running in http://${HOST}:PORT ${PORT}`)
);

//handling the unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //closing the server
  server.close(() => process.exit(1));
});
