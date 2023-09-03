const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan("tiny"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
