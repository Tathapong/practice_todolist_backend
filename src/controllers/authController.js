const validator = require("validator");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // Validation
    //* username
    if (username === undefined || validator.isEmpty(username.trim()))
      return res.status(400).send({ message: "Please input username" });
    //* password
    if (password === undefined || validator.isEmpty(password.trim()))
      return res.status(400).send({ message: "Please input password" });
    else if (password.trim().length < 8)
      return res.status(400).json({ message: "Please input password with more 8 characters" });
    //* email
    if (email === undefined || validator.isEmpty(email.trim()))
      return res.status(400).send({ message: "Please input email" });
    else if (!validator.isEmail(email.trim()))
      return res.status(400).send({ message: "Please input email in E-mail form" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    await db.User.create({ username, password: hashedPassword, email });
    return res.status(201).json({ message: "Create completed" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Validation
    //* username
    if (username === undefined || validator.isEmpty(username.trim()))
      return res.status(400).send({ message: "Please input username" });
    //* password
    if (password === undefined || validator.isEmpty(password.trim()))
      return res.status(400).send({ message: "Please input password" });

    // Query a data from User
    const user = await db.User.findOne({ where: { username }, raw: true });

    // Check existing of user
    if (!user) return res.status(404).json({ message: "Not found username in database" });

    // Check password with Hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Check correction of password
    if (!isPasswordMatch) return res.status(400).json({ message: "Wrong password" });

    // Generate token and response
    const payload = { id: user.id, username: user.username, email: user.email };
    const secretKey = "P@ssword";
    const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 2 });
    return res.status(200).json({ message: "Login completed", token });
  } catch (err) {
    console.log(err);
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
