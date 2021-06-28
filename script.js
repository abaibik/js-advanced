const goods = [
  { id: 1, title: "Shirt", price: 150 },
  { id: 2, title: "Socks", price: 50 },
  { id: 3, title: "Jacket", price: 350 },
  { id: 4, title: "Shoes", price: 250 },
];

const renderGoodsItem = (item) => {
  return `<div class="goods-item">
  <img src="https://picsum.photos/200/300?random=${item.id}.jpg" alt="item image">
  <h3 class="goods-heading">${item.title}</h3>
  <p class="goods-price">${item.price}</p>
  <p class="pWithButton"><a class="goods-cartButton" href="#">Add to cart</a></p>
  </div>`;
};

const renderGoodsList = (list = goods) => {
  const goodsList = list.map(renderGoodsItem);
  document.querySelector(".goods-list").innerHTML = goodsList.join("");
};

renderGoodsList();
