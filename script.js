const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
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

Vue.component("goods-item", {
  props: ["good", "cart"],
  template: `<div class="goods-item">
  <img
    src="https://picsum.photos/200/300?random.jpg"
    alt="item image"
  />
  <h3 class="goods-heading">{{ good.title }}</h3>
  <p class="goods-price">{{ good.price }}</p>
  <p class="pWithButton">
    <a
      class="goods-cartButton"
      v-on:click="cart.addToCart(good)"
      href="#"
      >Add to cart</a
    >
  </p>
  </div>`,
});

const app = new Vue({
  el: "#app",

  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    cart: new Cart(),
  },

  methods: {
    makeGETRequest(url) {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              reject("Error");
            } else {
              const goods = JSON.parse(xhr.responseText).map((parsed) => {
                return new GoodsItem(
                  parsed.id_product,
                  parsed.product_name,
                  parsed.price
                );
              });
              resolve(goods);
            }
          }
        };
      });
      return promise;
    },

    onSearch() {
      this.filteredGoods = this.goods.filter((good) =>
        good.title.toLowerCase().includes(this.searchLine.toLowerCase())
      );
    },

    addToCart(goodsItem) {
      const foundElement = this.goods.find((cartElement) => {
        return cartElement.goodsItem === goodsItem;
      });
      if (foundElement === undefined) {
        const cartElement = new CartElement(goodsItem);
        this.cart.push(cartElement);
      } else {
        foundElement.quantity++;
      }
    },
  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  },
});
