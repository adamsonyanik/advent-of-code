import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(""));

    const antennas = new Map<string, [x: number, y: number][]>();

    const anti = new Set<string>();
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input.length; x++)
            if (input[y][x] != ".") {
                if (!antennas.has(input[y][x])) antennas.set(input[y][x], []);
                antennas.get(input[y][x])!.push([x, y]);
            }

    for (const a of antennas.entries()) {
        for (let i = 0; i < a[1].length; i++) {
            for (let k = i + 1; k < a[1].length; k++) {
                const y1 = a[1][k][1] - (a[1][i][1] - a[1][k][1]);
                const x1 = a[1][k][0] - (a[1][i][0] - a[1][k][0]);
                if (x1 >= 0 && x1 < input[0].length && y1 >= 0 && y1 < input.length) anti.add(x1 + "," + y1);

                const y2 = a[1][i][1] - (a[1][k][1] - a[1][i][1]);
                const x2 = a[1][i][0] - (a[1][k][0] - a[1][i][0]);
                if (x2 >= 0 && x2 < input[0].length && y2 >= 0 && y2 < input.length) anti.add(x2 + "," + y2);
            }
        }
    }
    return anti.size;
}
