import CartItem from "./cart-item";

const CartItems = {
  props: ["cart"],
  components: { "cart-item": CartItem },
  template: `<div class="items h-100">
    <cart-item
      v-for="cartElement in cart.itemsList"
      :key="cartElement.goodsItem.id"
      :cart-element="cartElement"
    ></cart-item>
  </div>`,
};

export default CartItems;
