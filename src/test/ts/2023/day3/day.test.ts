import data from "./day-data.json";
import example from "./day-example.json";

test("day example", () => {
    console.log(run(example));
});

test("day", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input: string[] = _input.split("\n");
    return 0;
}
