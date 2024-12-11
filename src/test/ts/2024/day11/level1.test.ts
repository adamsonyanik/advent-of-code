import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.split(" ").map((n) => Number(n));

    const stones = new Map<number, number>();
    for (const i of input) addToMap(i, 1);

    function addToMap(i: number, c: number) {
        if (!stones.has(i)) stones.set(i, c);
        else stones.set(i, stones.get(i)! + c);
    }

    for (let iter = 0; iter < 25; iter++) {
        const currentStones = [...stones.entries()];
        stones.clear();
        for (let i = 0; i < currentStones.length; i++) {
            if (currentStones[i][0] == 0) addToMap(1, currentStones[i][1]);
            else if (String(currentStones[i][0]).length % 2 == 0) {
                const s = String(currentStones[i][0]);
                addToMap(Number(s.substring(0, s.length / 2)), currentStones[i][1]);
                addToMap(Number(s.substring(s.length / 2)), currentStones[i][1]);
            } else {
                addToMap(currentStones[i][0] * 2024, currentStones[i][1]);
            }
        }
    }

    let counter = 0;
    for (const e of stones.entries()) counter += e[1];

    return counter;
}
