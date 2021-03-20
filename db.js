const { Sequelize } = require("sequelize");
const { database } = require("./config/appConfig");
const sequelize = new Sequelize(
  database.dbname,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    dialectOptions: {
      trustedConnection: true,
      encrypt: true,
    },
  }
);

try {
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
module.exports = sequelize;
