const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const Business = require("./Business");

class BusinessModule extends Model {}

BusinessModule.init(
  {
    description: sequelize.Sequelize.STRING,
  },
  { sequelize, modelName: "performit_business_module" }
);
(async () => {
  await sequelize.sync();
})();

BusinessModule.belongsTo(Business, { foreignKey: "business_id" });

module.exports = BusinessModule;
