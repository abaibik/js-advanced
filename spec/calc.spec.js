const script = require("./calc");
const calc = script.calc;

describe("calc", () => {
  const testData = [
    [1, 1, "+", 2],
    [1, 2, "+", 3],
    [1, 1, "-", 0],
    [1, 2, "-", -1],
    [1, 1, "*", 1],
    [1, 0, "*", 0],
    [4, 2, "/", 2],
    [3, 2, "/", 1.5],
    [3, 0, "/", Infinity],
  ];

  for (const [a, b, op, expected] of testData) {
    it(`calc(${a}, ${b}, ${op}) = ${expected}`, () => {
      expect(calc(a, b, op)).toBe(expected);
    });
  }
});

describe("calc invalid argument", () => {
  const testData = [
    [1, 1, "qwerty"],
    [1, 1, ""],
  ];

  for (const [a, b, op] of testData) {
    it(`calc(${a}, ${b}, ${op}) = NaN`, () => {
      expect(calc(a, b, op)).toBeNaN();
    });
  }
});
