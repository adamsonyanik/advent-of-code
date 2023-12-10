import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

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
    return grid.map((r) => r.map((c) => (c == "." ? -1 : c)).max()).max() / 2;
}
