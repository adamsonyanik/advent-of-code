import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

type Node = { x: number; y: number; n: { node: Node; len: number; isX: boolean }[] };

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l.split(""));

    const dirs = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 }
    ];

    let start: Node = { x: 0, y: 0, n: [] };
    let end: Node = { x: 0, y: 0, n: [] };

    const nodes: Node[] = [];

    for (let y = 1; y < input.length - 1; y++)
        for (let x = 1; x < input[0].length - 1; x++) {
            let crossCount = 0;
            for (const d of dirs) if (input[y + d.y][x + d.x] != "#") crossCount++;
            if (
                crossCount == 2 &&
                !(
                    (input[y + 1][x] != "#" && input[y - 1][x] != "#") ||
                    (input[y][x + 1] != "#" && input[y][x - 1] != "#")
                )
            )
                crossCount++;

            if (crossCount > 2 || input[y][x] == "S" || input[y][x] == "E") {
                const n = { x, y, n: [] };
                if (input[y][x] == "S") start = n;
                if (input[y][x] == "E") end = n;
                nodes.push(n);
            }
        }

    for (const n of nodes) {
        nodeLoop: for (const n2 of nodes) {
            if (n == n2) continue;
            if (n.x != n2.x && n.y != n2.y) continue;

            if (n.x != n2.x) {
                for (let i = Math.min(n.x, n2.x); i < Math.max(n.x, n2.x); i++)
                    if (input[n.y][i] == "#") continue nodeLoop;
            } else
                for (let i = Math.min(n.y, n2.y); i < Math.max(n.y, n2.y); i++)
                    if (input[i][n.x] == "#") continue nodeLoop;

            n.n.push({ node: n2, isX: n.x != n2.x, len: Math.abs(n.x - n2.x) + Math.abs(n.y - n2.y) });
        }
    }

    function heuristicPoints(p: { path: Node[]; n: Node; isX: boolean; points: number }) {
        return p.points;
    }

    function addToOpenList(p: { path: Node[]; n: Node; isX: boolean; points: number }) {
        const h = heuristicPoints;
        for (let i = 0; i < open.length; i++) {
            if (h(open[i]) > h(p)) {
                open.splice(i, 0, p);
                return;
            }
        }

        open.push(p);
    }

    const open: { path: Node[]; n: Node; isX: boolean; points: number }[] = [
        { path: [], n: start, isX: true, points: 0 }
    ];

    while (open.length > 0) {
        const next = open.shift()!;
        next.path.push(next.n);

        if (next.n == end) return next.points;

        for (const nei of next.n.n)
            if (!next.path.includes(nei.node))
                addToOpenList({
                    path: [...next.path],
                    n: nei.node,
                    isX: nei.isX,
                    points: next.points + (next.isX == nei.isX ? 0 : 1000) + nei.len
                });
    }

    return nodes.length;
}
