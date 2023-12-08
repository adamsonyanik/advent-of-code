import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

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

        if (node.isSmall && visited.includes(id)) return;

        for (const nei of node.neighbors) {
            follow(nei, [...visited, id]);
        }
    }

    follow("start", []);
    return paths.length;
}
