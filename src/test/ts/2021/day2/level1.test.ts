import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => ({ h: l.startsWith("f"), n: l.numbers()[0] * (l.startsWith("u") ? -1 : 1) }));

    return (
        input
            .filter((i) => i.h)
            .map((i) => i.n)
            .sum() *
        input
            .filter((i) => !i.h)
            .map((i) => i.n)
            .sum()
    );
}
