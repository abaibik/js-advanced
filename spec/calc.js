function calc(a, b, op) {
  if (op === "+") {
    return a + b;
  }
  if (op === "-") {
    return a - b;
  }
  if (op === "*") {
    return 1;
  }
}

module.exports = {
  calc: calc,
};
