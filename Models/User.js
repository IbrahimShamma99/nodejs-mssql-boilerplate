//SECTION DB
const sequelize = require("../db");
const { DataTypes, Model } = require("sequelize");
const Company = require("./Company");
//SECTION AUTH
const crypto = require("crypto");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = require("../config/appConfig").secret;
//SECTION MAILING
const sgEmail = require("../Services/Email");
const createMessage = require("../Constants/message");
const {
  createVerifyEmail,
  createResetPassword,
} = require("../Constants/AuthEmails");

class User extends Model {}

User.init(
  {
    user_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: sequelize.Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    salt: DataTypes.STRING(4000),
    hash: DataTypes.STRING(4000),

    email_verification: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    name: sequelize.Sequelize.STRING,
    admin: DataTypes.BOOLEAN,
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    title: sequelize.Sequelize.STRING,
    department: sequelize.Sequelize.STRING,

    mobile: sequelize.Sequelize.STRING,
    langauge: sequelize.Sequelize.STRING,
    photo: sequelize.Sequelize.STRING,
    reset: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    admin: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: "performit_user" }
);

(async () => {
  await sequelize.sync();
})();

User.beforeSave(function (user, options) {});

User.prototype.updateRecord = function () {
  this.changed("updatedAt", true);
};

User.beforeCreate(function (user, options) {
  user.email = user.email.toLowerCase();
  user.name = user.name.toLowerCase();
});

User.prototype.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

// User.update({
//   updatedAt: new Date(),
// });

User.prototype.authenticate = function authenticate(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

User.afterCreate(function (user, options, cb) {
  user.sendConfirmationInstructions();
});

User.prototype.generateAutoLoginURL = function generateAutoLoginURL() {};

User.prototype.sendConfirmationInstructions = function sendConfirmationInstructions() {
  sgEmail.send(
    createMessage(
      "verify",
      this.email,
      createVerifyEmail(this.email, this.user_id)
    )
  );
};
User.prototype.sendResetPassword = function sendResetPassword() {
  sgEmail.send(
    createMessage(
      "reset password",
      this.email,
      createResetPassword(this.email, this.user_id)
    )
  );
};

User.prototype.generateToken = function generateToken() {
  // var today = new Date();
  // var exp = new Date();
  // exp.setMinutes(today.getMinutes() + 3000);
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      //exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

User.prototype.toAuthJSON = function toAuthJSON() {
  return {
    ...this.toJSON(),
    token: this.generateToken(),
  };
};
User.prototype.toJSON = function toJSON() {
  return {
    user_id: this.user_id,
    email: this.email,
    email_verification: this.email_verification,
    name: this.name,
    admin: this.admin,
    title: this.title,
    photo: this.photo,
    langauge: this.langauge,
    department: this.department,
    mobile: this.mobile,
    disabled: this.disabled,
  };
};

User.belongsTo(Company, { foreignKey: "company_id" });

module.exports = User;
