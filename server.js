const app = require("./app");
const port = require("./config/appConfig").appPort;
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
