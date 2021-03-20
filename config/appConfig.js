const development = {
  database: {
    username: process.env.DBUSERNAME,
    dbname: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    host: process.env.PGHOST || "localhost",
    port: process.env.PGPORT || 5432,
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
