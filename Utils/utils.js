const sgEmail = require("../Services/Email");

const validate = (req, res, next, keys) => {
  const bodyKeys = Object.keys(req.body);
  keys.map((key) => {
    if (key.includes(".")) {
      //SECTION Checking sub entities
      var subKeys = key.split(".");
      if (!req.body[subKeys[0]][subKeys[1]]) {
        return res.send({
          message: "please provide the ".concat(subKeys[0], " ", subKeys[1]),
        });
      }
    } else if (bodyKeys.indexOf(key) === -1) {
      //SECTION When entity is not found
      return res.send({ message: "please provide the ".concat(key) });
    }
  });
  return next();
};

const contactUS = (req, res) => {
  const info = req.body;
  const email = info.email;
  const subject = info.subject;
  const body = info.body;
  const first_name = info.first_name;
  const last_name = info.last_name;
  const phone_number = info.phone_number;

  sgEmail
    .send({
      to: "info@infotointell.com",
      subject: subject.concat(" from ", email),
      from: "info@infotointell.com",
      text: body.concat(
        "\n phone_number",
        phone_number,
        "\n name",
        first_name,
        " ",
        last_name
      ),
    })
    .then(() => {
      res.send({ message: "Thanks" });
    })
    .catch((e) => res.send(e));
};

module.exports = { validate, contactUS };
