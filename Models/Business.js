const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");

class Business extends Model {}

Business.init(
  {
    description: sequelize.Sequelize.STRING,
    type: sequelize.Sequelize.STRING,
  },
  { sequelize, modelName: "performit_business" }
);
(async () => {
  await sequelize.sync();
})();

module.exports = Business;
