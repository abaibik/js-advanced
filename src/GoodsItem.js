function GoodsItem(props) {
  const url = `https://picsum.photos/200/300?random=${props.id}.jpg`;
  return (
    <div class="goods-item">
      <img src={url} alt="item image" />
      <h3 class="goods-heading">{props.title}</h3>
      <p class="goods-price">{props.price}</p>
      <p class="pWithButton">
        <a class="goods-cartButton" href="#">
          Add to cart
        </a>
      </p>
    </div>
  );
}

export default GoodsItem;
