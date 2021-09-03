function calc(a, b, op) {
  if (!["+", "-", "*", "/"].includes(op)) {
    return NaN;
  }

  if (isNaN(b) || b === "") {
    return NaN;
  }

  if (op === "+") {
    return a + b;
  }

  if (op === "-") {
    return a - b;
  }

  if (op === "*") {
    return a * b;
  }

  if (op === "/") {
    return a / b;
  }
}

module.exports = {
  calc: calc,
};
