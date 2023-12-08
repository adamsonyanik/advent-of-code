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
    const input: number[] = _input.lines().map((l) => l.numbers()[0]);

    let count = 0;
    for (let i = 1; i < input.length; i++) if (input[i] > input[i - 1]) count++;
    return count;
}
