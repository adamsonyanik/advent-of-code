import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(": "));

    let counter = 0;
    for (const l of input) {
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
                resultsNew.push(r + n);
                resultsNew.push(r * n);
            }
        }

        if (resultsNew.includes(Number(l[0]))) counter += Number(l[0]);
    }
    return counter;
}
