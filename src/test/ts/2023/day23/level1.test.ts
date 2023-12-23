import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());

    let longest: Set<string> = new Set<string>();

    const open: { x: number; y: number; visited: Set<string> }[] = [{ x: 1, y: 0, visited: new Set() }];
    while (open.length) {
        const pos = open.shift()!;

        if (pos.y == input.length - 1)
            if (longest.size < pos.visited.size) {
                longest = pos.visited;
                continue;
            }

        for (const dir of [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 }
        ]) {
            const x = pos.x + dir.x;
            const y = pos.y + dir.y;

            if (input[pos.y][pos.x] == ">" && dir.x != 1) continue;
            if (input[pos.y][pos.x] == "<" && dir.x != -1) continue;
            if (input[pos.y][pos.x] == "v" && dir.y != 1) continue;
            if (input[pos.y][pos.x] == "^" && dir.y != -1) continue;

            if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) continue;
            if (input[y][x] == "#") continue;
            if (pos.visited.has([x, y].join())) continue;

            const visited = new Set(pos.visited);
            visited.add([x, y].join());

            open.push({ x, y, visited });
        }
    }

    return longest.size;
}
