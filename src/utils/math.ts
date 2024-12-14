export const solveQuadratic = (a: number, b: number, c: number) => {
    b /= a;
    c /= a;

    const pq1 = -b / 2;
    const pq2 = Math.sqrt(pq1 * pq1 - c);
    return [pq1 - pq2, pq1 + pq2];
};

export const gcd = (...args: number[]) => args.reduce((p, c) => gcd2(p, c), args[0]);

const gcd2 = (m: number, n: number) => {
    let r = 1;
    while (r != 0) {
        if (m < n) {
            const h = m;
            m = n;
            n = h;
        }
        r = m - n;
        m = n;
        n = r;
    }
    return m;
};

export const lcm = (...args: number[]) => args.reduce((p, c) => lcm2(p, c), args[0]);

function lcm2(a: number, b: number) {
    return (a * b) / gcd2(a, b);
}

export const mod = (a: number, b: number) => {
    const r = a % b;
    if (b < 0) return r;
    if (r < 0) return r + b;

    return r;
};
