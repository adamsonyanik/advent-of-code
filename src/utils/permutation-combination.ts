export function factorial(n: number) {
    let fact = 1;
    for (let i = 2; i <= n; i++) fact *= i;
    return fact;
}

export class Permutation<T> {
    /**
     * amount of permutations when drawing a subset from a totalset
     * @param totalSetSize
     * @param subSetSize
     */
    public static getAmountOfPermutations(totalSetSize: number, subSetSize: number) {
        return factorial(totalSetSize) / factorial(totalSetSize - subSetSize);
    }

    constructor(private set: T[]) {}

    /**
     * amount of permutations when drawing a subset from the set
     * @param subSetSize
     */
    public getAmountOfPermutations(subSetSize: number) {
        return Permutation.getAmountOfPermutations(this.set.length, subSetSize);
    }

    public getAllPermutations() {
        const result = [this.set.slice()];
        const c: number[] = new Array(this.set.length).fill(0);
        let i = 1;
        let k: number;
        let p: T;

        while (i < this.set.length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = this.set[i];
                this.set[i] = this.set[k];
                this.set[k] = p;
                c[i]++;
                i = 1;
                result.push(this.set.slice());
            } else {
                c[i] = 0;
                i++;
            }
        }
        return result;
    }

    public getPermutation(subSetSize: number) {
        const combinations = new Combination(this.set).getCombinations(subSetSize);
        return combinations.map((comb) => new Permutation(comb).getAllPermutations()).flat();
    }
}

// Combination are essentially permutations where all the redundancies are removed, since order in a combination is not important
export class Combination<T> {
    /**
     * amount of combinations when drawing a subset from a totalset
     * @param totalSetSize
     * @param subSetSize
     */
    public static getAmountOfCombinations(totalSetSize: number, subSetSize: number) {
        return factorial(totalSetSize) / (factorial(subSetSize) * factorial(totalSetSize - subSetSize));
    }

    constructor(private set: T[]) {}

    /**
     * amount of permutations when drawing a subset from the set
     * @param subSetSize
     */
    public getAmountOfCombinations(subSetSize: number) {
        return Combination.getAmountOfCombinations(this.set.length, subSetSize);
    }

    public getCombinations(subSetSize: number) {
        const result: T[][] = [];

        const indices = [];
        for (let i = 0; i < subSetSize; i++) indices.push(i);

        while (indices[0] < this.set.length - subSetSize + 1) {
            const c = [];
            for (let i = 0; i < indices.length; i++) c.push(this.set[indices[i]]);
            result.push(c);

            for (let i: number = indices.length - 1; i >= 0; i--) {
                if (indices[i] < this.set.length - i) {
                    indices[i]++;
                    for (let j = i + 1; j < indices.length; j++) indices[j] = indices[j - 1] + 1;
                    break;
                }
            }
        }

        return result;
    }
}
