import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.split(/\r\n\r\n|\n\n/g).map((grid) => grid.lines().map((l) => l.chars()));

    let mirrorSum = 0;

    for (let i = 0; i < input.length; i++) {
        const intersectionsV1 = getIntersectionError1(input[i].map((l) => getReflections(l)));
        if (intersectionsV1.length > 0) mirrorSum += intersectionsV1[0];

        const intersectionsH1 = getIntersectionError1(input[i].transpose().map((l) => getReflections(l)));
        if (intersectionsH1.length > 0) mirrorSum += intersectionsH1[0] * 100;
    }

    return mirrorSum;

    function getReflections(line: string[]) {
        const lines = [];
        lineLoop: for (let x = 1; x < line.length; x++) {
            for (let my = 0; x + my < line.length && x - my - 1 >= 0; my++)
                if (line[x + my] !== line[x - my - 1]) continue lineLoop;
            lines.push(x);
        }

        return lines;
    }

    function getIntersectionError1(lines: number[][]) {
        return [...new Set(lines.flat())].filter((n) => lines.filter((l) => l.includes(n)).length == lines.length - 1);
    }
}
