const development = {
  database: {
    username: process.env.DBUSERNAME || "sa",
    dbname: process.env.DBNAME || "APP_NAME",
    password: process.env.DBPASSWORD || "1P@ssw0rd",
    host: process.env.MSHOST || "localhost",
    port: process.env.MSPORT || 5432,
    dialect: "mssql",
    DATABASE_URL: process.env.DATABASE_URL,
  },
  secret: process.env.JWT_SECRET || "f!DT3[i+Zl(W}17:%@]Tly*#/F&&L",
  appPort: process.env.PORT || 5003,
  url: "http://localhost:5003/",
};

const production = {
  database: {
    username: process.env.DBUSERNAME,
    dbname: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    host: process.env.MSHOST,
    port: process.env.MSPORT || 5432,
    dialect: "mssql",
    DATABASE_URL: process.env.DATABASE_URL,
  },
  secret: process.env.JWT_SECRET || "f!DT3[i+Zl(W}17:%@]Tly*#/F&&L",
  appPort: process.env.PORT || 5003,
};
module.exports =
  global.process.env.NODE_ENV === "production" ? production : development;
