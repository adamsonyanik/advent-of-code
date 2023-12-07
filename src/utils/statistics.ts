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

export const avg = (...args: number[]) => {
    return args.reduce((p, c) => p + c / args.length, 0);
};

export const min = (...args: number[]) => {
    return Math.min(...args);
};

export const max = (...args: number[]) => {
    return Math.max(...args);
};
