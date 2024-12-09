import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.split("").map((n) => Number(n));

    const disk = [];

    let id = 0;
    for (let i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            for (let j = 0; j < input[i]; j++) disk.push(id);
            id++;
        } else disk.push(...".".repeat(input[i]));
    }

    let firstOpen = 0;
    for (let r = disk.length - 1; r >= 0; r--) {
        if (disk[r] == ".") continue;

        for (; firstOpen < r; firstOpen++) {
            if (disk[firstOpen] == ".") {
                disk[firstOpen] = disk[r];
                disk[r] = ".";
                break;
            }
        }
    }

    let counter = 0;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] == ".") break;
        counter += i * Number(disk[i]);
    }

    return counter;
}
