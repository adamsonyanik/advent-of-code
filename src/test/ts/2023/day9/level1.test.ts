import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.numbers());

    const v = [];
    for (const l of input) {
        const d = [l];

        while (!d.at(-1)!.every((v) => v == 0)) d.push(getDiv(d.at(-1)!));
        for (let i = d.length - 2; i >= 0; i--) d[i].push(d[i].at(-1)! + d[i + 1].at(-1)!);

        v.push(d[0].at(-1)!);
    }

    function getDiv(inp: number[]) {
        const r = [];
        for (let i = 1; i < inp.length; i++) r.push(inp[i] - inp[i - 1]);
        return r;
    }
    return v.sum();
}
