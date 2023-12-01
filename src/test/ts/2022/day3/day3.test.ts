import data from "./day3.json";

test("day3", () => {
    console.log(calcPriorities());
});

function calcPriorities(): number {
    const input = getInput().split("\n");
    const groups: { first: string; second: string; third: string }[] = [];

    for (let i = 0; i < input.length; i += 3) {
        groups.push({ first: input[i], second: input[i + 1], third: input[i + 2] });
    }

    const items = groups.map(
        (b) =>
            b.third.split("").filter((value) =>
                b.first
                    .split("")
                    .filter((value) => b.second.split("").includes(value))
                    .includes(value)
            )[0]
    );
    const priorities = items.map((i) => toPriority(i));

    return priorities.reduce((p, c) => p + c, 0);
}

function toPriority(item: string) {
    if (item.charCodeAt(0) > 96) {
        return item.charCodeAt(0) - 96;
    }

    return item.charCodeAt(0) - 64 + 26;
}

function getInput(): string {
    return data.data;
}
