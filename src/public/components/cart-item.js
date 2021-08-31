import BaseItemImg from "./base-item-img";

const CartItem = {
  props: ["cartElement"],
  components: {
    BaseItemImg,
  },
  methods: {
    removeFromCart: function (cartElement) {
      this.$root.removeFromCart(cartElement);
    },
  },
  template: `<div class="cart-item row h-50 pb-2 align-items-stretch">
    <div class="col h-100"><BaseItemImg :goodId="cartElement.goodsItem.id" className="h-100"></BaseItemImg></div>
    <span class="goods-heading align-self-center col">{{ cartElement.goodsItem.title }}</span>
    <span class="goods-price align-self-center col">{{ cartElement.goodsItem.price }}</span>
    <span class="quantity align-self-center col">{{ cartElement.quantity }}</span> 
    <button v-on:click="removeFromCart(cartElement)"
    class="align-self-center col px-1 border border-light rounded-pill" type="button">Delete item</button>
    </div>`,
};

export default CartItem;
