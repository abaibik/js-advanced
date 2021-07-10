function Header() {
  return (
    <header>
      <nav class="navbar1 navbar navbar-expand-lg navbar-light">
        <span class="dots">&#9898; &#32; &#9898; &#32; &#9898;</span>
        <form class="d-flex">
          <input
            class="formSearch form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="buttonSearch btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </nav>

      <nav class="navbar2">
        <div class="empty"></div>
        <div class="empty"></div>
        <div class="buttonDiv">
          <button class="cart-button btn btn-outline-success" type="button">
            Cart
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
