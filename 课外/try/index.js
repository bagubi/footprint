const http = require("http");
const serve4r = http.createServer((req, res) => {
  res.end("Hello Hamo!");
});
serve4r.listen(3000, () => {
  console.log("server running at port 3000");
});
