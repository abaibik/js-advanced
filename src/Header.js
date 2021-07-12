import React from "react";
import Cart from "./Cart";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = {
      searchValue: "",
    };
  }

  handleSearchChange(e) {
    this.setState({ searchValue: e.target.value });
  }

  handleSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.filterGoods(this.state.searchValue);
  }

  render() {
    return (
      <header>
        <nav className="navbar1 navbar navbar-expand-lg navbar-light">
          <span className="dots">&#9898; &#32; &#9898; &#32; &#9898;</span>
          <form className="d-flex">
            <input
              className="formSearch form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
            <button
              className="buttonSearch btn btn-outline-success"
              type="submit"
              onClick={this.handleSearchClick}
            >
              Search
            </button>
          </form>
        </nav>

        <nav className="navbar2">
          <div className="empty"></div>
          <div className="empty"></div>
          <div className="buttonDiv">
            <Cart />
            <button
              onClick={this.handleSearchClick}
              className="cart-button btn btn-outline-success position-relative"
              type="button"
              data-toggle="modal"
              data-target="#modalCart"
            >
              Cart
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                0<span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
