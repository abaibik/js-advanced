const express = require("express");
const fs = require("fs");

function logAction(action, goodId) {
  const time = new Date();
  fs.appendFileSync(
    "stats.json",
    `{"action": "${action}", "id": ${goodId}, "time": "${time.toUTCString()}"},\n`
  );
}

const app = express();

app.use(express.static("./dist/public"));
app.use(express.json());

app.get("/catalogData", (req, res) => {
  fs.readFile("catalog.json", "utf8", (err, data) => {
    res.send(data);
  });
});

app.get("/cart", (req, res) => {
  fs.readFile("cart.json", "utf8", (err, data) => {
    res.send(err ? [] : data);
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

    logAction("add", goodsId);
  });
});

app.post("/removeFromCart", (req, res) => {
  fs.readFile("cart.json", "utf8", (err, data) => {
    const goodsId = req.body.id;
    const cart = err ? [] : JSON.parse(data);

    const idx = cart.findIndex((item) => item.id === goodsId);
    if (idx === -1) {
      res.status(400).send("No such item in cart!");
    } else {
      cart.splice(idx, 1);
      fs.writeFile("cart.json", JSON.stringify(cart), (err) => {});
      logAction("remove", goodsId);
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
