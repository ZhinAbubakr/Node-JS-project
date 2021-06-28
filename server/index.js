const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "data",
// });

// app.use(cors());
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

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

// app.post("/api/insert", (req, res) => {
//   const name = req.body.name;
//   const logo = req.body.logo;

//   const sqlInsert = "INSERT INTO datatable (name,logo) VALUES (?,?);";
//   db.query(sqlInsert, [name, , logo], (err, result) => {
//     res.send("hello world");
//     console.log(err);
//   });
// });

// app.get("/api/get", (req, res) => {
//   const sqlSelect = "SELECT * FROM datatable";
//   db.query(sqlSelect, (err, result) => {
//     res.send(result);
//   });
// });

const SELECT_ALL_STORES_QUERY = "SELECT * FROM datatable";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "data",
});

connection.connect((err) => {
  if (err) {
    return err;
  }
});

app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("helloooooooooooooooooooooooooooooooooooo");
});

app.get("/stores", (req, res) => {
  connection.query(SELECT_ALL_STORES_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.post("/stores/add", (req, res) => {
  // const { name, description } = req.query;
  const name = req.body.name;
  const description = req.body.description;
  const INSERT_SRORE_QUERY = `INSERT INTO datatable (name,description) VALUES ("${name}", "${description}")`;
  connection.query(INSERT_SRORE_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added");
    }
  });
});

app.get("/stores/add", (req, res) => {
  const INSERT_SRORE_QUERY = `SELECT id FROM datatable`;
  connection.query(INSERT_SRORE_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.listen(3001, () => {
  console.log("running on the port 3001");
});
