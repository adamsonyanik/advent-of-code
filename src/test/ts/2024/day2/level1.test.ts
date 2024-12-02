import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(" ").map((n) => Number(n)));
    return input.filter((f) => {
        for (let i = 0; i < f.length - 1; i++) {
            if (f[i] - f[i + 1] == 0) return false;
            if (f[i] - f[i + 1] > 0 && f[0] - f[1] < 0) return false;
            if (f[i] - f[i + 1] < 0 && f[0] - f[1] > 0) return false;
            if (Math.abs(f[i] - f[i + 1]) > 3) return false;
        }

        return true;
    }).length;
}
