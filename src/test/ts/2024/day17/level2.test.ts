import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const p = _isExample ? "513437217" : "2413751503425530";

    function t(i: number, value: number[]): number[] | false {
        if (i >= p.length) return [...value];
        nextZ: for (let z = 0; z < 8; z++) {
            const nValue = [...value];

            // rShift = z ^ 0b011
            // r3 = Number(p[i]) ^ z ^ 0b110

            const n = z.toString(2).padStart(3, "0").digits().reverse();
            for (const bI of [0, 1, 2])
                if (nValue[i * 3 + bI] != -1 && nValue[i * 3 + bI] != n[bI]) continue nextZ;
                else nValue[i * 3 + bI] = n[bI];

            const rightShift = z ^ 0b011;
            const o = Number(p[i]) ^ z ^ 0b110;
            const other = o.toString(2).padStart(3, "0").digits().reverse();

            for (const bI of [0, 1, 2])
                if (nValue[i * 3 + bI + rightShift] != -1 && nValue[i * 3 + bI + rightShift] != other[bI])
                    continue nextZ;
                else nValue[i * 3 + bI + rightShift] = other[bI];

            const tr = t(i + 1, nValue);
            if (tr) return tr;
        }
        return false;
    }

    const result = t(0, new Array(128).fill(-1));

    if (result)
        return parseInt(
            result
                .reverse()
                .map((n) => (n == -1 ? 0 : n))
                .join(""),
            2
        );
}

/*
2 4 regs[1] = mod(regs[0], 8);
1 3 regs[1] = regs[1] ^ 3;
7 5 regs[2] = Math.floor(regs[0] / Math.pow(2, regs[1]));
1 5 regs[1] = regs[1] ^ 5;
0 3 regs[0] = Math.floor(regs[0] / 8);
4 2 regs[1] = regs[1] ^ regs[2];
5 5 out.push(mod(regs[1], 8));
3 0 if (regs[0] == 0) break;

out.push(mod(mod(reg, 8) ^ 3 ^ 5 ^ Math.floor(reg / Math.pow(2, mod(reg, 8) ^ 3)), 8));
reg = Math.floor(reg / 8);
if (reg == 0) break;
 */
