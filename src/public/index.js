import "./style.css";
import search from "./components/search.js";
import GoodsItemComponent from "./components/goods-item";
import ErrorMessage from "./components/error-message";
import CartItems from "./components/cart-items";

const API_URL = ".";

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
      return cartElement.goodsItem.id === goodsItem.id;
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
    }, 0);
  }
}

const app = new Vue({
  el: "#app",
  components: {
    search,
    "goods-item": GoodsItemComponent,
    "error-message": ErrorMessage,
    "cart-items": CartItems,
  },

  data: {
    goods: [],
    filteredGoods: [],
    cart: new Cart(),
    errorMessage: "",
  },

  methods: {
    makeGETRequest(url) {
      const promise = new Promise((resolve, reject) => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const goods = data.map((parsed) => {
              return new GoodsItem(
                parsed.id_product,
                parsed.product_name,
                parsed.price
              );
            });
            resolve(goods);
          });
      });

      return promise;
    },

    makePOSTRequest(url, data) {
      const promise = new Promise((resolve, reject) => {
        const myRequest = new Request(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        fetch(myRequest);
      });
      return promise;
    },

    onSearch(searchLine) {
      this.filteredGoods = this.goods.filter((good) =>
        good.title.toLowerCase().includes(searchLine.toLowerCase())
      );
    },

    addToCart(goodsItem) {
      this.cart.addToCart(goodsItem);
      this.makePOSTRequest(`${API_URL}/addToCart`, { id: goodsItem.id });
    },

    removeFromCart(cartElement) {
      this.cart.removeFromCart(cartElement);
      this.makePOSTRequest(`${API_URL}/removeFromCart`, {
        id: cartElement.goodsItem.id,
      });
    },
  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData`)
      .then((goods) => {
        this.goods = goods;
        this.filteredGoods = goods;
      })
      .catch((e) => {
        this.errorMessage = e;
      });

    fetch(`${API_URL}/cart`)
      .then((response) => response.json())
      .then((cart) => {
        for (const cartElement of cart) {
          const good = this.goods.find((good) => good.id === cartElement.id);
          if (good === undefined) {
            continue;
          }
          for (let i = 0; i < cartElement.quantity; i++) {
            this.cart.addToCart(good);
          }
        }
      });
  },
});
