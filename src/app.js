require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const todoRoute = require("./routes/todoRoute");
const authenticateMiddleware = require("./middlewares/authenticate");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/todos", authenticateMiddleware, todoRoute);

app.use((err, req, res, next) => {
  console.log(err);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("server running on port " + port));
