const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

const { checkEmpty, checkMinLength, checkEmail } = require("../utilities/validatorInput");
const sharedData = require("../utilities/shared");

exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // Validation
    //* username
    if (checkEmpty(username)) return res.status(400).send({ message: "Please input username" });
    //* password
    if (checkEmpty(password)) return res.status(400).send({ message: "Please input password" });
    else if (!checkMinLength(password, 8))
      return res.status(400).json({ message: "Please input password with more 8 characters" });
    //* email
    if (checkEmpty(email)) return res.status(400).send({ message: "Please input email" });
    else if (!checkEmail(email)) return res.status(400).send({ message: "Please input email in E-mail form" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    await db.User.create({ username, password: hashedPassword, email });
    return res.status(201).json({ message: "Create completed" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Validation
    //* username
    if (checkEmpty(username)) return res.status(400).send({ message: "Please input username" });
    //* password
    if (checkEmpty(password)) return res.status(400).send({ message: "Please input password" });

    // Query a data from User
    const user = await db.User.findOne({ where: { username }, raw: true });

    // Check existing of user
    if (!user) return res.json({ login: false, message: "Not found username in database" });

    // Check password with Hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Check correction of password
    if (!isPasswordMatch) return res.json({ login: false, message: "Wrong password" });

    // Generate token and response
    const payload = { userId: user.id, username: user.username, email: user.email };
    const token = jwt.sign(payload, sharedData.secretKey, { expiresIn: sharedData.maxAge });
    return res.status(200).json({ login: true, message: "Login completed", token, userId: user.id });
  } catch (err) {
    next(err);
  }
};

exports.username = async (req, res, next) => {
  const usernameList = (await db.User.findAll({ attributes: ["username"], raw: true })).map((item) => item.username);
  return res.status(200).json({ usernameList });
};

exports.email = async (req, res, next) => {
  const emailList = (await db.User.findAll({ attributes: ["email"], raw: true })).map((item) => item.email);
  return res.status(200).json({ emailList });
};

exports.checkToken = async (req, res, next) => {
  try {
    const token = req.body.todo_token;
    const payload = jwt.verify(token, sharedData.secretKey);
    return res.status(202).send({ verify: true, userId: payload.userId });
  } catch (err) {
    next(err);
    return res.send({ verify: false, userId: undefined });
  }
};
