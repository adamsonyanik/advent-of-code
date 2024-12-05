import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

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

    for (const u of updates) {
        let shouldAdd = false;
        let correct = false;
        while (!correct) {
            correct = true;
            updateLoop: for (let i = 0; i < updates.length; i++)
                for (let k = i + 1; k < updates.length; k++)
                    if (orderings.get(u[k])?.includes(u[i])) {
                        const t = u[k];
                        u[k] = u[i];
                        u[i] = t;

                        correct = false;
                        shouldAdd = true;
                        break updateLoop;
                    }
        }
        if (shouldAdd) counter += u[(u.length - 1) / 2];
    }

    return counter;
}
