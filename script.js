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
    }, 0);
  }
}

Vue.component("search", {
  data: () => {
    return {
      searchLine: "",
    };
  },
  props: ["search"],
  template: `<form class="d-flex">
  <input
    class="formSearch form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    v-on:input="searchLine = $event.target.value"
  />
  <button
    class="buttonSearch btn btn-outline-success"
    type="submit"
    v-on:click.stop.prevent="search(searchLine)"
  >
    Search
  </button>
</form>`,
});

Vue.component("base-item-img", {
  props: ["goodId", "className"],
  template: `<img :class="className"
    :src="'https://picsum.photos/id/' + goodId + '/200/300'"
    alt="item image"/>`,
});

Vue.component("goods-item", {
  props: ["good", "cart"],
  template: `<div class="goods-item">
  <base-item-img :goodId="good.id"></base-item-img>
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

Vue.component("items", {
  props: ["cart"],
  template: `<div class="items h-100">
  <cart-item
    v-for="cartElement in cart.itemsList"
    :key="cartElement.goodsItem.id"
    :good="cartElement.goodsItem"
    :quantity="cartElement.quantity"
  ></cart-item>
</div>`,
});

Vue.component("cart-item", {
  props: ["good", "quantity"],
  template: `<div class="cart-item row h-50 pb-2 align-items-stretch">
  <div class="col h-100"><base-item-img :goodId="good.id" className="h-100"></base-item-img></div>
  <span class="goods-heading align-self-center col">{{ good.title }}</span>
  <span class="goods-price align-self-center col">{{ good.price }}</span>
  <span class="quantity align-self-center col">{{ quantity }}</span>
  </div>`,
});

Vue.component("error-message", {
  props: ["message"],
  watch: {
    message: (newMessage, oldMessage) => {
      const toastLiveExample = document.getElementById("liveToast");
      const toast = new bootstrap.Toast(toastLiveExample);
      toast.show();
    },
  },
  template: `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Error</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Error: {{ message }}
    </div>
  </div>
</div>`,
});

const app = new Vue({
  el: "#app",

  data: {
    goods: [],
    filteredGoods: [],
    cart: new Cart(),
    errorMessage: "",
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
              reject(`${xhr.status}`);
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

    makePOSTRequest(url, data) {
      const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
              reject(`${xhr.status}`);
            } else {
              resolve(xhr.responseText);
            }
          }
        };

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

        xhr.send(data);
      });
      return promise;
    },

    onSearch(searchLine) {
      this.filteredGoods = this.goods.filter((good) =>
        good.title.toLowerCase().includes(searchLine.toLowerCase())
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
    this.makeGETRequest(`${API_URL}/catalogData`)
      .then((goods) => {
        this.goods = goods;
        this.filteredGoods = goods;
      })
      .catch((e) => {
        this.errorMessage = e;
      });
  },
});
