import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

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
        let perimeter = new Set<string>();

        while (open.length > 0) {
            const c = open.pop()!;
            visited.add(c.x + "," + c.y);

            for (let i = 0; i < dirs.length; i++) {
                const d = dirs[i];
                if (input[c.y + d.y] && input[c.y + d.y][c.x + d.x] == region) {
                    if (!openSet.has(c.x + d.x + "," + (c.y + d.y))) {
                        open.push({ x: c.x + d.x, y: c.y + d.y });
                        openSet.add(c.x + d.x + "," + (c.y + d.y));
                    }
                } else perimeter.add(c.x + d.x + "," + (c.y + d.y) + "," + i);
            }
        }

        return { pos: visited, perimeter, area: visited.size };
    }

    function getPerimeterSides(perimeters: Set<string>) {
        const pMap: number[][][] = [];

        for (let y = -1; y < input.length + 1; y++) {
            pMap[y] = [];
            for (let x = -1; x < input[0].length + 1; x++) pMap[y][x] = [];
        }

        for (const p of perimeters) {
            const [x, y, d] = p.split(",");
            pMap[Number(y)][Number(x)].push(Number(d));
        }

        let sides = 0;
        const seenPerimeters = new Set<string>();
        for (const p of perimeters) {
            if (seenPerimeters.has(p)) continue;
            const [x, y, d] = p.split(",");
            const side = getPerimeterSide(pMap, Number(x), Number(y), Number(d));
            sides++;
            for (const pos of side) seenPerimeters.add(pos + "," + d);
        }

        return sides;
    }

    function getPerimeterSide(pMap: number[][][], x: number, y: number, dir: number) {
        const visited = new Set<string>();
        const open = [{ x, y }];
        const openSet = new Set([x + "," + y]);

        while (open.length > 0) {
            const c = open.pop()!;
            visited.add(c.x + "," + c.y);

            for (let i = 0; i < dirs.length; i++) {
                const d = dirs[i];
                if (pMap[c.y + d.y] && pMap[c.y + d.y][c.x + d.x] && pMap[c.y + d.y][c.x + d.x].includes(dir)) {
                    if (!openSet.has(c.x + d.x + "," + (c.y + d.y))) {
                        open.push({ x: c.x + d.x, y: c.y + d.y });
                        openSet.add(c.x + d.x + "," + (c.y + d.y));
                    }
                }
            }
        }

        return visited;
    }

    let counter = 0;
    const alreadyInRegion = new Set();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (alreadyInRegion.has(x + "," + y)) continue;
            const region = getRegion(x, y);
            for (const p of region.pos) alreadyInRegion.add(p);

            const sides = getPerimeterSides(region.perimeter);
            counter += sides * region.area;
        }
    }
    return counter;
}
