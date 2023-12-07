export const sum = (...args: number[]) => {
    return args.reduce((p, c) => p + c, 0);
};

export const sumF = <T>(args: T[], fn: (value: T, index: number) => number) => {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += fn(args[i], i);
    }
    return sum;
};

export const mul = (...args: number[]) => {
    return args.reduce((p, c) => p * c, 1);
};

export const mulF = <T>(args: T[], fn: (value: T, index: number) => number) => {
    let prod = 1;
    for (let i = 0; i < args.length; i++) {
        prod *= fn(args[i], i);
    }
    return prod;
};

export const bucket = <T>(args: T[], fn: (value: T, index: number) => number | string = (v) => "" + v) => {
    const buckets = new Map<number | string, { hash: number | string; items: T[]; size: number }>();
    for (let i = 0; i < args.length; i++) {
        const hash = fn(args[i], i);
        if (!buckets.has(hash)) buckets.set(hash, { hash, items: [], size: 0 });

        const item = buckets.get(hash)!;
        item.items.push(args[i]);
        item.size = item.items.length;
    }
    return [...buckets.values()];
};

export const sortNumericAsc = <T>(fn: (element: T) => number = (v) => v as unknown as number) => {
    return (a: T, b: T) => fn(a) - fn(b);
};

export const sortNumericDesc = <T>(fn: (element: T) => number = (v) => v as unknown as number) => {
    return (a: T, b: T) => fn(b) - fn(a);
};

export const sortAlphaAsc = <T>(fn: (element: T) => string = (v) => "" + v) => {
    return (a: T, b: T) => fn(a).localeCompare(fn(b));
};

export const sortAlphaDesc = <T>(fn: (element: T) => string = (v) => "" + v) => {
    return (a: T, b: T) => fn(b).localeCompare(fn(a));
};
