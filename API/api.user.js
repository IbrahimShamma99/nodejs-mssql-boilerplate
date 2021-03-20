const router = require("express").Router();
const controlers = require("../controlers/controlers.user");
const utils = require("../Utils/utils.user");
const { validate, contactUS } = require("../Utils/utils");
const { params, methods } = require("../Params/params.user");
const { Routes } = require("../Routes/routes.user");

router.param(params.email, methods.getUserEmailParam);
router.param(params.user_id, methods.getUserIdParam);

router.get(Routes.userEmail, controlers.get);
router.get(Routes.userId, controlers.get);

//SECTION Register new user and company
router.post(
  Routes.register,
  (req, res, next) =>
    validate(req, res, next, ["email", "password", "username", "company_name"]),
  utils.checkEmailExistance,
  controlers.register
);

//SECTION login
router.post(
  Routes.login,
  (req, res, next) => validate(req, res, next, ["email", "password"]),
  utils.findUserByEmail,
  utils.authenticatePassword,
  utils.checkEmailVerification,
  utils.checkIfDisabled,
  controlers.login
);

//SECTION Update profile
router.put(Routes.user, utils.findUserById, controlers.updateProfile);

//SECTION set email for forgot password
router.post(
  Routes.forget,
  (req, res, next) => validate(req, res, next, ["email"]),
  utils.findUserByEmail,
  controlers.forgetPassword
);

//SECTION logout
router.post(Routes.logout, utils.findUserById, controlers.logout);

//SECTION set new password
router.post(Routes.password, utils.findUserById, controlers.setNewPassword);

//SECTION verify email
router.get(
  Routes.verify,
  utils.findUserByQueryId,
  utils.verifyEmail,
  controlers.finalizeEmailVerification
);

router.post(Routes.contactus, contactUS);

module.exports = router;
