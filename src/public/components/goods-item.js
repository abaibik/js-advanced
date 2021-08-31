import BaseItemImg from "./base-item-img";

const GoodsItemComponent = {
  props: ["good", "add"],
  components: {
    BaseItemImg,
  },
  template: `<div class="goods-item">
    <BaseItemImg :goodId="good.id"></BaseItemImg>
    <h3 class="goods-heading">{{ good.title }}</h3>
    <p class="goods-price">{{ good.price }}</p>
    <p class="pWithButton">
      <a
        class="goods-cartButton"
        v-on:click="add(good)"
        href="#"
        >Add to cart</a
      >
    </p>
    </div>`,
};

export default GoodsItemComponent;
