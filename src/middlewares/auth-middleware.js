module.exports = async (req, res, next) => {
  //   const token = req.query.token;
  //   console.log(token);
  console.log(req.cookies);
  next();
};
