import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const p = _isExample ? "513437217" : "2413751503425530";
    let reg = 33024962;
    let out = "";

    let i = 33024962;
    const max = 0;

    // eslint-disable-next-line no-constant-condition
    next: while (i < 0b10000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000 && out != p) {
        reg = i;
        out = "";

        i++;
        if (i % 100000000 == 0)
            console.log(i + "/" + 0b10000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000_0000);

        while (reg != 0) {
            out += ((reg >> ((reg & 0b111) ^ 0b011)) ^ reg ^ 0b110) & 0b111;
            if (!p.startsWith(out)) continue next;
            reg = reg >> 3;
        }
        if (out == p) return i - 1;
    }

    console.log(i);

    return i;
}
