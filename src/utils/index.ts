import "./array.ts";
import "./string-parser.ts";

export const ref = () => ({ value: undefined });

/**
 * creates an array with values from inclusive a to inclusive b
 * @param a
 * @param b
 */
export const range = (a: number, b: number) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);

    const array = new Array(max - min + 1);

    let i = 0;
    for (let x = min; x < max; x++) {
        array[i++] = x;
    }

    return array;
};
