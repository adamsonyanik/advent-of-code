import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());
    const grid: string[][] = [];
    for (const l of input) {
        grid.push([]);
        for (const c of l) grid[grid.length - 1].push(" ");
    }

    function energize(start: { x: number; y: number; dir: string }) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) grid[y][x] = " ";
        }

        const allBeams = new Set<string>();
        const beams: { x: number; y: number; dir: string }[] = [];
        addBeam({ ...start });

        while (beams.length > 0) {
            for (const beam of beams) {
                if (
                    beam.x < 0 ||
                    beam.x == input[0].length ||
                    beam.y < 0 ||
                    beam.y == input.length ||
                    allBeams.has(beam.x + "," + beam.y + "," + beam.dir)
                ) {
                    beams.splice(
                        beams.findIndex((b) => b.x == beam.x && b.y == beam.y && b.dir == beam.dir),
                        1
                    );
                    continue;
                }

                grid[beam.y][beam.x] = "#";
                allBeams.add(beam.x + "," + beam.y + "," + beam.dir);

                if (beam.dir == "r") {
                    if (input[beam.y][beam.x] == ".") beam.x++;
                    else if (input[beam.y][beam.x] == "|") {
                        addBeam({ x: beam.x, y: beam.y + 1, dir: "b" });
                        beam.y--;
                        beam.dir = "t";
                    } else if (input[beam.y][beam.x] == "-") beam.x++;
                    else if (input[beam.y][beam.x] == "/") {
                        beam.y--;
                        beam.dir = "t";
                    } else if (input[beam.y][beam.x] == "\\") {
                        beam.y++;
                        beam.dir = "b";
                    }
                } else if (beam.dir == "l") {
                    if (input[beam.y][beam.x] == ".") beam.x--;
                    else if (input[beam.y][beam.x] == "|") {
                        addBeam({ x: beam.x, y: beam.y + 1, dir: "b" });
                        beam.y--;
                        beam.dir = "t";
                    } else if (input[beam.y][beam.x] == "-") beam.x--;
                    else if (input[beam.y][beam.x] == "/") {
                        beam.y++;
                        beam.dir = "b";
                    } else if (input[beam.y][beam.x] == "\\") {
                        beam.y--;
                        beam.dir = "t";
                    }
                } else if (beam.dir == "t") {
                    if (input[beam.y][beam.x] == ".") beam.y--;
                    else if (input[beam.y][beam.x] == "|") beam.y--;
                    else if (input[beam.y][beam.x] == "-") {
                        addBeam({ x: beam.x + 1, y: beam.y, dir: "r" });
                        beam.x--;
                        beam.dir = "l";
                    } else if (input[beam.y][beam.x] == "/") {
                        beam.x++;
                        beam.dir = "r";
                    } else if (input[beam.y][beam.x] == "\\") {
                        beam.x--;
                        beam.dir = "l";
                    }
                } else if (beam.dir == "b") {
                    if (input[beam.y][beam.x] == ".") beam.y++;
                    else if (input[beam.y][beam.x] == "|") beam.y++;
                    else if (input[beam.y][beam.x] == "-") {
                        addBeam({ x: beam.x + 1, y: beam.y, dir: "r" });
                        beam.x--;
                        beam.dir = "l";
                    } else if (input[beam.y][beam.x] == "/") {
                        beam.x--;
                        beam.dir = "l";
                    } else if (input[beam.y][beam.x] == "\\") {
                        beam.x++;
                        beam.dir = "r";
                    }
                }
            }
        }
        return grid.map((l) => l.filter((c) => c == "#").length).sum();
        function addBeam(beam: { x: number; y: number; dir: string }) {
            if (!allBeams.has(beam.x + "," + beam.y + "," + beam.dir)) beams.push(beam);
        }
    }

    const startBeams = [];

    for (let y = 0; y < input.length; y++) {
        startBeams.push({ x: 0, y, dir: "r" });
        startBeams.push({ x: input.length - 1, y, dir: "l" });
    }
    for (let x = 0; x < input[0].length; x++) {
        startBeams.push({ x, y: 0, dir: "b" });
        startBeams.push({ x, y: input[0].length - 1, dir: "t" });
    }

    return startBeams.map((s) => energize(s)).max();
}
