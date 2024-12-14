import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";
import { mod } from "../../../../utils/math";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

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

    for (let i = 0; i < 10000; i++) {
        for (const r of input) a[r.py][r.px] = " ";
        for (const r of input) {
            r.px = mod(r.px + r.vx, w);
            r.py = mod(r.py + r.vy, h);

            a[r.py][r.px] = "X";
        }

        for (let y = 0; y < h; y++)
            if (a[y].join("").includes("XXXXXXX")) {
                console.log(i + 1 + "\n" + a.map((y) => y.join("")).join("\n"));
                break;
            }
    }
}
