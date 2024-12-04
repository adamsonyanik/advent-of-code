import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    let mulEnabled = true;
    let counter = 0;

    const input = _input.lines();

    for (const l of input) {
        const regexp = /mul\((\d+),(\d+)\)/g;
        const regexpDo = /do\(\)/g;
        const regexpDont = /don't\(\)/g;

        const muls = [...l.matchAll(regexp)];
        const dos = [...l.matchAll(regexpDo)];
        const donts = [...l.matchAll(regexpDont)];

        while (muls.length > 0) {
            if (
                (dos.length == 0 || muls[0].index! < dos[0].index!) &&
                (donts.length == 0 || muls[0].index! < donts[0].index!)
            ) {
                const m = muls.shift()!;
                if (mulEnabled) counter += Number(m[1]) * Number(m[2]);
            } else if (dos.length > 0 && (donts.length == 0 || dos[0].index! < donts[0].index!)) {
                dos.shift()!;
                mulEnabled = true;
            } else if (donts.length > 0 && (dos.length == 0 || donts[0].index! < dos[0].index!)) {
                donts.shift()!;
                mulEnabled = false;
            }
        }
    }

    return counter;
}
