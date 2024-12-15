import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l);

    const map: string[][] = [];
    const moves: (">" | "^" | "<" | "v")[] = [];

    const dirs = { ">": { x: 1, y: 0 }, "<": { x: -1, y: 0 }, "^": { x: 0, y: -1 }, v: { x: 0, y: 1 } };

    for (const l of input)
        if (l.startsWith("#"))
            map.push(
                l
                    .split("")
                    .map((n) => {
                        if (n == "#") return "##";
                        if (n == "O") return "[]";
                        if (n == ".") return "..";
                        else return "@.";
                    })
                    .join("")
                    .split("")
            );
        else moves.push(...(l.split("") as [">" | "^" | "<" | "v"]));

    const robot = { x: 0, y: 0 };
    outer: for (let y = 0; y < map.length; y++)
        for (let x = 0; x < map[0].length; x++)
            if (map[y][x] == "@") {
                robot.x = x;
                robot.y = y;
                break outer;
            }

    function swap(x: number, y: number, dx: number, dy: number) {
        const t = map[y + dy][x + dx];
        map[y + dy][x + dx] = map[y][x];
        map[y][x] = t;
    }
    function mergePos(a: { x: number; y: number }[], b: { x: number; y: number }[]) {
        const r = [...a];
        for (const eb of b) if (r.filter((a) => a.x == eb.x && a.y == eb.y).length == 0) r.push(eb);
        return r;
    }

    function move(x: number, y: number, dir: ">" | "^" | "<" | "v"): { x: number; y: number }[] {
        const d = dirs[dir];
        if (map[y + d.y][x + d.x] == "#") return [];
        if (map[y + d.y][x + d.x] == ".") return [{ x, y }];

        if (dir == ">" || dir == "<") {
            const m = move(x + d.x, y + d.y, dir);
            if (m.length > 0) return mergePos(m, [{ x, y }]);
        }
        if (dir == "^" || dir == "v") {
            const boxX = map[y + d.y][x + d.x] == "[" ? x : x - 1;
            const m1 = move(boxX + d.x, y + d.y, dir);
            const m2 = move(boxX + 1 + d.x, y + d.y, dir);
            if (m1.length > 0 && m2.length > 0) return mergePos(mergePos(m1, m2), [{ x, y }]);
        }

        return [];
    }

    for (const m of moves) {
        const pos = move(robot.x, robot.y, m);
        if (pos.length > 0) {
            robot.x += dirs[m].x;
            robot.y += dirs[m].y;
        }
        for (const p of pos) swap(p.x, p.y, dirs[m].x, dirs[m].y);
    }

    let counter = 0;
    for (let y = 0; y < map.length; y++)
        for (let x = 0; x < map[0].length; x++) if (map[y][x] == "[") counter += y * 100 + x;

    return counter;
}
