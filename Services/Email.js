require("dotenv").config({ path: "email.env" });
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = sgMail;
