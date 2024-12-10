import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split("").map((n) => Number(n)));
    const dirs = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ];

    let counter = 0;
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] != 0) continue;

            const final = new Set<string>();
            const paths = [{ x, y }];
            let p = undefined;
            while ((p = paths.pop())) {
                if (input[p.y][p.x] == 9) final.add(p.x + "," + p.y);
                for (const d of dirs)
                    if (input[p.y + d.y]?.[p.x + d.x] == input[p.y][p.x] + 1)
                        paths.push({ x: p.x + d.x, y: p.y + d.y });
            }
            counter += final.size;
        }
    return counter;
}
