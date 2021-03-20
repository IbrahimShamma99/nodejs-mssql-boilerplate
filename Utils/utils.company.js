const Company = require("../Models/Company");
const User = require("../Models/User");

const findUserCompany = (req, res, next) => {
  const user = req.user;
  Company.findOne({ where: { company_id: user.company_id } }).then(
    (company) => {
      req.company = company;
      return next();
    }
  );
};

const findCompanyUsers = (req, res, next) => {
  const company_id = req.body.company_id;
  User.findAll({ where: { company_id: company_id } }).then((users) => {
    req.users = users;
    return next();
  });
};

const findCompanyUsersQueryId = (req, res, next) => {
  const company_id = req.query.company_id;
  User.findAll({ where: { company_id: company_id } }).then((users) => {
    req.users = users;
    return next();
  });
};

const findCompanyUserByEmail = (req, res, next) => {
  User.findOne({ where: { email: req.body.company_user.email } }).then((user) => {
    if (user) {
      req.company_user = user;
      return next();
    }
    return res.send({ message: "company user not found" });
  });
};

const findCompanyUserById = (req, res, next) => {
  User.findOne({ where: { user_id: req.body.company_user.user_id } }).then((user) => {
    if (user) {
      req.company_user = user;
      return next();
    }
    return res.send({ message: "company user not found" });
  });
};

module.exports = {
  findUserCompany,
  findCompanyUsersQueryId,
  findCompanyUsers,
  findCompanyUserByEmail,
  findCompanyUserById,
};
