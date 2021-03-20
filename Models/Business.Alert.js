const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const Business = require("./Business");

class BusinessAlert extends Model {}

BusinessAlert.init(
  {
    description: sequelize.Sequelize.STRING,
  },
  { sequelize, modelName: "performit_business_alert" }
);
(async () => {
  await sequelize.sync();
})();

BusinessAlert.belongsTo(Business, { foreignKey: "business_id" });

module.exports = BusinessAlert;
