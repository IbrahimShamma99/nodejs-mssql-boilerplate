const User = require("../Models/User");
const Company = require("../Models/Company");

const get = (req, res) => {
  const user = req.user;
  res.send({ user });
};

const register = async (req, res) => {
  Company.create({
    company_name: req.body.company_name,
  }).then((company) => {
    User.create({
      email: req.body.email,
      title: req.body.title,
      department: req.body.department,
      name: req.body.username,
      company_id: company.company_id,
      admin: true,
      email_verification: false,
    })
      .then(async (user) => {
        user.setPassword(req.body.password);
        await user.save();
        res
          .status(201)
          .send({ message: "registeration successful verify you email" });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  });
};

const login = async (req, res) => {
  const user = req.user;
  const company = req.company;
  user.updateRecord();
  await user.save();
  return res.send({ user: user.toAuthJSON(), company: company.toJSON() });
};

const forgetPassword = async (req, res) => {
  const user = req.user;
  if (user.reset) {
    return res.status(401).send({ message: "you have already set the email" });
  }
  user.reset = true;
  user.sendResetPassword();
  await user.save();
  return res.send({ message: "sent went successfully check your email" });
};

const setNewPassword = async (req, res) => {
  const user = req.user;
  const password = req.body.password;
  user.reset = false;
  user.setPassword(password);
  await user.save();
  return res.send({ message: "setting new password went successfully" });
};

const finalizeEmailVerification = async (req, res) => {
  const user = req.user;
  await user.save();
  res.status(301).redirect("https://performit.ai/login?auto=true");
};

const logout = (req, res) => {
  //const user = req.user; # NOTE in case of tracking
  res.send({ message: "logout successful" });
};

const updateProfile = async (req, res) => {
  const user = req.user;
  user.update({ ...req.body, name: req.body.username });
  await user.save();
  res.send({ ...user.toAuthJSON() });
};

module.exports = {
  register,
  login,
  forgetPassword,
  setNewPassword,
  finalizeEmailVerification,
  get,
  logout,
  updateProfile,
};
