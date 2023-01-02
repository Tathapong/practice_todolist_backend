const express = require("express");
const router = express.Router();
const todolistController = require("../controllers/todolistController");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", authMiddleware, todolistController.getTodolist);
router.post("/", todolistController.createTodo);
router.delete("/", todolistController.removeTodo);
router.put("/", todolistController.updateTodo);
module.exports = router;
