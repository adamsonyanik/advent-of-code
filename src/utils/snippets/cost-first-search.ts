import Heap from "heap-js";

function costFirstSearchSnippet(input: number[][], endX: number, endY: number) {
    const open = new Heap<{ x: number; y: number; cost: number }>((a, b) => a.cost - b.cost);
    open.init([{ x: 0, y: 0, cost: 0 }]);
    const visited = new Set<string>();

    while (open.length) {
        const pos = open.pop()!;

        const posString = pos.x + "," + pos.y;
        if (visited.has(posString)) continue;
        visited.add(posString);

        const dirs = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ];
        for (let i = 0; i < dirs.length; i++) {
            const x = pos.x + dirs[i].x;
            const y = pos.y + dirs[i].y;
            if (x >= 0 && x < input[0].length && y >= 0 && y < input.length) {
                const cost = pos.cost + input[y][x];
                open.push({ x, y, cost });
                if (x == endX && y == endY) return cost;
            }
        }
    }
}

export function costFirstSearch<T extends { cost: number }>(
    init: T[],
    hash: (item: T) => string,
    getNeighbors: (item: T) => T[],
    endCondition: (item: T) => boolean
) {
    const open = new Heap<T>((a, b) => a.cost - b.cost);
    open.init(init);
    const visited = new Set<string>();

    while (open.length) {
        const pos = open.pop()!;
        const posHash = hash(pos);
        if (visited.has(posHash)) continue;
        visited.add(posHash);

        const neighbors = getNeighbors(pos);
        for (const n of neighbors) if (endCondition(n)) return n;
        open.push(...neighbors);
    }
}

function cfsSnippet(input: number[][]) {
    return costFirstSearch<{ x: number; y: number; cost: number; dir: number; dirL: number }>(
        [{ x: 0, y: 0, cost: 0, dir: -1, dirL: -1 }],
        (pos) => pos.x + "," + pos.y + "," + pos.dir + "," + pos.dirL,
        (pos) => {
            const neighbors = [];

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
                    neighbors.push({ x, y, cost, dir: i, dirL: newDirLength });
                }
            }
            return neighbors;
        },
        (pos) => pos.x == input[0].length - 1 && pos.y == input.length - 1 && pos.dirL > 3
    )?.cost;
}
