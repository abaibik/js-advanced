const makeGETRequest = (url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject("Error");
        } else {
          resolve(xhr.responseText);
        }
      }
    };
  });
  return promise;
};

class GoodsItem {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item">
    <img src="https://picsum.photos/200/300?random=${this.id}.jpg" alt="item image">
    <h3 class="goods-heading">${this.title}</h3>
    <p class="goods-price">${this.price}</p>
    <p class="pWithButton"><a class="goods-cartButton" href="#">Add to cart</a></p>
    </div>`;
  }
}

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    const promise = new Promise((resolve, reject) => {
      makeGETRequest(`${API_URL}/catalogData.json`)
        .then((goods) => {
          this.goods = JSON.parse(goods).map((parsed) => {
            return new GoodsItem(
              parsed.id_product,
              parsed.product_name,
              parsed.price
            );
          });
          console.log("Fetch:", this.goods);
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });

    return promise;
  }

  render() {
    let listHtml = "";
    console.log("render = ", this.goods);
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.id, good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  count() {
    const sum = this.goods.reduce(
      (accumulator, good) => accumulator + good.price,
      0
    );

    console.log(sum);
  }
}

class CartElement {
  constructor(goodsItem) {
    this.goodsItem = goodsItem;
    this.quantity = 1;
  }

  getPrice() {
    return this.goodsItem.price * this.quantity;
  }
}

class Cart {
  constructor() {
    this.itemsList = [];
  }
  addToCart(goodsItem) {
    const foundElement = this.itemsList.find((cartElement) => {
      return cartElement.goodsItem === goodsItem;
    });
    if (foundElement === undefined) {
      const cartElement = new CartElement(goodsItem);
      this.itemsList.push(cartElement);
    } else {
      foundElement.quantity++;
    }
  }
  removeFromCart(cartElement) {
    const index = this.itemsList.indexOf(cartElement);
    if (index > -1) {
      this.itemsList.splice(index, 1);
    }
  }
  getPrice() {
    return this.itemsList.reduce((accumulator, cartElement) => {
      return accumulator + cartElement.getPrice();
    });
  }
}

const list = new GoodsList();
list.fetchGoods().then(() => {
  list.render();
});
