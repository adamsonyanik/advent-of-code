import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) =>
        l.chars().map((c) => {
            switch (c) {
                case "|":
                    return 0;
                case "-":
                    return 1;
                case "L":
                    return 2;
                case "J":
                    return 3;
                case "7":
                    return 4;
                case "F":
                    return 5;
                case "S":
                    return 6;
                default:
                    return 7;
            }
        })
    );

    const pipeMap = [
        [0, undefined, 2, 3, undefined, undefined],
        [1, undefined, undefined, undefined, 3, 2],
        [undefined, 2, undefined, 1, 0, undefined],
        [undefined, 3, 1, undefined, undefined, 0]
    ];

    const dirMap = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 }
    ];

    const grid: (number | ".")[][] = [...input.map((r) => [...r])];
    for (let y = 0; y < grid.length; y++) for (let x = 0; x < grid[y].length; x++) grid[y][x] = ".";

    const queue = [];

    function followPipe(pos: { x: number; y: number }, dir: number, counter: number) {
        if (pos.x < 0 || pos.y < 0 || pos.x >= grid[0].length || pos.y >= grid.length) return;
        if (grid[pos.y][pos.x] != "." || input[pos.y][pos.x] == 7) return;

        const newDir = pipeMap[dir][input[pos.y][pos.x]];
        if (newDir == undefined) return;

        queue.push({
            pos: { x: pos.x + dirMap[newDir].x, y: pos.y + dirMap[newDir].y },
            dir: newDir,
            c: counter + 1
        });

        grid[pos.y][pos.x] = counter;
    }

    const s = { x: -1, y: -1 };
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[y].length; x++)
            if (input[y][x] == 6) {
                s.x = x;
                s.y = y;
                break;
            }

    grid[s.y][s.x] = 1;
    for (let i = 0; i < 4; i++) queue.push({ pos: { x: s.x + dirMap[i].x, y: s.y + dirMap[i].y }, dir: i, c: 2 });

    while (queue.length > 0) {
        const param = queue.pop()!;
        followPipe(param.pos, param.dir, param.c);
    }

    let pipes: ("." | string)[][] = grid.map((r, rI) =>
        r.map((c, cI) => {
            if (c == ".") return c;

            if (input[rI][cI] == 0) return grid[rI][cI] > grid[rI + 1][cI] ? "↓" : "↑";
            if (input[rI][cI] == 1) return grid[rI][cI] > grid[rI][cI + 1] ? "→" : "←";
            if (input[rI][cI] == 2) return grid[rI][cI] > grid[rI][cI + 1] ? "↘" : "↖";
            if (input[rI][cI] == 3) return grid[rI][cI] > grid[rI - 1][cI] ? "↗" : "↙";
            if (input[rI][cI] == 4) return grid[rI][cI] > grid[rI][cI - 1] ? "↖" : "↘";
            if (input[rI][cI] == 5) return grid[rI][cI] > grid[rI + 1][cI] ? "↙" : "↗";

            return c as unknown as string;
        })
    );

    for (let y = 0; y < grid.length; y++)
        for (let x = 0; x < grid[y].length; x++) {
            if (pipes[y][x] !== ".") continue;
            const cells = spread({ x, y });
            let inside = "I";

            if (
                cells.find((c) => c.x == 0 || c.x == grid[0].length - 1 || c.y == 0 || c.y == grid.length - 1) !=
                undefined
            )
                inside = "O";

            const top = cells.find(
                (c) =>
                    pipes[c.y - 1] != undefined &&
                    ["↑", "↓", "←", "→", "↗", "↙", "↖", "↘"].includes(pipes[c.y - 1][c.x])
            )!;
            if (inside == "O" || !["→", "↗", "↘"].includes(pipes[top.y - 1][top.x])) inside = "O";

            for (const c of cells) {
                pipes[c.y][c.x] = inside;
            }
        }

    function spread(pos: { x: number; y: number }) {
        const cells = [];
        const open = [pos];
        while (open.length > 0) {
            const current = open.pop()!;
            cells.push(current);

            for (const dir of dirMap) {
                const p = { x: dir.x + current.x, y: dir.y + current.y };
                if (pipes[p.y] != undefined && pipes[p.y][p.x] == ".")
                    if (cells.find((c) => c.x == p.x && c.y == p.y) == undefined) {
                        open.push(p);
                    }
            }
        }

        return cells;
    }

    return pipes.map((r, rI) => r.filter((c, cI) => c == "I").length).sum();
}
