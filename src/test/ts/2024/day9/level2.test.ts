import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.split("").map((n) => Number(n));

    const disk: { id: number; size: number }[] = [];

    let id = 0;
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) disk.push({ id: id++, size: input[i] });
        else if (input[i] != 0) disk.push({ id: -1, size: input[i] });
    }

    let lastConsidered = id + 1;

    for (let r = disk.length - 1; r >= 0; r--) {
        if (disk[r].id == -1 || disk[r].id >= lastConsidered) continue;

        lastConsidered = disk[r].id;

        let firstOpen = 0;
        while (firstOpen < disk.length && !(disk[firstOpen].id == -1 && disk[firstOpen].size >= disk[r].size))
            firstOpen++;

        if (firstOpen < r) {
            if (disk[firstOpen].size == disk[r].size) {
                disk[firstOpen].id = disk[r].id;
            } else {
                disk[firstOpen].size = disk[firstOpen].size - disk[r].size;
                disk.splice(firstOpen, 0, { ...disk[r] });
                r++;
            }

            disk[r].id = -1;
        }

        for (let i = 0; i < disk.length - 1; i++) {
            if (disk[i].id == -1 && disk[i + 1].id == -1) {
                disk[i].size += disk[i + 1].size;
                disk.splice(i + 1, 1);
                i--;
            }
        }
    }

    let counter = 0;
    let blockCounter = 0;
    for (let i = 0; i < disk.length; i++) {
        for (let j = 0; j < disk[i].size; j++) {
            if (disk[i].id != -1) counter += disk[i].id * blockCounter;
            blockCounter++;
        }
    }

    return counter;
}
