import data from "./day-data.json";
import example from "./day-example.json";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input: string[] = _input.split("\n");
    return 0;
}
