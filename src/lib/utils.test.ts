import { formatAddress, formatAmount } from "./utils";

describe("formatAddress function", () => {
  it("should format address correctly", () => {
    expect(formatAddress("0x1234567890abcdef1234567890abcdef12345678")).toBe(
      "0x1234...5678"
    );
    expect(formatAddress("abcdefghijklmnopqrstuvwxyz123456789012")).toBe(
      "abcdef...9012"
    );
  });
});

describe("formatAmount function", () => {
  it("should format amounts correctly", () => {
    expect(formatAmount(1234.5678)).toBe("1,234.5678");
    expect(formatAmount(0.123456789)).toBe("0.1235");
    expect(formatAmount(1000000)).toBe("1,000,000");
  });

  it("should handle custom precision", () => {
    expect(formatAmount(1234.5678, 2)).toBe("1,234.57");
    expect(formatAmount(0.123456789, 6)).toBe("0.123457");
  });

  it("should return default value for falsy inputs", () => {
    expect(formatAmount(0)).toBe("0");
    expect(formatAmount("", 4, "N/A")).toBe("N/A");
  });

  it("should handle string inputs", () => {
    expect(formatAmount("1234.5678")).toBe("1,234.5678");
    expect(formatAmount("0.123456789")).toBe("0.1235");
  });
});
