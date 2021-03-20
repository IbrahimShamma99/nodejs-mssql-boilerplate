const createMessage = (subject, to, html) => {
  return {
    to,
    subject,
    from: "development@infotointell.com",
    html,
  };
};

module.exports = createMessage;
