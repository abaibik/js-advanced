const goods = [
  { id: 1, title: "Shirt", price: 150 },
  { id: 2, title: "Socks", price: 50 },
  { id: 3, title: "Jacket", price: 350 },
  { id: 4, title: "Shoes", price: 250 },
];

const renderGoodsItem = (title, price, image) => {
  return `<div class="goods-item">
  <img src="${image}" alt="item image">
  <h3 class="goods-heading">${title}</h3>
  <p class="goods-price">${price}</p>
  <p class="pWithButton"><a class="goods-cartButton" href="#">Add to cart</a></p>
  </div>`;
};

const renderGoodsList = (list = goods) => {
  let goodsList = list.map((item) =>
    renderGoodsItem(
      item.title,
      item.price,
      `https://picsum.photos/200/300?random=${item.id}.jpg`
    )
  );
  document.querySelector(".goods-list").innerHTML = goodsList.join("");
};

renderGoodsList();
