import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";
import Heap from "heap-js";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.digits());
    const open = new Heap<{ x: number; y: number; cost: number; dir: number; dirL: number }>((a, b) => a.cost - b.cost);
    open.init([{ x: 0, y: 0, cost: 0, dir: -1, dirL: -1 }]);
    const visited = new Set<string>();

    while (open.length) {
        const pos = open.pop()!;

        const posString = pos.x + "," + pos.y + "," + pos.dir + "," + pos.dirL;
        if (visited.has(posString)) continue;
        visited.add(posString);

        const dirs = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ];
        for (let i = 0; i < dirs.length; i++) {
            const newDirLength = i == pos.dir ? pos.dirL + 1 : 1;
            const lengthCorrect = newDirLength <= 10 && (pos.dirL == -1 || pos.dirL >= 4 || i == pos.dir);
            const isBackwards = [2, 3, 0, 1][pos.dir] == i;

            const x = pos.x + dirs[i].x;
            const y = pos.y + dirs[i].y;
            if (x >= 0 && x < input[0].length && y >= 0 && y < input.length && !isBackwards && lengthCorrect) {
                const cost = pos.cost + input[y][x];
                open.push({ x, y, cost, dir: i, dirL: newDirLength });
                if (x == input[0].length - 1 && y == input.length - 1 && newDirLength > 3) return cost;
            }
        }
    }
}
