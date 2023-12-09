interface Array<T> {
    /**
     * sorts 1, 2, 3
     * @param fn to convert to number
     *
     * not needed on <b><i>number[]</i></b>
     */
    sortNumericAsc(fn?: (element: T) => number): T[];
    /**
     * sorts 3, 2, 1
     * @param fn to convert to number
     *
     * not needed on <b><i>number[]</i></b>
     */
    sortNumericDesc(fn?: (element: T) => number): T[];
    /**
     * sorts a, A, z, Z
     * @param fn to convert to string
     *
     * not needed on <b><i>string[]</i></b>
     *
     * default: "" + v
     */
    sortAlphaAsc(fn?: (element: T) => string): T[];
    /**
     * sorts Z, z, A, a
     * @param fn to convert to string
     *
     * not needed on <b><i>string[]</i></b>
     *
     * default: "" + v
     */
    sortAlphaDesc(fn?: (element: T) => string): T[];

    /**
     * gets first element with max value
     * @param fn to convert to number
     *
     * not needed on <b><i>number[]</i></b>
     */
    max(fn?: (element: T, index: number) => number): T;
    /**
     * gets elements with max value
     * @param fn to convert to number
     *
     * not needed on <b><i>number[]</i></b>
     */
    maxAll(fn?: (element: T, index: number) => number): T[];
    /**
     * gets first element with min value
     * @param fn to convert to number
     *
     * not needed on <b><i>number[]</i></b>
     */
    min(fn?: (element: T, index: number) => number): T;
    /**
     * gets elements with min value
     * @param fn to convert to number
     *
     * not needed on <b><i>number[]</i></b>
     */
    minAll(fn?: (element: T, index: number) => number): T[];

    /**
     * average of number[]
     *
     * <b><i>!!! can only be called on number[]</i></b>
     */
    avg(): number;

    /**
     * sum of number[]
     *
     * <b><i>!!! can only be called on number[]</i></b>
     */
    sum(): number;
    /**
     * sum of number[]
     *
     * <b><i>!!! can only be called on number[]</i></b>
     */
    mul(): number;

    /**
     * puts the items into buckets based on the hash, which is obtained by applying fn
     *
     * @param fn to convert to number or string
     *
     * not needed on <b><i>(number | string)[]</i></b>
     */
    bucket<H extends number | string>(fn?: (value: T, index: number) => H): { hash: H; items: T[]; size: number }[];

    /**
     * puts the items into a map based on the hash, which is obtained by applying fn
     *
     * @param fn to convert to number or string
     *
     * not needed on <b><i>(number | string)[]</i></b>
     */
    toMap<H extends number | string>(fn?: (value: T, index: number) => H): Map<H, T>;

    log(toJson?: boolean, ref?: { value: any }): T[];
}

Array.prototype.sortNumericAsc = function <T>(fn: (element: T) => number = (v) => v as unknown as number): T[] {
    return this.sort((a: T, b: T) => fn(a) - fn(b));
};

Array.prototype.sortNumericDesc = function <T>(fn: (element: T) => number = (v) => v as unknown as number): T[] {
    return this.sort((a: T, b: T) => fn(b) - fn(a));
};

Array.prototype.sortAlphaAsc = function <T>(fn: (element: T) => string = (v) => "" + v): T[] {
    return this.sort((a: T, b: T) => fn(a).localeCompare(fn(b)));
};

Array.prototype.sortAlphaDesc = function <T>(fn: (element: T) => string = (v) => "" + v): T[] {
    return this.sort((a: T, b: T) => fn(b).localeCompare(fn(a)));
};

Array.prototype.max = function <T>(fn: (element: T, index: number) => number = (v) => v as unknown as number): T[] {
    let max = this[0];
    let maxValue = max !== undefined ? fn(max, 0) : 0;

    for (let i = 1; i < this.length; i++) {
        const value = fn(this[i], i);
        if (value > maxValue) {
            max = this[i];
            maxValue = value;
        }
    }
    return max;
};

Array.prototype.maxAll = function <T>(fn: (element: T, index: number) => number = (v) => v as unknown as number): T[] {
    let max: T[] = [this[0]];
    let maxValue = this[0] !== undefined ? fn(this[0], 0) : 0;

    for (let i = 1; i < this.length; i++) {
        const value = fn(this[i], i);
        if (value === maxValue) max.push(this[i]);
        if (value > maxValue) {
            max = [this[i]];
            maxValue = value;
        }
    }
    return max;
};

Array.prototype.min = function <T>(fn: (element: T, index: number) => number = (v) => v as unknown as number): T[] {
    let min = this[0];
    let minValue = min !== undefined ? fn(min, 0) : 0;

    for (let i = 1; i < this.length; i++) {
        const value = fn(this[i], i);
        if (value < minValue) {
            min = this[i];
            minValue = value;
        }
    }
    return min;
};

Array.prototype.minAll = function <T>(fn: (element: T, index: number) => number = (v) => v as unknown as number): T[] {
    let min: T[] = [this[0]];
    let minValue = this[0] !== undefined ? fn(this[0], 0) : 0;

    for (let i = 1; i < this.length; i++) {
        const value = fn(this[i], i);
        if (value === minValue) min.push(this[i]);
        if (value < minValue) {
            min = [this[i]];
            minValue = value;
        }
    }
    return min;
};

Array.prototype.avg = function () {
    return this.reduce((p, c) => p + c / this.length, 0);
};

Array.prototype.sum = function () {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
};

Array.prototype.mul = function () {
    let prod = 1;
    for (let i = 0; i < this.length; i++) {
        prod *= this[i];
    }
    return prod;
};

Array.prototype.bucket = function <T, H>(fn: (value: T, index: number) => H = (v) => v as unknown as H) {
    const buckets = new Map<H, { hash: H; items: T[]; size: number }>();
    for (let i = 0; i < this.length; i++) {
        const hash = fn(this[i], i);
        if (!buckets.has(hash)) buckets.set(hash, { hash, items: [], size: 0 });

        const item = buckets.get(hash)!;
        item.items.push(this[i]);
        item.size = item.items.length;
    }
    return [...buckets.values()];
};

Array.prototype.toMap = function <T, H>(fn: (value: T, index: number) => H = (v) => v as unknown as H) {
    const map = new Map<H, T>();
    for (let i = 0; i < this.length; i++) {
        const hash = fn(this[i], i);
        if (!map.has(hash)) map.set(hash, this[i]);
    }
    return map;
};

Array.prototype.log = function <T>(toJson: boolean = false, ref?: { value: any }) {
    console.log(toJson ? this : JSON.stringify(this, null, 4));
    if (ref) ref.value = [...this];
    return this;
};
