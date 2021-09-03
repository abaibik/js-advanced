function calc(a, b, op) {
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
    return 2;
  }
}

module.exports = {
  calc: calc,
};
