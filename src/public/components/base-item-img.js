const BaseItemImg = {
  props: ["goodId", "className"],
  template: `<img :class="className"
      :src="'https://picsum.photos/id/' + goodId + '/200/300'"
      alt="item image"/>`,
};

export default BaseItemImg;
