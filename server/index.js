const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "data",
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//check if database is connected or not
// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO datatable (name) VALUES ('Company Inc one')";
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const logo = req.body.logo;

  const sqlInsert = "INSERT INTO datatable (name,logo) VALUES (?,?);";
  db.query(sqlInsert, [name, , logo], (err, result) => {
    res.send("hello world");
    console.log(err);
  });
});

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM datatable";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on the port 3001");
});
