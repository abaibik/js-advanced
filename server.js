const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("."));
app.use(express.json());

app.get("/catalogData", (req, res) => {
  fs.readFile("catalog.json", "utf8", (err, data) => {
    res.send(data);
  });
});

app.post("/addToCart", (req, res) => {
  const cart = req.body;

  res.send("");
  console.log("Add to cart");
  fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
    console.log("done");
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
