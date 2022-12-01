import data from "./day1.json";

test("day1", () => {
    console.log(calcMostCal());
});

function calcMostCal(): number {
    const input: number[][] = getInput().split("\n\n").map(s => s.split("\n").map(e => Number(e)));
    const summed = input.map(e => e.reduce((p, c) => p + c, 0));
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        const m = Math.max(...summed);
        removeElementFrom(summed, m);
        sum += m;
    }
    return sum;
}

function removeElementFrom<T>(array: T[], value: T) {
    const index = array.indexOf(value);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
}

function getInput(): string {
    return data.data;
}
