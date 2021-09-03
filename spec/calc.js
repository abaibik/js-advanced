function calc(a, b, op) {
  if (op === "+") {
    return a + b;
  }
  if (op === "-") {
    return 0;
  }
}

module.exports = {
  calc: calc,
};
