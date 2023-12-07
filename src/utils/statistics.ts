export const avg = (...args: number[]) => {
    return args.reduce((p, c) => p + c / args.length, 0);
};

export const min = (...args: number[]) => {
    return Math.min(...args);
};

export const max = (...args: number[]) => {
    return Math.max(...args);
};
