import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => l.split("@").map((n) => ({ x: n.numbers()[0], y: n.numbers()[1], z: n.numbers()[2] })))
        .map((p) => ({ p: p[0], v: p[1] }));

    const test = { min: 200000000000000, max: 400000000000000 };
    //const test = { min: 7, max: 27 };

    const matches = [];

    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const x1x3 = input[i].p.x - input[j].p.x;
            const y1y3 = input[i].p.y - input[j].p.y;

            const x1x2 = -input[i].v.x;
            const y1y2 = -input[i].v.y;

            const x3x4 = -input[j].v.x;
            const y3y4 = -input[j].v.y;

            const t = (x1x3 * y3y4 - y1y3 * x3x4) / (x1x2 * y3y4 - y1y2 * x3x4);
            const u = (x1x3 * y1y2 - y1y3 * x1x2) / (x1x2 * y3y4 - y1y2 * x3x4);

            const pointX = input[i].p.x + input[i].v.x * t;
            const pointY = input[i].p.y + input[i].v.y * t;

            if (
                t >= 0 &&
                u >= 0 &&
                pointX >= test.min &&
                pointX <= test.max &&
                pointY >= test.min &&
                pointY <= test.max
            )
                matches.push({ x: pointX, y: pointY, a: _input.lines()[i], b: _input.lines()[j] });
        }
    }

    return matches.length;
}
