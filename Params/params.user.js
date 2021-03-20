const User = require("../Models/User");

const params = {
  user_id: "user_id",
  email: "email",
};

const getUserIdParam = (req, res, next, user_id) => {
  User.findOne({ where: { user_id } }).then((user) => {
    if (user) {
      req.user = user;
      return next();
    }
    return res.send({ message: "user not found" });
  });
};

const getUserEmailParam = (req, res, next, email) => {
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      req.user = user;
      return next();
    }
    return res.send({ message: "user not found" });
  });
};

module.exports = {
  methods: {
    getUserIdParam,
    getUserEmailParam,
  },
  params,
};
