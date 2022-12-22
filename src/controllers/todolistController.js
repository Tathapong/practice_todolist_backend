const db = require("../models/index");
exports.getTodolist = async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const todolist = await db.Todolist.findAll({ where: { userId: id }, raw: true });
    res.send({ todolist: todolist });
  }
};

exports.createTodolist = async (req, res, next) => {
  const { title, completed: c, user_id } = req.body;
  const completed = c === "false" ? false : true;
  await db.Todolist.create({ title, completed, userId: user_id });
};
