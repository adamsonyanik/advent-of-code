import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.split(",").map((l) => hash(l));
    return input.sum();

    function hash(s: string) {
        let sum = 0;
        for (let i = 0; i < s.length; i++) sum = ((sum + s.charCodeAt(i)) * 17) % 256;
        return sum;
    }
}
