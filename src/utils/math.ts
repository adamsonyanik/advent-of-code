export const solveQuadratic = (a: number, b: number, c: number) => {
    b /= a;
    c /= a;

    const pq1 = -b / 2;
    const pq2 = Math.sqrt(pq1 * pq1 - c);
    return [pq1 - pq2, pq1 + pq2];
};
