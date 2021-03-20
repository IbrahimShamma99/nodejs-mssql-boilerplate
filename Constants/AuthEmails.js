const createVerifyEmail = (email, user_id) => {
  return `HI ${email} <a href="https://performit-server.azurewebsites.net/api/verify?user_id=${user_id}">CLICK HERE</a>`;
};
const createResetPassword = (email, user_id) => {
  return `HI ${email} <a href="https://performit.ai/reset-password?user_id=${user_id}">CLICK HERE</a>`;
};

module.exports = { createVerifyEmail, createResetPassword };
