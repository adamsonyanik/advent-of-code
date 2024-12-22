import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";
import { mod } from "../../../../utils/math";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l.numbers()[0]);

    function mix(n: number, old: number) {
        return n ^ old;
    }

    function prune(n: number, old: number) {
        return mod(n, 16777216);
    }

    const sequenceMap = new Map<string, number>();
    for (let s of input) {
        const sn = [s];
        for (let i = 0; i < 2000; i++) {
            s = prune(mix(s * 64, s), s);
            s = prune(mix(Math.floor(s / 32), s), s);
            s = prune(mix(s * 2048, s), s);
            sn.push(s % 10);
        }

        const sequenceSet = new Set<string>();
        const diff: number[] = [];
        for (let i = 0; i < sn.length - 1; i++) diff.push(sn[i + 1] - sn[i]);

        for (let i = 0; i < diff.length - 3; i++) {
            const seq = diff[i] + "," + diff[i + 1] + "," + diff[i + 2] + "," + diff[i + 3];
            if (sequenceSet.has(seq)) continue;

            sequenceSet.add(seq);
            if (!sequenceMap.has(seq)) sequenceMap.set(seq, 0);
            sequenceMap.set(seq, sequenceMap.get(seq)! + sn[i + 4]);
        }
    }

    return [...sequenceMap.entries()].sort((a, b) => b[1] - a[1])[0];
}
