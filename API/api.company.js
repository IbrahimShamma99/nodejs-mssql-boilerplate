const router = require("express").Router();
const controlers = require("../Controlers/controlers.company");
const userUtils = require("../Utils/utils.user");
const utils = require("../Utils/utils.company");
const { validate } = require("../Utils/utils");
const { Routes } = require("../routes/routes.company");

router.get(Routes.base, controlers.get);

router.put(Routes.base, controlers.update);
router.post(Routes.db, controlers.updateConnection);

//SECTION User to company
router.post(Routes.users, userUtils.findUserById, controlers.setUsertoCompany);
router.get(
  Routes.users,
  utils.findCompanyUsersQueryId,
  controlers.sendCompanyUsers
);
router.delete(
  Routes.users,
  (req, res, next) =>
    validate(req, res, next, ["user_id", "company_user", "company_user.email"]),
  controlers.disableCompanyUsers
);
router.put(
  Routes.users,
  userUtils.findUserById,
  utils.findCompanyUserById,
  controlers.updateCompanyUsers
);

//SECTION
router.post(Routes.testDB, controlers.testConnection);

module.exports = router;
