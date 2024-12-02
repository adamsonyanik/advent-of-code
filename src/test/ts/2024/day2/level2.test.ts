import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(" ").map((n) => Number(n)));
    return input.filter((f) => {
        for (let k = 0; k < f.length; k++) {
            let index = -1;
            const nf = [...f.slice(0, k), ...f.slice(k + 1)];
            for (let i = 0; i < f.length - 1; i++) {
                if (nf[i] - nf[i + 1] == 0) {
                    index = i;
                    break;
                }
                if (nf[i] - nf[i + 1] > 0 && nf[0] - nf[1] < 0) {
                    index = i;
                    break;
                }
                if (nf[i] - nf[i + 1] < 0 && nf[0] - nf[1] > 0) {
                    index = i;
                    break;
                }
                if (Math.abs(nf[i] - nf[i + 1]) > 3) {
                    index = i;
                    break;
                }
            }
            if (index == -1) return true;
        }

        return false;
    }).length;
}
