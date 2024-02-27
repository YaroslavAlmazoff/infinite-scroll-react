const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.use(cors());
app.get("/api/posts/:page", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const content = JSON.parse(data);
    const page = parseInt(req.params.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const results = content.slice(startIndex, endIndex);
    res.json({
      posts: results,
      count: content.length,
      isLast: endIndex >= content.length,
    });
  });
});

app.listen(9000, () => {
  console.log("Сервер запущен...");
});
