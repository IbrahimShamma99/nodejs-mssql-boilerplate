const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");

class Company extends Model {}

Company.init(
  {
    company_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    company_name: sequelize.Sequelize.STRING,
    address: sequelize.Sequelize.STRING,
    logo: sequelize.Sequelize.STRING,
    language: sequelize.Sequelize.STRING,

    //NOTE Connection to DB
    connection_string: sequelize.Sequelize.STRING,
    connection_host: sequelize.Sequelize.STRING,
    connection_port: sequelize.Sequelize.STRING,
    connection_username: sequelize.Sequelize.STRING,
    connection_password: sequelize.Sequelize.STRING,
    database_type: sequelize.Sequelize.STRING,
  },
  { sequelize, modelName: "performit_company" }
);
(async () => {
  await sequelize.sync();
})();

Company.prototype.updateInfo = function updateInfo(data) {
  //FIXME Needs to include the image
  this.company_name = data.company_name;
  this.address = data.address;
  this.language = data.language;
};

Company.prototype.updateConnection = function updateConnection(data) {
  //FIXME Needs to add the test connection before assign
  this.database_type = data.database_type;
  this.connection_string = data.connection_string;
  this.connection_host = data.connection_host;
  this.connection_port = data.connection_port;
  this.connection_username = data.connection_username;
  this.connection_password = data.connection_password;
};

module.exports = Company;
