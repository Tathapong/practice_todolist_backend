const express = require("express");
const router = express.Router();
const todolistController = require("../controllers/todolistController");

router.get("/:id", todolistController.getTodolist);
router.post("/:id", todolistController.createTodolist);
module.exports = router;
