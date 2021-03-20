const router = require("express").Router();
const controlers = require("../controlers/controlers.recent");
const utilityUserControlers = require("../Utils/utils.user");
const { Routes } = require("../routes/routes.recent");

router.post(
  Routes.base,
  utilityUserControlers.findUserById,
  utilityUserControlers.authenticateToken,
  controlers.set,
  controlers.get
);

router.get(
  Routes.base,
  utilityUserControlers.findUserByQueryId,
  utilityUserControlers.authenticateToken,
  controlers.get
);

router.delete(
  Routes.base,
  utilityUserControlers.findUserById,
  utilityUserControlers.authenticateToken,
  controlers.purge,
  controlers.get
);

module.exports = router;
