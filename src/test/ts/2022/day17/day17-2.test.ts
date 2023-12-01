import data from "./day17.json";

test("day17-2", () => {
    console.log(getHeightAfter(1000000000000));
});

function getHeightAfter(iterations: number) {
    const start = data.start;
    const cycle = data.cycle;

    const heightNonCycle: number = start
        .split("")
        .map((n) => Number(n))
        .reduce((a, b) => a + b);
    const cycleTimes: number = Math.floor((iterations - start.length) / cycle.length);
    const cycleHeight: number = cycle
        .split("")
        .map((n) => Number(n))
        .reduce((a, b) => a + b);
    const startLength: number = start.length;
    const cycleLength: number = cycleTimes * cycle.length;
    const cycleRemainingLength: number = iterations - (cycleLength + startLength);
    const cycleRemainingHeightString: string = cycle.substring(0, cycleRemainingLength + 1);
    const cycleRemainingHeight: number = cycleRemainingHeightString
        .split("")
        .map((n) => Number(n))
        .reduce((a, b) => a + b);

    return BigInt(heightNonCycle) + BigInt(cycleTimes) * BigInt(cycleHeight) + BigInt(cycleRemainingHeight);
}
