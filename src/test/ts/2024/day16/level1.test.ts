import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";
import { mod } from "../../../../utils/math";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l.split(""));

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == "S") {
                startX = x;
                startY = y;
            }
            if (input[y][x] == "E") {
                endX = x;
                endY = y;
            }
        }

    const dirs = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 }
    ];

    let shortestPath;

    function heuristicPointsAndManhattan(p: { path: string[]; x: number; y: number; dir: number; points: number }) {
        return p.points + Math.abs(p.x - endX) + Math.abs(p.y - endY);
    }

    function heuristicPoints(p: { path: string[]; x: number; y: number; dir: number; points: number }) {
        return p.points;
    }

    function addToOpenList(p: { path: string[]; x: number; y: number; dir: number; points: number }) {
        const h = heuristicPoints;
        for (let i = 0; i < open.length; i++) {
            if (h(open[i]) > h(p)) {
                open.splice(i, 0, p);
                for (let ind = i + 1; ind < open.length; ind++)
                    if (open[ind].x == p.x && open[ind].y == p.y && open[ind].dir == p.dir) {
                        open.splice(ind, 1);
                        i--;
                    }
                return;
            }
            if (open[i].x == p.x && open[i].y == p.y && open[i].dir == p.dir) {
                return;
            }
        }

        open.push(p);
    }

    const open: { path: string[]; x: number; y: number; dir: number; points: number }[] = [
        { path: [], x: startX, y: startY, dir: 0, points: 0 }
    ];
    while (open.length > 0) {
        const next = open.shift()!;
        next.path.push(next.x + "," + next.y + "," + next.dir);
        if (next.x == endX && next.y == endY) {
            shortestPath = next;
            break;
        }

        for (const d of [-1, 1]) {
            const newDir = mod(next.dir + d, 4);
            if (
                input[next.y + dirs[newDir].y] &&
                input[next.y + dirs[newDir].y][next.x + dirs[newDir].x] != "#" &&
                !next.path.includes(next.x + "," + next.y + "," + newDir)
            )
                addToOpenList({ path: [...next.path], x: next.x, y: next.y, dir: newDir, points: next.points + 1000 });
        }

        let newX = next.x + dirs[next.dir].x;
        let newY = next.y + dirs[next.dir].y;
        if (input[newY] && input[newY][newX] != "#") {
            let lX = newX + dirs[mod(next.dir - 1, 4)].x;
            let lY = newY + dirs[mod(next.dir - 1, 4)].y;
            let rX = newX + dirs[mod(next.dir + 1, 4)].x;
            let rY = newY + dirs[mod(next.dir + 1, 4)].y;

            while (
                input[lY] &&
                input[lY][lX] == "#" &&
                input[rY] &&
                input[rY][rX] == "#" &&
                input[newY + dirs[next.dir].y] &&
                input[newY + dirs[next.dir].y][newX + dirs[next.dir].x] != "#"
            ) {
                newX = newX + dirs[next.dir].x;
                newY = newY + dirs[next.dir].y;

                lX = newX + dirs[mod(next.dir - 1, 4)].x;
                lY = newY + dirs[mod(next.dir - 1, 4)].y;
                rX = newX + dirs[mod(next.dir + 1, 4)].x;
                rY = newY + dirs[mod(next.dir + 1, 4)].y;
            }
            if (!next.path.includes(newX + "," + newY + "," + next.dir))
                addToOpenList({
                    path: [...next.path],
                    x: newX,
                    y: newY,
                    dir: next.dir,
                    points: next.points + Math.abs(next.x - newX) + Math.abs(next.y - newY)
                });
        }
    }

    return shortestPath?.points;
}
