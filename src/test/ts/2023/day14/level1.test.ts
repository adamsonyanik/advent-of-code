import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());

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
    return input.map((l, lI) => l.filter((c) => c == "O").length * (input.length - lI)).sum();
}
