const User = require("../Models/User");
const secret = require("../config/appConfig").secret;
const jwt = require("jsonwebtoken");
const messages = require("../Messages/message.user");

const findUserById = (req, res, next) => {
  const user_id = req.body.user_id;
  User.findOne({ where: { user_id } }).then((user) => {
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).send(messages.notFound);
    }
  });
};
const findUserByEmail = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).send(messages.notFound);
    }
  });
};

const findUserByQueryEmail = (req, res, next) => {
  const email = req.query.email;
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).send(messages.notFound);
    }
  });
};
const findUserByQueryId = (req, res, next) => {
  const user_id = +req.query.user_id;
  User.findOne({ where: { user_id } }).then((user) => {
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).send(messages.notFound);
    }
  });
};

const authenticatePassword = (req, res, next) => {
  const user = req.user;
  const password = req.body.password;
  if (user.authenticate(password)) {
    return next();
  } else {
    res.status(401).send(messages.wrongPassword);
  }
};

const checkEmailVerification = (req, res, next) => {
  const user = req.user;
  if (user.email_verification) {
    return next();
  }
  res.send(messages.verify);
};

const verifyEmail = (req, res, next) => {
  const user = req.user;
  user.email_verification = true;
  return next();
};
const authenticateToken = (req, res, next) => {
  const user = req.user;
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, (err, tokenInfo) => {
    if (tokenInfo.name === user.name) {
      return next();
    }
    return res.sendStatus(403);
  });
};

const checkEmailExistance = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      return next();
    }
    return res.send(messages.exists);
  });
};

const checkIfDisabled = (req, res, next) => {
  const user = req.user;
  if (user.disabled) {
    return res.send(messages.disabled);
  } else {
    return next();
  }
};

module.exports = {
  checkEmailExistance,
  findUserById,
  findUserByEmail,
  findUserByQueryEmail,
  findUserByQueryId,
  authenticatePassword,
  checkEmailVerification,
  verifyEmail,
  authenticateToken,
  checkIfDisabled,
};
