import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const machine: { aX: number; aY: number; bX: number; bY: number; x: number; y: number }[] = [];
    const input = _input.lines().map((l) => {
        if (l.startsWith("Button A")) {
            machine.push({ aX: l.numbers()[0], aY: l.numbers()[1], bX: 0, bY: 0, x: 0, y: 0 });
        } else if (l.startsWith("Button B")) {
            machine.at(-1)!.bX = l.numbers()[0];
            machine.at(-1)!.bY = l.numbers()[1];
        } else if (l.startsWith("Prize:")) {
            machine.at(-1)!.x = l.numbers()[0];
            machine.at(-1)!.y = l.numbers()[1];
        }
    });

    let counter = 0;
    mLoop: for (const m of machine) {
        let bTimes = Math.min(Math.ceil(m.x / m.bX), 100);
        let aTimes = 0;
        while (bTimes >= 0) {
            while (bTimes * m.bX + aTimes * m.aX < m.x) {
                aTimes++;
            }
            if (bTimes * m.bX + aTimes * m.aX == m.x && bTimes * m.bY + aTimes * m.aY == m.y) {
                counter += aTimes * 3 + bTimes;
                continue mLoop;
            }
            bTimes--;
        }
    }
    return counter;
}
