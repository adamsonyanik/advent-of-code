import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(""));

    let counter = 0;

    console.log(input[0].length);

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length - 3; x++) {
            if (
                [input[y][x], input[y][x + 1], input[y][x + 2], input[y][x + 3]].join("") == "XMAS" ||
                [input[y][x], input[y][x + 1], input[y][x + 2], input[y][x + 3]].join("") == "SAMX"
            )
                counter++;
        }
    }

    for (let y = 0; y < input.length - 3; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (
                [input[y][x], input[y + 1][x], input[y + 2][x], input[y + 3][x]].join("") == "XMAS" ||
                [input[y][x], input[y + 1][x], input[y + 2][x], input[y + 3][x]].join("") == "SAMX"
            )
                counter++;
        }
    }

    for (let y = 0; y < input.length - 3; y++) {
        for (let x = 0; x < input[y].length - 3; x++) {
            if (
                [input[y][x], input[y + 1][x + 1], input[y + 2][x + 2], input[y + 3][x + 3]].join("") == "XMAS" ||
                [input[y][x], input[y + 1][x + 1], input[y + 2][x + 2], input[y + 3][x + 3]].join("") == "SAMX"
            )
                counter++;
        }
    }

    for (let y = 0; y < input.length - 3; y++) {
        for (let x = 3; x < input[y].length; x++) {
            if (
                [input[y][x], input[y + 1][x - 1], input[y + 2][x - 2], input[y + 3][x - 3]].join("") == "XMAS" ||
                [input[y][x], input[y + 1][x - 1], input[y + 2][x - 2], input[y + 3][x - 3]].join("") == "SAMX"
            )
                counter++;
        }
    }
    return counter;
}
