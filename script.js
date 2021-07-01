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

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { id: 1, title: "Shirt", price: 150 },
      { id: 2, title: "Socks", price: 50 },
      { id: 3, title: "Jacket", price: 350 },
      { id: 4, title: "Shoes", price: 250 },
    ];
  }

  render() {
    let listHtml = "";
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

class cartElement extends GoodsItem {
  constructor(id, title, price, littleImg, quantity, discount) {
    super(id, title, price);
    this.litleImg = littleImg;
    this.quantity = quantity;
    this.discount = discount;
  }
}

class cart {
  constructor() {
    addToCart();
    removeFromCart();
    renderCart();
    count();
    goToCheckout();
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.count();
