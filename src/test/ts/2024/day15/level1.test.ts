import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l);

    const map: string[][] = [];
    const moves: (">" | "^" | "<" | "v")[] = [];

    const dirs = { ">": { x: 1, y: 0 }, "<": { x: -1, y: 0 }, "^": { x: 0, y: -1 }, v: { x: 0, y: 1 } };

    for (const l of input)
        if (l.startsWith("#")) map.push(l.split(""));
        else moves.push(...(l.split("") as [">" | "^" | "<" | "v"]));

    const robot = { x: 0, y: 0 };
    outer: for (let y = 0; y < map.length; y++)
        for (let x = 0; x < map[0].length; x++)
            if (map[y][x] == "@") {
                robot.x = x;
                robot.y = y;
                break outer;
            }

    function move(x: number, y: number, dir: ">" | "^" | "<" | "v"): boolean {
        const d = dirs[dir];
        if (map[y + d.y][x + d.x] == "#") return false;
        if (map[y + d.y][x + d.x] == "." || move(x + d.x, y + d.y, dir)) {
            const t = map[y + d.y][x + d.x];
            map[y + d.y][x + d.x] = map[y][x];
            map[y][x] = t;
            return true;
        }

        return false;
    }

    for (const m of moves) {
        if (move(robot.x, robot.y, m)) {
            robot.x += dirs[m].x;
            robot.y += dirs[m].y;
        }
    }

    let counter = 0;
    for (let y = 0; y < map.length; y++)
        for (let x = 0; x < map[0].length; x++) if (map[y][x] == "O") counter += y * 100 + x;

    return counter;
}
