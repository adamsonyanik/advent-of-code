import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const size = _isExample ? 7 : 71;
    const fallingBytes = _isExample ? 12 : 1024;

    const dirs = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 }
    ];

    const map: string[][] = [];

    for (let y = 0; y < size; y++) {
        map[y] = [];
        for (let x = 0; x < size; x++) map[y][x] = ".";
    }

    const input = _input.lines().map((l) => l.numbers());
    for (let iB = 0; iB < fallingBytes; iB++) map[input[iB][1]][input[iB][0]] = "#";

    const visitedSet = new Set<string>("0,0");
    const open = [{ x: 0, y: 0, l: 0 }];

    while (open.length > 0) {
        const next = open.shift()!;
        for (const d of dirs) {
            const newPos = { x: next.x + d.x, y: next.y + d.y, l: next.l + 1 };

            if (newPos.x == size - 1 && newPos.y == size - 1) return newPos.l;

            if (map[newPos.y] && map[newPos.y][newPos.x] == "." && !visitedSet.has(newPos.x + "," + newPos.y)) {
                visitedSet.add(newPos.x + "," + newPos.y);
                open.push(newPos);
            }
        }
    }
    return 0;
}
