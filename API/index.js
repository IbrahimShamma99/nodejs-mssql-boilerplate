var router = require("express").Router();

router.use("/api", require("./api.user"));
router.use("/api", require("./api.recent"));
router.use("/api", require("./api.favorite"));
// router.use("/api", require("./api.alert"));
router.use("/api", require("./api.company"));

router.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {}),
    });
  }
  return next(err);
});

module.exports = router;
