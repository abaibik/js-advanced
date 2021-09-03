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

describe("calc(a,b,-)", () => {
  it("1-1=0", () => {
    expect(calc(1, 1, "-")).toBe(0);
  });

  it("1-2=-1", () => {
    expect(calc(1, 2, "-")).toBe(-1);
  });
});

describe("calc(a,b,*)", () => {
  it("1*1=1", () => {
    expect(calc(1, 1, "*")).toBe(1);
  });

  it("1*0=0", () => {
    expect(calc(1, 0, "*")).toBe(0);
  });
});

describe("calc(a,b,/)", () => {
  it("4/2=2", () => {
    expect(calc(4, 2, "/")).toBe(2);
  });

  it("3/2=1.5", () => {
    expect(calc(3, 2, "/")).toBe(1.5);
  });

  it("3/0=Infinity", () => {
    expect(calc(3, 0, "/")).toBe(Infinity);
  });
});
