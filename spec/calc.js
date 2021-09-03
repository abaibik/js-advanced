function calc(a, b, op) {
  if (!["+", "-", "*", "/"].includes(op)) {
    return NaN;
  }

  if (isNaN(b)) {
    return NaN;
  }

  if (["", null].includes(b)) {
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
