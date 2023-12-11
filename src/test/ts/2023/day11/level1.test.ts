import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => l.chars())
        .map((l) => (!l.includes("#") ? [l, l] : [l]))
        .flat()
        .transpose()
        .map((l) => (!l.includes("#") ? [l, l] : [l]))
        .flat();

    const galaxies = input.map((l, y) => l.map((c, x) => ({ c, x, y })).filter((c) => c.c == "#")).flat();

    let dist = 0;
    for (let i = 0; i < galaxies.length; i++)
        for (let j = i + 1; j < galaxies.length; j++)
            dist += Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
    return dist;
}
