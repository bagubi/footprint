// 最简单的路由
const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/", (req, res) => {
  res.send("post request.");
});
app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
