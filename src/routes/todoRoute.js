const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.route("/").get(todoController.getAllTodo).post(todoController.createTodo);
router.route("/:id").get(todoController.getTodoById).put(todoController.updateTodo).delete(todoController.deleteTodo);

module.exports = router;
