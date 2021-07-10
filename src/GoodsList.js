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
    return (
      <div className="goods-list">
        {this.state.goods.map((value) => (
          <GoodsItem
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
