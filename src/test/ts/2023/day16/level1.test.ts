import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());
    const grid: string[][] = [];
    for (const l of input) {
        grid.push([]);
        for (const c of l) grid[grid.length - 1].push(" ");
    }

    const allBeams: { x: number; y: number; dir: string }[] = [];
    const beams: { x: number; y: number; dir: string }[] = [];
    addBeam({ x: 0, y: 0, dir: "r" });

    while (beams.length > 0) {
        for (const beam of beams) {
            if (
                beam.x < 0 ||
                beam.x == input[0].length ||
                beam.y < 0 ||
                beam.y == input.length ||
                allBeams.find((b) => b.x == beam.x && b.y == beam.y && b.dir == beam.dir) !== undefined
            ) {
                beams.splice(
                    beams.findIndex((b) => b.x == beam.x && b.y == beam.y && b.dir == beam.dir),
                    1
                );
                continue;
            }

            grid[beam.y][beam.x] = "#";
            allBeams.push({ ...beam });

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
    function addBeam(beam: { x: number; y: number; dir: string }) {
        if (allBeams.find((b) => b.x == beam.x && b.y == beam.y && b.dir == beam.dir) == undefined) {
            beams.push(beam);
        }
    }

    return grid.map((l) => l.filter((c) => c == "#").length).sum();
}
