function calc(a, b, op) {
  if (!["+", "-", "*", "/"].includes(op)) {
    return NaN;
  }

  if (isNaN(b) || isNaN(a)) {
    return NaN;
  }

  const invalidValues = ["", null];
  if (invalidValues.includes(b) || invalidValues.includes(a)) {
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
