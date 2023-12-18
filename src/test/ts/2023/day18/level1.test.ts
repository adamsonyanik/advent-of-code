import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => ({
        dir: l.split(" ")[0],
        len: Number(l.split(" ")[1])
    }));

    const coords = new Set<string>();
    let pos = { x: 0, y: 0 };

    for (const ins of input) {
        if (ins.dir == "R") for (let i = 0; i < ins.len; i++) coords.add(++pos.x + "," + pos.y);
        if (ins.dir == "U") for (let i = 0; i < ins.len; i++) coords.add(pos.x + "," + --pos.y);
        if (ins.dir == "L") for (let i = 0; i < ins.len; i++) coords.add(--pos.x + "," + pos.y);
        if (ins.dir == "D") for (let i = 0; i < ins.len; i++) coords.add(pos.x + "," + ++pos.y);
    }

    const open: { x: number; y: number }[] = [{ x: 2, y: 1 }];
    while (open.length) {
        const pos = open.pop()!;
        if (coords.has(pos.x + "," + pos.y)) continue;
        coords.add(pos.x + "," + pos.y);

        for (const dir of [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ])
            open.push({ x: pos.x + dir.x, y: pos.y + dir.y });
    }

    return coords.size;
}
