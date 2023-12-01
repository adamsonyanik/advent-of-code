import { describe, expect, test } from "vitest";
import { Combination, factorial, Permutation } from "../permutation-combination";

describe("permutation-combination", () => {
  test("factorial", () => {
    expect(factorial(6)).toBe(6 * 5 * 4 * 3 * 2);
    for (let i = 1; i < 1000; i++) expect(factorial(i)).toBe(i * factorial(i - 1));
  });

  describe("permutation", () => {
    test("amount", () => {
      expect(Permutation.getAmountOfPermutations(6, 2)).toBe(30);
      expect(new Permutation(new Array(6)).getAmountOfPermutations(2)).toBe(30);
    });

    test("full permutations", () => {
      expect(new Permutation([1, 2, 3]).getAllPermutations()).toStrictEqual([
        [1, 2, 3],
        [2, 1, 3],
        [3, 1, 2],
        [1, 3, 2],
        [2, 3, 1],
        [3, 2, 1],
      ]);
    });

    test("subset permutations", () => {
      expect(new Permutation([1, 2, 3]).getPermutation(2)).toStrictEqual([
        [1, 2],
        [2, 1],
        [1, 3],
        [3, 1],
        [2, 3],
        [3, 2],
      ]);
    });
  });

  describe("combination", () => {
    test("amount", () => {
      expect(Combination.getAmountOfCombinations(6, 2)).toBe(15);
      expect(new Combination(new Array(6)).getAmountOfCombinations(2)).toBe(15);
    });

    test("subset combinations", async () => {
      expect(new Combination([1, 2, 3]).getCombinations(2)).toStrictEqual([
        [1, 2],
        [1, 3],
        [2, 3],
      ]);
    });
  });
});
