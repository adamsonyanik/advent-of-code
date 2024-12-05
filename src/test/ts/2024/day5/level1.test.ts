import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const orderings = new Map<number, number[]>();
    const updates: number[][] = [];
    const input = _input.lines().map((l) => {
        if (l.includes("|")) {
            const o = l.split("|").map((n) => Number(n));
            if (!orderings.has(o[0])) orderings.set(o[0], []);

            orderings.get(o[0])!.push(o[1]);
        } else if (l.includes(",")) updates.push(l.split(",").map((n) => Number(n)));
    });

    let counter = 0;

    updateLoop: for (const u of updates) {
        for (let i = 0; i < updates.length; i++)
            for (let k = i + 1; k < updates.length; k++) if (orderings.get(u[k])?.includes(u[i])) continue updateLoop;
        counter += u[(u.length - 1) / 2];
    }

    return counter;
}
