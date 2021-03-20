const Company = require("../Models/Company");
const User = require("../Models/User");
const Sequelize = require("sequelize");

const get = (req, res) => {
  const user_id = req.body.user_id;
  Company.findOne({ user_id }).then((company) => {
    res.send(...company);
  });
};

const update = async (req, res) => {
  const user_id = req.body.user_id;
  const data = { ...req.body };
  const company = await Company.findOne({ user_id });
  company.updateInfo(data);
  await company.save();
  res.send(company);
};

const updateConnection = async (req, res) => {
  const user_id = req.body.user_id;
  const data = { ...req.body };
  const company = await Company.findOne({ user_id });
  company.updateConnection(data);
  await company.save();
  res.send(company);
};

const setUsertoCompany = (req, res) => {
  const userData = req.body.company_user;
  const user = req.user;
  User.create({
    title: userData.title,
    email: userData.email,
    department: userData.department,
    name: userData.username,
    company_id: user.company_id,
    admin: false,
    email_verification: false,
  })
    .then(async (company_user) => {
      await company_user.save();
      res.status(201).send({
        message: "registeration successful",
        company_user: company_user.toJSON(),
        user: user.toJSON(),
      });
    })
    .catch((error) => {
      res.status(400).send({ message: "user already exist" });
    });
};

const sendCompanyUsers = (req, res) => {
  return res.send(req.users);
};

const disableCompanyUsers = async (req, res) => {
  const email = req.body.company_user.email;
  User.findOne({ where: { email } }).then(async (user) => {
    user.disabled = true;
    await user.save();
    return res.send({ message: "User was deleted" });
  });
};

const updateCompanyUsers = async (req, res) => {
  const user = req.user;
  const company_user = req.company_user;
  const info = req.body.company_user;
  company_user.update({ ...info, name:info.username });
  await company_user.save();
  res.send({ company_user: company_user.toJSON() });
};

const testConnection = (req, res) => {
  const database = req.body;
  if (database.connection_string) {
  } else {
    console.log("database", database);
    try {
      new Sequelize(
        database.database_name,
        database.connection_username,
        database.connection_password,
        {
          host: database.connection_host,
          dialect: database.database_type,
          pool: {
            max: 5,
            min: 0,
            idle: 10000,
          },
          dialectOptions: {
            trustedConnection: true,
            encrypt: true,
          },
        }
      )
        .sync()
        .then(() => {
          res.send({
            message: "Connection has been established successfully.",
          });
        })
        .catch((error) => {
          res.send({ message: error });
        });
    } catch (error) {
      console.log("BEGGED", error);
    }
  }
};

module.exports = {
  get,
  update,
  updateConnection,
  setUsertoCompany,
  sendCompanyUsers,
  disableCompanyUsers,
  updateCompanyUsers,
  testConnection,
};
