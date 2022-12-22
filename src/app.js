const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const todolistRoute = require("./routes/todolistRoute");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/todolist", todolistRoute);

app.listen(8080, () => console.log("server running on port 8080"));
