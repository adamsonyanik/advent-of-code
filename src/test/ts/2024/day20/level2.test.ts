import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";
import Heap from "heap-js";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l, y) => l.split("").map((s, x) => ({ s, x, y, distStart: -1, distEnd: -1 })));

    const dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];

    let start: (typeof input)[number][number] = { s: "", x: 0, y: 0, distStart: 0, distEnd: 0 };
    let end: (typeof input)[number][number] = { s: "", x: 0, y: 0, distStart: 0, distEnd: 0 };

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x].s == "S") start = input[y][x];
            if (input[y][x].s == "E") end = input[y][x];
        }
    }

    let queue = Heap.heapify([{ node: start, dist: 0 }], (a, b) => a.dist - b.dist);
    let visited = new Set<(typeof input)[number][number]>();

    while (queue.length > 0) {
        const current = queue.pop()! as { node: (typeof input)[number][number]; dist: number };

        if (visited.has(current.node)) continue;
        visited.add(current.node);
        current.node.distStart = current.dist;

        for (const dir of dirs) {
            const next = { x: current.node.x + dir.x, y: current.node.y + dir.y };
            if (input[next.y][next.x].s !== "#" && !visited.has(input[next.y][next.x]))
                queue.push({ node: input[next.y][next.x], dist: current.dist + 1 });
        }
    }

    queue = Heap.heapify([{ node: end, dist: 0 }], (a, b) => a.dist - b.dist);
    visited = new Set<(typeof input)[number][number]>();

    while (queue.length > 0) {
        const current = queue.pop()! as { node: (typeof input)[number][number]; dist: number };

        if (visited.has(current.node)) continue;
        visited.add(current.node);
        current.node.distEnd = current.dist;

        for (const dir of dirs) {
            const next = { x: current.node.x + dir.x, y: current.node.y + dir.y };
            if (input[next.y][next.x].s !== "#" && !visited.has(input[next.y][next.x]))
                queue.push({ node: input[next.y][next.x], dist: current.dist + 1 });
        }
    }

    const maxTime = 20;
    const time = end.distStart;
    let cheats = new Map<number, number>();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x].s == "#") continue;

            for (let yI = y - maxTime; yI <= y + maxTime; yI++) {
                if (yI < 0 || yI >= input.length) continue;
                for (let xI = x - maxTime; xI <= x + maxTime; xI++) {
                    const length = Math.abs(x - xI) + Math.abs(y - yI);
                    if (xI < 0 || xI >= input[0].length || length > maxTime) continue;
                    if (input[yI][xI].s == "#") continue;

                    const trackLength = input[y]?.[x]?.distStart + input[yI]?.[xI]?.distEnd + length;
                    if (trackLength < time) {
                        const d = time - trackLength;
                        if (!cheats.has(d)) cheats.set(d, 0);
                        cheats.set(d, cheats.get(d)! + 1);
                    }
                }
            }
        }
    }

    let counter = 0;
    for (const [time, c] of cheats) if (time >= 100) counter += c;

    return counter;
}
