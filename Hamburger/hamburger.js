const sizes = [
  {
    size: "small",
    calories: 20,
    price: 50,
  },

  { size: "big", calories: 40, price: 100 },
];

const stuffings = [
  { name: "cheese", calories: 20, price: 10 },
  { name: "salad", calories: 5, price: 20 },
  { name: "jalapeno", calories: 10, price: 15 },
];

const toppings = [
  { name: "spices", calories: 0, price: 15 },
  { name: "worcester sauce", calories: 5, price: 20 },
];

class Hamburger {
  constructor() {
    this.size = undefined;
    this.stuffing = undefined;
    this.toppings = [];
  }

  setSize(size) {
    this.size = size;
  }

  getSize() {
    return this.size;
  }

  setStuffing(stuffing) {
    this.stuffing = stuffing;
  }

  getStuffing() {
    return this.stuffing;
  }

  setToppings(toppings) {
    this.toppings = toppings;
  }

  getToppings() {
    return this.toppings;
  }
}

function calcParam(hamburger, param) {
  let totalValue = 0;

  const size = sizes.find(function (value) {
    return value.size === hamburger.getSize();
  });

  totalValue += size[param];

  for (const toppingName of hamburger.getToppings()) {
    const topping = toppings.find(function (value) {
      return value.name === toppingName;
    });
    totalValue += topping[param];
  }

  const stuffing = stuffings.find(function (value) {
    return value.name === hamburger.getStuffing();
  });
  totalValue += stuffing[param];

  return totalValue;
}

function calcPrice(hamburger) {
  return calcParam(hamburger, "price");
}

function calcCalories(hamburger) {
  return calcParam(hamburger, "calories");
}

function somethingChanged() {
  const clientHamburger = new Hamburger();

  if (document.querySelector("#big").checked) {
    clientHamburger.setSize("big");
  } else {
    clientHamburger.setSize("small");
  }

  if (document.querySelector("#cheese").checked) {
    clientHamburger.setStuffing("cheese");
  } else {
    if (document.querySelector("#salad").checked) {
      clientHamburger.setStuffing("salad");
    } else {
      clientHamburger.setStuffing("jalapeno");
    }
  }

  const toppings = [];
  if (document.querySelector(".spices").checked) {
    toppings.push("spices");
  }
  if (document.querySelector(".sauce").checked) {
    toppings.push("worcester sauce");
  }

  clientHamburger.setToppings(toppings);

  document.querySelector(".clientPrice").innerHTML = new Intl.NumberFormat(
    "ru-RU",
    { style: "currency", currency: "RUB" }
  ).format(calcPrice(clientHamburger));

  document.querySelector(".clientEnergyValue").innerHTML =
    calcCalories(clientHamburger);
}

for (const elem of document.querySelectorAll("input")) {
  elem.addEventListener("change", somethingChanged);
}

somethingChanged();
