import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const expandedRows = _input
        .lines()
        .map((l, i) => l.chars().map((c) => ({ c, i })))
        .filter((l, i) => !l.map((c) => c.c).includes("#"))
        .map((c) => c[0].i);
    const expandedCols = _input
        .lines()
        .map((l) => l.chars())
        .transpose()
        .map((l, i) => l.map((c) => ({ c, i })))
        .filter((l) => !l.map((c) => c.c).includes("#"))
        .map((c) => c[0].i);

    const galaxies = _input
        .lines()
        .map((l, y) =>
            l
                .chars()
                .map((c, x) => ({ c, x, y }))
                .filter((c) => c.c == "#")
        )
        .flat();

    let dist = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            dist +=
                Math.abs(galaxies[i].x - galaxies[j].x) +
                Math.abs(galaxies[i].y - galaxies[j].y) +
                (1000000 - 1) *
                    (expandedRows.filter(
                        (r) => r > Math.min(galaxies[i].y, galaxies[j].y) && r < Math.max(galaxies[i].y, galaxies[j].y)
                    ).length +
                        expandedCols.filter(
                            (c) =>
                                c > Math.min(galaxies[i].x, galaxies[j].x) && c < Math.max(galaxies[i].x, galaxies[j].x)
                        ).length);
        }
    }
    return dist;
}
