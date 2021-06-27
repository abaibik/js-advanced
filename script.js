const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
];

const renderGoodsItem = (image, title, price, link) => {
  return `<div class="goods-item">
  <img src = "https://picsum.photos/200/300?random=1.jpg" alt = "item image">
  <h3 class = "goods-heading">${title}</h3>
  <p class = "goods-price">${price}</p>
  <p class = "pWithButton"><a class = "goods-cartButton" href = "#">Add to cart</a></p>
  </div>`;
};

const renderGoodsList = (list = goods) => {
  let goodsList = list.map((item) =>
    renderGoodsItem(item.img, item.title, item.price)
  );
  document.querySelector(".goods-list").innerHTML = goodsList.join("");
};

renderGoodsList();
