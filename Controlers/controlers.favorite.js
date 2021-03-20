const Favorite = require("../Models/Favorite");

const set = (req, res, next) => {
  const data = { ...req.body };
  Favorite.create({
    user_id: data.user_id,
    name: data.name,
  }).then(() => {
    return next();
  });
};

const get = (req, res) => {
  const user_id = req.body.user_id;
  Favorite.findAll({ user_id }).then((favorites) => {
    res.send(favorites);
  });
};

const purge = (req, res, next) => {
  const user_id = req.body.user_id;
  const favorite_id = req.body.favorite_id;
  Favorite.destroy({ where: { user_id, favorite_id } }).then(() => next());
};

module.exports = { set, get, purge };
