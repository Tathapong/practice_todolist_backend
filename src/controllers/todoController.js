const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { checkEmpty } = require("../utilities/validatorInput");

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await db.Todolist.findAll({
      where: { userId: req.user.id },
      order: [["created_at", "DESC"]],
      raw: true,
      attributes: ["id", "title", "completed"]
    });
    return res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  // try {
  //   const { userId } = req.query;
  //   if (checkEmpty(userId)) return res.status(404).send({ message: "No have userId" });
  //   const todolist = await db.Todolist.findAll({ where: { userId }, raw: true });
  //   return res.status(200).send({ todolist: todolist });
  // } catch (err) {
  //   next(err);
  // }
};

exports.createTodo = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, completed } = req.body;

    // Validation
    if (checkEmpty(title)) return res.status(400).json({ message: "No have title" });

    // Create a todo
    const todo = await db.Todolist.create({ title, completed, userId: user.id });
    res.status(201).json({ todo: { id: todo.id, title: todo.title, completed: todo.completed } });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await db.Todolist.findOne({ where: { id } });
    if (!todo) return res.status(400).json({ message: "todo with this id does not exists" });

    if (todo.userId !== req.user.id) return res.status(400).json({ message: "Can not delete todo of other people" });

    await todo.destroy();
    res.status(200).json({ message: "success delete" });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (checkEmpty(id)) return res.status(400).send({ message: "Please input id of todolist" });
    if (checkEmpty(title)) return res.status(400).send({ message: "Please input title" });
    await db.Todolist.update({ title, completed }, { where: { id } });
    return res.status(204).json({ message: "success update" });
  } catch (err) {
    next(err);
  }
};
