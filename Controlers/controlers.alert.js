const Alert = require("../Models/Alert");

const set = (req, res) => {
  const data = { ...req.body };
  Alert.create({
    user_id: data.user_id,
    name: data.name,
  }).then((alert) => {
    res.send(alert);
  });
};
const get = (req, res) => {
  const user_id = req.body.user_id;
  Alert.findAll({ user_id }).then((alerts) => {
    res.send(alerts);
  });
};

module.exports = { set, get };
