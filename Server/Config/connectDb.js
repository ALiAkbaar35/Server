const mysql = require("mysql");

const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "inventory",
  password: "",
});

connectDb.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});
module.exports = connectDb;
