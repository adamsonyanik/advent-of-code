import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";
import { mod } from "../../../../utils/math";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l.numbers()[0]);

    function mix(n: number, old: number) {
        return n ^ old;
    }

    function prune(n: number, old: number) {
        return mod(n, 16777216);
    }

    let counter = 0;
    for (let s of input) {
        for (let i = 0; i < 2000; i++) {
            s = prune(mix(s * 64, s), s);
            s = prune(mix(Math.floor(s / 32), s), s);
            s = prune(mix(s * 2048, s), s);
        }
        counter += s;
    }

    return counter;
}
