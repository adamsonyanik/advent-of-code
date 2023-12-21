import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());

    let s = { x: -1, y: -1 };
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[0].length; x++) if (input[y][x] == "S") s = { x, y };

    const open: { x: number; y: number; dist: number }[] = [{ x: s.x, y: s.y, dist: 0 }];
    const closed = new Map<string, { x: number; y: number; dist: number }>();

    while (open.length && open[0].dist <= 64) {
        const pos = open.shift()!;
        if (input[pos.y] == undefined || input[pos.y][pos.x] == "#") continue;
        if (closed.has([pos.x, pos.y].join())) continue;
        closed.set([pos.x, pos.y].join(), pos);

        for (const dir of [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ])
            open.push({ x: pos.x + dir.x, y: pos.y + dir.y, dist: pos.dist + 1 });
    }
    return [...closed.values()].filter((p) => p.dist % 2 == 0).length;
}
