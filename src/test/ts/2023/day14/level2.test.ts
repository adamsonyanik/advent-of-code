import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const ITERATIONS = 1000000000;
    const input = _input.lines().map((l) => l.chars());

    let lastGrid = "";
    let lastGrids: string[] = [];

    let it = 0;
    for (; it < ITERATIONS; it++) {
        doCycle();

        const thisGrid = JSON.stringify(input);
        if (lastGrids.includes(thisGrid)) {
            lastGrid = thisGrid;
            break;
        }

        lastGrids.push(thisGrid);
    }

    const loopLength = it - lastGrids.lastIndexOf(lastGrid);
    const leftCycles = (ITERATIONS - 1 - it) % loopLength;

    for (let i = 0; i < leftCycles; i++) doCycle();

    return input.map((l, lI) => l.filter((c) => c == "O").length * (input.length - lI)).sum();

    function doCycle() {
        for (let x = 0; x < input[0].length; x++) {
            let stopBeam = -1;
            for (let y = 0; y < input.length; y++) {
                if (input[y][x] == "#") stopBeam = y;
                else if (input[y][x] == "O") {
                    input[y][x] = ".";
                    input[++stopBeam][x] = "O";
                }
            }
        }

        for (let y = 0; y < input.length; y++) {
            let stopBeam = -1;
            for (let x = 0; x < input[0].length; x++) {
                if (input[y][x] == "#") stopBeam = x;
                else if (input[y][x] == "O") {
                    input[y][x] = ".";
                    input[y][++stopBeam] = "O";
                }
            }
        }

        for (let x = 0; x < input[0].length; x++) {
            let stopBeam = input.length;
            for (let y = input.length - 1; y >= 0; y--) {
                if (input[y][x] == "#") stopBeam = y;
                else if (input[y][x] == "O") {
                    input[y][x] = ".";
                    input[--stopBeam][x] = "O";
                }
            }
        }

        for (let y = 0; y < input.length; y++) {
            let stopBeam = input.length;
            for (let x = input[0].length - 1; x >= 0; x--) {
                if (input[y][x] == "#") stopBeam = x;
                else if (input[y][x] == "O") {
                    input[y][x] = ".";
                    input[y][--stopBeam] = "O";
                }
            }
        }
    }
}
