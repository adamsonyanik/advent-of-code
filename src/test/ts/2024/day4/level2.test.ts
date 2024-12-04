import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(""));

    let counter = 0;

    for (let y = 0; y < input.length - 2; y++) {
        for (let x = 0; x < input[y].length - 2; x++) {
            if (
                ([input[y][x], input[y + 1][x + 1], input[y + 2][x + 2]].join("") == "MAS" ||
                    [input[y][x], input[y + 1][x + 1], input[y + 2][x + 2]].join("") == "SAM") &&
                ([input[y][x + 2], input[y + 1][x + 1], input[y + 2][x]].join("") == "MAS" ||
                    [input[y][x + 2], input[y + 1][x + 1], input[y + 2][x]].join("") == "SAM")
            )
                counter++;
        }
    }
    return counter;
}
