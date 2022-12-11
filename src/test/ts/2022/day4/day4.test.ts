import data from "./day4.json";

test("day4", () => {
    console.log(getNumOfFullContainments());
});

type Pair = { first: Range, second: Range };
type Range = { start: number, end: number };

function getNumOfFullContainments(): number {
    const input: Pair[] = getInput().split("\n").map(e => {
        const first = e.split(",")[0].split("-");
        const second = e.split(",")[1].split("-");
        return {
            first: {start: Number(first[0]), end: Number(first[1])},
            second: {start: Number(second[0]), end: Number(second[1])}
        };
    });

    return input.filter(overlap).length;
}

function overlap(pair: Pair): boolean {
    if (pair.first.start <= pair.second.start && pair.first.end >= pair.second.start) {
        return true;
    }

    if (pair.first.start <= pair.second.end && pair.first.end >= pair.second.end) {
        return true;
    }

    if (pair.second.start <= pair.first.start && pair.second.end >= pair.first.start) {
        return true;
    }

    if (pair.second.start <= pair.first.end && pair.second.end >= pair.first.end) {
        return true;
    }

    return false;
}

function getInput(): string {
    return data.data;
}
