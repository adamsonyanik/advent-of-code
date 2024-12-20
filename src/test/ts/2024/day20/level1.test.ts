import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";
import Heap from "heap-js";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

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

    const time = end.distStart;
    let cheats = new Map<number, number>();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (
                input[y]?.[x]?.s != "#" &&
                input[y]?.[x + 2]?.s != "#" &&
                input[y]?.[x + 2]?.distStart + input[y]?.[x]?.distEnd + 2 < time
            ) {
                const d = time - (input[y]?.[x + 2]?.distStart + input[y]?.[x]?.distEnd + 2);
                if (!cheats.has(d)) cheats.set(d, 0);
                cheats.set(d, cheats.get(d)! + 1);
            }

            if (
                input[y]?.[x]?.s != "#" &&
                input[y]?.[x + 2]?.s != "#" &&
                input[y]?.[x + 2]?.distEnd + input[y]?.[x]?.distStart + 2 < time
            ) {
                const d = time - (input[y]?.[x + 2]?.distEnd + input[y]?.[x]?.distStart + 2);
                if (!cheats.has(d)) cheats.set(d, 0);
                cheats.set(d, cheats.get(d)! + 1);
            }

            if (
                input[y]?.[x]?.s != "#" &&
                input[y + 2]?.[x]?.s != "#" &&
                input[y]?.[x]?.distStart + input[y + 2]?.[x]?.distEnd + 2 < time
            ) {
                const d = time - (input[y]?.[x]?.distStart + input[y + 2]?.[x]?.distEnd + 2);
                if (!cheats.has(d)) cheats.set(d, 0);
                cheats.set(d, cheats.get(d)! + 1);
            }

            if (
                input[y]?.[x]?.s != "#" &&
                input[y + 2]?.[x]?.s != "#" &&
                input[y]?.[x]?.distEnd + input[y + 2]?.[x]?.distStart + 2 < time
            ) {
                const d = time - (input[y]?.[x]?.distEnd + input[y + 2]?.[x]?.distStart + 2);
                if (!cheats.has(d)) cheats.set(d, 0);
                cheats.set(d, cheats.get(d)! + 1);
            }
        }
    }

    let counter = 0;
    for (const [time, c] of cheats) if (time >= 100) counter += c;

    return counter;
}
