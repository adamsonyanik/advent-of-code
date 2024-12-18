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

    function dijkstra() {
        const distance = new Map<Node, { v: Node; dFronX: number; dFronY: number; p: Node[] }>();
        for (const n of nodes) distance.set(n, { v: n, dFronX: Infinity, dFronY: Infinity, p: [] });

        distance.get(start)!.dFronX = 0;
        distance.get(start)!.dFronY = 1000;

        const Q = [...distance.values()].sort((a, b) => Math.min(a.dFronX, a.dFronY) - Math.min(b.dFronX, b.dFronY));

        while (Q.length > 0) {
            const u = Q.shift()!;
            if (Q.length % 100 == 0) console.log(Q.length);

            const fromX = u.dFronX <= u.dFronY;
            nLoop: for (const v of u.v.n) {
                const qVI = Q.findIndex((e) => e.v == v.node);
                if (qVI == -1) continue;

                const vNode = distance.get(v.node)!;
                const vD = v.isX ? vNode.dFronX : vNode.dFronY;
                const alt = (fromX ? u.dFronX : u.dFronY) + v.len + (fromX == v.isX ? 0 : 1000);
                if (alt <= vD) {
                    if (v.isX) vNode.dFronX = alt;
                    else vNode.dFronY = alt;

                    if (alt < vD) vNode.p = [];
                    vNode.p.push(u.v);

                    const qEl = Q.splice(qVI, 1)[0];
                    for (let i = 0; i < Q.length; i++) {
                        if (Math.min(Q[i].dFronX, Q[i].dFronY) > alt) {
                            Q.splice(i, 0, qEl);
                            continue nLoop;
                        }
                    }
                    Q.push(qEl);
                }
            }
        }
        return distance;
    }

    const d = dijkstra();

    const tileSet = new Set<string>();

    const open = d.get(end)!.p.map((p) => ({ s: end, e: p }));
    while (open.length > 0) {
        const next = open.pop()!;
        for (let y = Math.min(next.s.y, next.e.y); y <= Math.max(next.s.y, next.e.y); y++)
            for (let x = Math.min(next.s.x, next.e.x); x <= Math.max(next.s.x, next.e.x); x++) {
                input[y][x] = "O";
                tileSet.add(x + "," + y);
            }
        for (const p of d.get(next.e)!.p) open.push({ s: next.e, e: p });
    }

    return tileSet.size;
}
