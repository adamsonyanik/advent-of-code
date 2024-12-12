import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(""));
    const dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];

    function getRegion(x: number, y: number) {
        const region = input[y][x];
        const visited = new Set<string>();
        const open = [{ x, y }];
        const openSet = new Set([x + "," + y]);
        let perimeter = 0;

        while (open.length > 0) {
            const c = open.pop()!;
            visited.add(c.x + "," + c.y);

            for (const d of dirs) {
                if (input[c.y + d.y] && input[c.y + d.y][c.x + d.x] == region) {
                    if (!openSet.has(c.x + d.x + "," + (c.y + d.y))) {
                        open.push({ x: c.x + d.x, y: c.y + d.y });
                        openSet.add(c.x + d.x + "," + (c.y + d.y));
                    }
                } else perimeter++;
            }
        }

        return { pos: visited, perimeter, area: visited.size };
    }

    let counter = 0;
    const alreadyInRegion = new Set();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (alreadyInRegion.has(x + "," + y)) continue;
            const region = getRegion(x, y);
            for (const p of region.pos) alreadyInRegion.add(p);
            counter += region.perimeter * region.area;
        }
    }
    return counter;
}
