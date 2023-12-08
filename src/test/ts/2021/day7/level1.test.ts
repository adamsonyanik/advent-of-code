import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";
import { range } from "../../../../utils";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input.numbers();
    return range(input.min(), input.max())
        .map((x) => input.map((n) => Math.abs(n - x)).sum())
        .min();
}
