import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const boxes: { label: string; focalLength: number }[][] = [];
    for (let i = 0; i < 256; i++) boxes.push([]);

    const input = _input.split(",");

    for (const l of input) {
        const label = l.split(/[-=]/)[0];
        const h = hash(label);
        const index = boxes[h].findIndex((f) => f.label == label);

        if (l.endsWith("-")) {
            if (index >= 0) boxes[h].splice(index, 1);
        } else {
            const focalLength = Number(l.split(/=/)[1]);
            if (index >= 0) boxes[h][index].focalLength = focalLength;
            else boxes[h].push({ label, focalLength });
        }
    }

    const focusingPowers = [];
    for (let b = 0; b < boxes.length; b++) {
        for (let f = 0; f < boxes[b].length; f++) {
            focusingPowers.push((b + 1) * (f + 1) * boxes[b][f].focalLength);
        }
    }

    return focusingPowers.sum();

    function hash(s: string) {
        let sum = 0;
        for (let i = 0; i < s.length; i++) sum = ((sum + s.charCodeAt(i)) * 17) % 256;
        return sum;
    }
}
