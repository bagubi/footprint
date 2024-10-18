const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const config = require("./selfCreatedJs/config");
const port = 80;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const db = mysql.createConnection(config.db);
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

app.use(express.static(path.join(__dirname)));

app.use("/fonts", express.static(path.join(__dirname, "fonts")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(
  "/selfCreatedJs",
  express.static(path.join(__dirname, "selfCreatedJs"))
);
app.use("/css", express.static(path.join(__dirname, "css")));
app.use(
  "/selfCreatedCss",
  express.static(path.join(__dirname, "selfCreatedCss"))
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());

const subscribers = [];

路由;

app.get("/api/students", (req, res) => {
  const query1 = "SELECT sname AS name FROM students";
  const query2 = "SELECT name FROM acm";

  db.query(`${query1} UNION ${query2}`, (err, results) => {
    if (err) {
      return res.status(500).send(err.toString());
    }
    res.json(results);
  });
});

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));

启动服务器;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
