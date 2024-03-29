import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => [l.words(), l.words().reverse()])
        .flat()
        .bucket((s) => s[0])
        .map((n) => ({
            id: n.hash,
            neighbors: n.items.map((s) => s[1]).flat(),
            isSmall: n.hash !== n.hash.toUpperCase()
        }))
        .toMap((n) => n.id);

    const paths = [];

    function follow(id: string, visited: string[]): void {
        if (id == "end") {
            paths.push(visited);
            return;
        }
        const node = input.get(id)!;

        if (
            ((id == "start" || id == "end") && visited.includes(id)) ||
            (node.isSmall &&
                visited.includes(id) &&
                visited
                    .filter((w) => w !== w.toUpperCase())
                    .bucket()
                    .map((i) => i.size)
                    .includes(2))
        )
            return;

        for (const nei of node.neighbors) {
            follow(nei, [...visited, id]);
        }
    }

    follow("start", []);
    return paths.length;
}
