import Heap from "heap-js";

function costFirstSearch(input: number[][], endX: number, endY: number) {
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
