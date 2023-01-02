const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const todolistRoute = require("./routes/todolistRoute");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/cookie", (req, res, next) => {
  res.cookie("name", "Tathaponog");
});

app.use("/auth", authRoute);
app.use("/todolist", todolistRoute);

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(8080, () => console.log("server running on port 8080"));
