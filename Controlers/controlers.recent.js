const Recent = require("../Models/Recent");

const set = (req, res, next) => {
  const data = { ...req.body };
  Recent.create({
    user_id: data.user_id,
    name: data.name,
  }).then((recent) => {
    return next();
  });
};
const get = (req, res) => {
  const user_id = req.body.user_id;
  Recent.findAll({ user_id }).then((recents) => {
    res.send(recents);
  });
};

const purge = (req, res, next) => {
  const user_id = req.body.user_id;
  const recent_id = req.body.recent_id;
  Recent.destroy({ where: { user_id, recent_id } }).then(() => next());
};

module.exports = { set, get, purge };
