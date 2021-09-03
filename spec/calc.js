function checkOperand(x) {
  if (isNaN(x)) {
    return false;
  }

  const invalidValues = ["", null];
  if (invalidValues.includes(x)) {
    return false;
  }

  return true;
}

function calc(a, b, op) {
  if (!["+", "-", "*", "/"].includes(op)) {
    return NaN;
  }

  if (!checkOperand(a) || !checkOperand(b)) {
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
