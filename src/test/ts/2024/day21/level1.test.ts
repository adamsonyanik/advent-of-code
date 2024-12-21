import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l);

    const numericKeyPad = {
        "7": { x: 0, y: 3 },
        "8": { x: 1, y: 3 },
        "9": { x: 2, y: 3 },
        "4": { x: 0, y: 2 },
        "5": { x: 1, y: 2 },
        "6": { x: 2, y: 2 },
        "1": { x: 0, y: 1 },
        "2": { x: 1, y: 1 },
        "3": { x: 2, y: 1 },
        "0": { x: 1, y: 0 },
        A: { x: 2, y: 0 }
    };

    const dirKeyPad = {
        "^": { x: 1, y: 0 },
        A: { x: 2, y: 0 },
        "<": { x: 0, y: -1 },
        v: { x: 1, y: -1 },
        ">": { x: 2, y: -1 }
    };

    function getIns(from: { x: number; y: number }, to: { x: number; y: number }, xBeforeY: boolean) {
        const v = { x: to.x - from.x, y: to.y - from.y };
        let ins = "";

        if (xBeforeY && from.y == 0 && to.x == 0) return "X";
        if (!xBeforeY && from.x == 0 && to.y == 0) return "X";

        if (xBeforeY)
            if (v.x > 0) ins += ">".repeat(v.x);
            else if (v.x < 0) ins += "<".repeat(-v.x);

        if (v.y > 0) ins += "^".repeat(v.y);
        else if (v.y < 0) ins += "v".repeat(-v.y);

        if (!xBeforeY)
            if (v.x > 0) ins += ">".repeat(v.x);
            else if (v.x < 0) ins += "<".repeat(-v.x);

        return ins + "A";
    }

    function getCodes(code: string, keyPad: object, xBeforeY: boolean) {
        if (code.includes("X")) return "X";
        let ins = "";
        // @ts-ignore
        let currentPos = keyPad["A"];
        for (const c of code.split("")) {
            // @ts-ignore
            const to = keyPad[c];
            ins += getIns(currentPos, to, xBeforeY);
            currentPos = to;
        }

        return ins;
    }
    const d1 = getCodes(input[0], numericKeyPad, false);
    const d2 = getCodes(d1, dirKeyPad, false);
    const d3 = getCodes(d2, dirKeyPad, false);

    //console.log(d1);
    //console.log(d2);
    //console.log(d3);

    let counter = 0;

    for (const l of input) {
        counter +=
            getCodes(getCodes(getCodes(l, numericKeyPad, true), dirKeyPad, true), dirKeyPad, true).length *
            l.numbers()[0];
        console.log(getCodes(getCodes(getCodes(l, numericKeyPad, true), dirKeyPad, true), dirKeyPad, true).length);
        console.log(l.numbers()[0]);
    }

    return counter;
}
