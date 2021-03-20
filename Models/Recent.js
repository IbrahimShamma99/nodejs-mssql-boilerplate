const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const User = require("./User");

class Recent extends Model {}

Recent.init(
  {
    name: sequelize.Sequelize.STRING,
    recent_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "performit_recent" }
);
(async () => {
  await sequelize.sync();
})();

Recent.belongsTo(User, { foreignKey: "user_id" });

module.exports = Recent;
