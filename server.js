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
  fs.readFile("cart.json", "utf8", (err, data) => {
    const goodsId = req.body.id;
    const cart = err ? [] : JSON.parse(data);

    const foundElement = cart.find((cartElement) => {
      return cartElement.id === goodsId;
    });
    if (foundElement === undefined) {
      cart.push({ id: goodsId, quantity: 1 });
    } else {
      foundElement.quantity++;
    }

    res.send("");

    fs.writeFile("cart.json", JSON.stringify(cart), (err) => {});
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
