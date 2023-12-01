import data from "./day-data.json";

test("day example", () => {
    console.log(run(""));
});

test("day", () => {
    console.log(run(data.data));
});

function run(_input: string) {
    const input: string[][] = _input.split("\n").map((s) => s.split(""));
    let counter = 0;
    for (const row of input) counter += getFirstDig(row, true) * 10 + getFirstDig(row, false);

    return counter;
}

function getFirstDig(row: string[], forward: boolean) {
    for (let i = forward ? 0 : row.length - 1; forward ? i < row.length : i >= 0; i += forward ? 1 : -1) {
        const val = row[i];
        if (val == "1") return 1;
        if (val == "2") return 2;
        if (val == "3") return 3;
        if (val == "4") return 4;
        if (val == "5") return 5;
        if (val == "6") return 6;
        if (val == "7") return 7;
        if (val == "8") return 8;
        if (val == "9") return 9;

        const w = row.join("").substring(i);

        if (w.startsWith("one")) return 1;
        if (w.startsWith("two")) return 2;
        if (w.startsWith("three")) return 3;
        if (w.startsWith("four")) return 4;
        if (w.startsWith("five")) return 5;
        if (w.startsWith("six")) return 6;
        if (w.startsWith("seven")) return 7;
        if (w.startsWith("eight")) return 8;
        if (w.startsWith("nine")) return 9;
    }

    return 0;
}
