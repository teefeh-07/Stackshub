import { truncateAddress, toMicroStx, fromMicroStx } from "./utils";

describe("truncateAddress", () => {
  it("truncates long addresses", () => {
    expect(truncateAddress("SP1234567890ABCDEF", 4, 4)).toBe("SP12...CDEF");
  });

  it("returns original string if short", () => {
    expect(truncateAddress("SP123")).toBe("SP123");
  });

  it("handles custom lengths", () => {
    expect(truncateAddress("SP1234567890", 2, 2)).toBe("SP...90");
  });
});

describe("Unit Conversions", () => {
  it("converts STX to microSTX", () => {
    expect(toMicroStx(1)).toBe(1000000);
    expect(toMicroStx(0.5)).toBe(500000);
  });

  it("converts microSTX to STX", () => {
    expect(fromMicroStx(1000000)).toBe(1);
    expect(fromMicroStx(500000)).toBe(0.5);
  });
});
