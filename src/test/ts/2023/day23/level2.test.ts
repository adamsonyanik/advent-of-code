import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());

    const graph = new Map<
        string,
        { id: string; x: number; y: number; neighbors: Map<string, { id: string; weight: number }> }
    >();
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == "#") continue;

            const neighbors = new Map<string, { id: string; weight: number }>();
            for (const dir of [
                { x: 0, y: -1 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 }
            ]) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                if (nx < 0 || nx >= input[0].length || ny < 0 || ny >= input.length) continue;
                if (input[ny][nx] == "#") continue;

                neighbors.set([nx, ny].join(), { id: [nx, ny].join(), weight: 1 });
            }
            graph.set([x, y].join(), { id: [x, y].join(), x, y, neighbors });
        }
    }

    let contracted = true;
    while (contracted) {
        contracted = false;
        for (const node of graph.values()) {
            if (node.neighbors.size != 2) continue;

            contracted = true;
            const neighbors = [...node.neighbors.values()];

            const prevNode = graph.get(neighbors[0].id)!;
            const nextNode = graph.get(neighbors[1].id)!;
            graph.delete(node.id);
            prevNode.neighbors.delete(node.id);
            nextNode.neighbors.delete(node.id);

            const weight = neighbors[0].weight + neighbors[1].weight;
            prevNode.neighbors.set(nextNode.id, { id: nextNode.id, weight });
            nextNode.neighbors.set(prevNode.id, { id: prevNode.id, weight });
        }
    }

    let longest = 0;
    let found = 0;

    const open: { id: string; x: number; y: number; length: number; visited: Set<string> }[] = [
        { id: "1,0", x: 1, y: 0, length: 0, visited: new Set() }
    ];
    while (open.length) {
        const pos = open.pop()!;

        if (pos.y == input.length - 1) {
            found++;
            if (found % 40000 == 0) console.log(found);

            if (longest < pos.length) longest = pos.length;
            continue;
        }

        const gNode = graph.get(pos.id)!;
        for (const n of gNode.neighbors.values()) {
            if (pos.visited.has(n.id)) continue;

            const nNode = graph.get(n.id)!;

            const visited = new Set(pos.visited);
            visited.add(nNode.id);

            open.push({ id: nNode.id, x: nNode.x, y: nNode.y, length: pos.length + n.weight, visited });
        }
    }

    return longest;
}
