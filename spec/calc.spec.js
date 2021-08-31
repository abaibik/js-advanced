const script = require("./calc");
const calc = script.calc;

describe("calc(a, b, +)", () => {
  it("1+1=2", () => {
    expect(calc(1, 1, "+")).toBe(2);
  });

  it("1+2=3", () => {
    expect(calc(1, 2, "+")).toBe(3);
  });
});
