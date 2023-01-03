const db = require("../models/index");
const { checkEmpty } = require("../utilities/validatorInput");

exports.getAllTodo = async (req, res, next) => {};

exports.getTodoById = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (checkEmpty(userId)) return res.status(404).send({ message: "No have userId" });
    const todolist = await db.Todolist.findAll({ where: { userId }, raw: true });
    return res.status(200).send({ todolist: todolist });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "You are unauthenticated" });
  } catch (err) {
    next(err);
  }

  // try {
  //   const { title, userId } = req.body;
  //   if (checkEmpty(title)) return res.status(400).send({ message: "Please input title" });
  //   if (!userId) return res.status(400).send({ message: "No have userId" });
  //   const result = await db.Todolist.create({ title, completed: false, userId });
  //   return res.send({ todo: result.toJSON() });
  // } catch (err) {
  //   next(err);
  // }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (checkEmpty(id)) return res.status(400).send({ message: "Please input id of todolist" });
    await db.Todolist.destroy({ where: { id }, raw: true });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const {
      id,
      newValue: { title, completed }
    } = req.body;
    if (checkEmpty(id)) return res.status(400).send({ message: "Please input id of todolist" });
    if (checkEmpty(title)) return res.status(400).send({ message: "Please input title" });
    await db.Todolist.update({ title, completed }, { where: { id } });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
