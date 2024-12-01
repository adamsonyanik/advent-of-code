import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    let left: number[] = [];
    let right: number[] = [];
    const input = _input.lines().map((l) => {
        left.push(Number(l.split("   ")[0]));
        right.push(Number(l.split("   ")[1]));
    });

    left = left.sort();
    right = right.sort();

    return left.map((v, i) => left[i] * right.filter((r) => r == left[i]).length).reduce((a, b) => a + b);
}
