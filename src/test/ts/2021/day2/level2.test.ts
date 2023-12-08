import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => ({ h: l.startsWith("f"), n: l.numbers()[0] * (l.startsWith("u") ? -1 : 1) }));

    let aim = 0;
    let pos = 0;
    let depth = 0;
    for (const i of input) {
        if (i.h) {
            pos += i.n;
            depth += aim * i.n;
        } else {
            aim += i.n;
        }
    }

    return pos * depth;
}
