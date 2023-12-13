import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.split(/\r\n\r\n|\n\n/g).map((grid) => {
        return grid.lines().map((l) => l.chars());
    });

    let mirrorSum = 0;

    for (let i = 0; i < input.length; i++) {
        let vmirror = false;
        for (let x = 1; x < input[i][0].length; x++) {
            let mirror = true;
            for (let l = 0; l < input[i].length && mirror; l++) {
                for (let mx = 0; x + mx < input[i][l].length && x - mx - 1 >= 0; mx++) {
                    if (input[i][l][x + mx] !== input[i][l][x - mx - 1]) {
                        mirror = false;
                        break;
                    }
                }
            }
            if (mirror) {
                vmirror = true;
                mirrorSum += x;
                break;
            }
        }

        if (!vmirror)
            for (let y = 1; y < input[i].length; y++) {
                let mirror = true;
                for (let c = 0; c < input[i][0].length && mirror; c++) {
                    for (let my = 0; y + my < input[i].length && y - my - 1 >= 0; my++) {
                        if (input[i][y + my][c] !== input[i][y - my - 1][c]) {
                            mirror = false;
                            break;
                        }
                    }
                }
                if (mirror) {
                    mirrorSum += y * 100;
                    break;
                }
            }
    }

    return mirrorSum;
}
