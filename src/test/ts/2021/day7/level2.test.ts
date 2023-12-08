import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";
import { range } from "../../../../utils";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input.numbers();
    return range(input.min(), input.max())
        .map((x) => input.map((n) => value(Math.abs(n - x))).sum())
        .min();

    function value(n: number): number {
        if (n == 0) return 0;
        return value(n - 1) + n;
    }
}
