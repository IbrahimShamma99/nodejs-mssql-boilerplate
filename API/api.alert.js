const router = require("express").Router();
const controlers = require("../Controlers/controlers.alert");
const { Routes } = require("../routes/routes.alert");

router.post(Routes.base, controlers.set);
router.get(Routes.base, controlers.get);

module.exports = router;
