import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    let left: number[] = [];
    let right: number[] = [];
    const input = _input.lines().map((l) => {
        left.push(Number(l.split("   ")[0]));
        right.push(Number(l.split("   ")[1]));
    });

    left = left.sort();
    right = right.sort();

    return left.map((v, i) => Math.abs(left[i] - right[i])).reduce((a, b) => a + b);
}
