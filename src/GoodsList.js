import React from "react";
import { __values } from "tslib";
import GoodsItem from "./GoodsItem";

const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const makeGETRequest = (url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject("Error");
        } else {
          resolve(xhr.responseText);
        }
      }
    };
  });
  return promise;
};

class GoodsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
    };
  }

  componentDidMount() {
    makeGETRequest(`${API_URL}/catalogData.json`).then((data) => {
      this.setState({ goods: JSON.parse(data) });
    });
  }

  render() {
    const filteredGoods = this.state.goods.filter((value) =>
      value.product_name.toLowerCase().includes(this.props.filter)
    );

    if (filteredGoods.length === 0) {
      return <h2 className="p-3">Нет данных</h2>;
    }
    return (
      <div className="goods-list">
        {filteredGoods.map((value) => (
          <GoodsItem
            key={value.id_product}
            id={value.id_product}
            title={value.product_name}
            price={value.price}
          />
        ))}
      </div>
    );
  }
}

export default GoodsList;
