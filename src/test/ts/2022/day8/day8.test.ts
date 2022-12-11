import data from "./day8.json";

test("day8", () => {
    console.log(getNumOfVisibleTrees());
});

function getNumOfVisibleTrees() {
    const input: number[][] = getInput().split("\n").map(c => c.split("").map(t => Number(t)));

    const scores = [];

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const left = viewDistanceLeft(input, x, y);
            const right = viewDistanceRight(input, x, y);
            const up = viewDistanceUp(input, x, y);
            const down = viewDistanceDown(input, x, y);
            scores.push(left * right * up * down);
        }
    }

    return scores.sort((a, b) => b - a)[0];
}

function get(trees: number[][], x: number, y: number) {
    return trees[y][x];
}

function getUpDownSize(trees: number[][]) {
    return trees.length;
}

function getLeftRightSize(trees: number[][]) {
    return trees[0].length;
}

function isVisFromLeft(trees: number[][], x: number, y: number) {
    for (let i = 0; i < x; i++) {
        if (get(trees, i, y) >= get(trees, x, y))
            return false;
    }

    return true;
}

function isVisFromRight(trees: number[][], x: number, y: number) {
    for (let i = x + 1; i < getLeftRightSize(trees); i++) {
        if (get(trees, i, y) >= get(trees, x, y))
            return false;
    }

    return true;
}

function isVisFromUp(trees: number[][], x: number, y: number) {
    for (let i = 0; i < y; i++) {
        if (get(trees, x, i) >= get(trees, x, y))
            return false;
    }

    return true;
}

function isVisFromDown(trees: number[][], x: number, y: number) {
    for (let i = y + 1; i < getUpDownSize(trees); i++) {
        if (get(trees, x, i) >= get(trees, x, y))
            return false;
    }

    return true;
}

function viewDistanceLeft(trees: number[][], x: number, y: number) {
    let counter = 0;
    for (let i = x - 1; i >= 0; i--) {
        counter++;

        if (get(trees, i, y) >= get(trees, x, y))
            break;
    }

    return counter;
}

function viewDistanceRight(trees: number[][], x: number, y: number) {
    let counter = 0;
    for (let i = x + 1; i < getLeftRightSize(trees); i++) {
        counter++;

        if (get(trees, i, y) >= get(trees, x, y))
            break;
    }

    return counter;
}

function viewDistanceUp(trees: number[][], x: number, y: number) {
    let counter = 0;
    for (let i = y - 1; i >= 0; i--) {
        counter++;

        if (get(trees, x, i) >= get(trees, x, y))
            break;
    }

    return counter;
}

function viewDistanceDown(trees: number[][], x: number, y: number) {
    let counter = 0;
    for (let i = y + 1; i < getUpDownSize(trees); i++) {
        counter++;

        if (get(trees, x, i) >= get(trees, x, y))
            break;
    }

    return counter;
}

function getInput(): string {
    return data.data;
}
