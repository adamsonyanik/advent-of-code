import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.numbers());

    const v = [];
    for (const l of input) {
        const d = [l];

        while (!d.get(-1).every((v) => v == 0)) d.push(getDiv(d.get(-1)));
        for (let i = d.length - 2; i >= 0; i--) d[i] = [d[i][0] - d[i + 1][0], ...d[i]];

        v.push(d[0][0]);
    }

    function getDiv(inp: number[]) {
        const r = [];
        for (let i = 1; i < inp.length; i++) r.push(inp[i] - inp[i - 1]);
        return r;
    }
    return v.sum();
}
