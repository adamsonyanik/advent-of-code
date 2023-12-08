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
        .map((l) => {
            return l
                .split("|")[1]
                .words()
                .bucket((v) => v.length)
                .map((len) => ([2, 3, 4, 7].includes(<number>len.hash) ? len.size : 0))
                .sum();
        })
        .sum();

    return input;
}
