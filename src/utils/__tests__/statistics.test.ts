import { describe, expect, test } from "vitest";
import { avg, max, min, sum } from "../statistics";

describe("statistics", () => {
  test("sum", () => {
    expect(sum(1, 2, 3, 4)).toBe(10);
  });

  test("avg", () => {
    expect(avg(1, 2, 3, 4)).toBe(2.5);
  });

  test("min", () => {
    expect(min(1, 2, 3, 4)).toBe(1);
  });

  test("max", () => {
    expect(max(1, 2, 3, 4)).toBe(4);
  });
});
