function GoodsItem(props) {
  const url = `https://picsum.photos/200/300?random=${props.id}.jpg`;
  return (
    <div className="goods-item">
      <img src={url} alt="item image" />
      <h3 className="goods-heading">{props.title}</h3>
      <p className="goods-price">{props.price}</p>
      <p className="pWithButton">
        <a className="goods-cartButton" href="#">
          Add to cart
        </a>
      </p>
    </div>
  );
}

export default GoodsItem;
