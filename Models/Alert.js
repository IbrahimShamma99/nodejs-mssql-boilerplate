const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const User = require("./User");

class Alert extends Model {}

Alert.init(
  {
    name: sequelize.Sequelize.STRING,
  },
  { sequelize, modelName: "performit_alert" }
);
(async () => {
  await sequelize.sync();
})();

Alert.belongsTo(User, { foreignKey: "user_id" });

module.exports = Alert;
