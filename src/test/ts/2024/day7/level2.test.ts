import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(": "));

    let counter = 0;
    for (const l of input) {
        const result = Number(l[0]);
        const numbers = l[1].split(" ").map((n) => Number(n));

        let results: number[] = [];
        let resultsNew: number[] = [];
        for (const n of numbers) {
            results = resultsNew;
            resultsNew = [];

            if (results.length == 0) {
                resultsNew.push(n);
                continue;
            }

            for (const r of results) {
                const sum = r + n;
                const prod = r * n;
                const conc = Number(String(r) + String(n));

                if (sum <= result) resultsNew.push(sum);
                if (prod <= result) resultsNew.push(prod);
                if (conc <= result) resultsNew.push(conc);
            }
        }

        if (resultsNew.includes(result)) counter += result;
    }
    return counter;
}
