import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => {
            const regexp = /mul\((\d+),(\d+)\)/g;

            return [...l.matchAll(regexp)].map((m) => Number(m[1]) * Number(m[2])).reduce((a, b) => a + b);
        })
        .reduce((a, b) => a + b);
    return input;
}
