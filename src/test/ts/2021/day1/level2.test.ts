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
    const input: number[] = _input.lines().map((l) => l.numbers()[0]);

    let count = 0;
    for (let i = 3; i < input.length; i++) if (input[i] > input[i - 3]) count++;
    return count;
}
