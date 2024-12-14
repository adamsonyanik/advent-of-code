import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";
import { mod } from "../../../../utils/math";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const w = _isExample ? 11 : 101;
    const h = _isExample ? 7 : 103;

    const input = _input.lines().map((l) => {
        const [px, py, vx, vy] = l.numbers();
        return { px, py, vx, vy };
    });

    const a: string[][] = [];
    for (let y = 0; y < h; y++) {
        a[y] = [];
        for (let x = 0; x < w; x++) a[y][x] = " ";
    }

    for (let i = 0; i < 100; i++) {
        for (const r of input) {
            r.px = mod(r.px + r.vx, w);
            r.py = mod(r.py + r.vy, h);
        }
    }

    const wh = (w - 1) / 2;
    const hh = (h - 1) / 2;

    const q: number[] = [0, 0, 0, 0];
    for (const r of input) {
        if (r.px < wh && r.py < hh) q[0]++;
        else if (r.px < wh && r.py > hh) q[1]++;
        else if (r.px > wh && r.py < hh) q[2]++;
        else if (r.px > wh && r.py > hh) q[3]++;
    }
    return q[0] * q[1] * q[2] * q[3];
}
