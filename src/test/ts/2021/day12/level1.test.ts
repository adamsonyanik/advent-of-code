import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

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
