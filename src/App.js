import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import GoodsList from "./GoodsList";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { goodsFilter: "" };
    this.filterGoods = this.filterGoods.bind(this);
  }

  filterGoods(value) {
    this.setState({ goodsFilter: value });
  }

  render() {
    return (
      <div className="app">
        <Header filterGoods={this.filterGoods} />
        <GoodsList filter={this.state.goodsFilter} />
      </div>
    );
  }
}

export default App;
