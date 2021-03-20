const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const api = require("./api");
const dir = path.join(__dirname, "./blob");

console.log("public dir", dir);
app.use(cors());
app.use(express.static(dir));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(api);

app.get("/", (req, res) => {
  res.send({ message: "node mssql server" });
});

app.all("*", function (req, res, next) {
  origin = req.get("Origin") || "*";
  res.set("Access-Control-Allow-Origin", origin);
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Expose-Headers", "Content-Length");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type"); // add the list of headers your site allows.
  if ("OPTIONS" == req.method) return res.send(200);
  next();
});

// require("./Models/Company");
// require("./Models/User");
// require("./Models/Business");
// require("./Models/Business.Alert");
// require("./Models/Business.Module");

module.exports = app;
