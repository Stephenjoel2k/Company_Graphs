const express = require("express");
const app = express();
const { GetData } = require("./app");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  const datas = GetData();
  res.render("stats", { datas: datas });
});

app.listen(3000, () => {
  console.log("Listening on PORT 3000");
});
