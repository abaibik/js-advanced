function calc(a, b, op) {
  if (!["+", "-", "*", "/"].includes(op)) {
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
