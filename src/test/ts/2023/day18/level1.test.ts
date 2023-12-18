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

    let pos = { x: 0, y: 0 };
    const coords = [{ x: 0, y: 0 }];

    for (const ins of input) {
        if (ins.dir == "R") for (let i = 0; i < ins.len; i++) coords.push({ x: ++pos.x, y: pos.y });
        if (ins.dir == "U") for (let i = 0; i < ins.len; i++) coords.push({ x: pos.x, y: --pos.y });
        if (ins.dir == "L") for (let i = 0; i < ins.len; i++) coords.push({ x: --pos.x, y: pos.y });
        if (ins.dir == "D") for (let i = 0; i < ins.len; i++) coords.push({ x: pos.x, y: ++pos.y });
    }

    const minX = coords.map((c) => c.x).min();
    const minY = coords.map((c) => c.y).min();
    const maxX = coords.map((c) => c.x).max();
    const maxY = coords.map((c) => c.y).max();

    const grid: string[][] = [];
    for (let y = minY; y <= maxY; y++) {
        grid.push([]);
        for (let x = minX - 1; x <= maxX; x++) {
            if (coords.filter((c) => c.x == x && c.y == y).length > 0) {
                grid.at(-1)!.push("#");
            } else {
                grid.at(-1)!.push(".");
            }
        }
    }

    const open: { x: number; y: number }[] = [{ x: -minX + coords[0].x + 2, y: -minY + coords[0].y + 1 }]; //[{ x: 1, y: 1 }];
    const closed = new Set<string>();

    while (open.length) {
        const pos = open.pop()!;
        if (closed.has(pos.x + "," + pos.y)) continue;
        closed.add(pos.x + "," + pos.y);

        for (const dir of [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ]) {
            const x = pos.x + dir.x;
            const y = pos.y + dir.y;
            if (grid[y] && grid[y][x] != "#") {
                grid[y][x] = "#";
                open.push({ x, y });
            }
        }
    }

    return grid.map((r) => r.filter((c) => c == "#").length).sum();
}
