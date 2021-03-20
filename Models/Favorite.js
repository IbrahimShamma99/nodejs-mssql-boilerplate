const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const User = require("./User");

class Favorite extends Model {}

Favorite.init(
  {
    name: sequelize.Sequelize.STRING,
    favorite_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "performit_favorite" }
);
(async () => {
  await sequelize.sync();
})();

Favorite.belongsTo(User, { foreignKey: "user_id" });

module.exports = Favorite;
