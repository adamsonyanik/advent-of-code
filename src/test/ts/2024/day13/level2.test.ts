import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const machine: { aX: number; aY: number; bX: number; bY: number; x: number; y: number }[] = [];
    const input = _input.lines().map((l) => {
        if (l.startsWith("Button A")) {
            machine.push({ aX: l.numbers()[0], aY: l.numbers()[1], bX: 0, bY: 0, x: 0, y: 0 });
        } else if (l.startsWith("Button B")) {
            machine.at(-1)!.bX = l.numbers()[0];
            machine.at(-1)!.bY = l.numbers()[1];
        } else if (l.startsWith("Prize:")) {
            machine.at(-1)!.x = l.numbers()[0] + 10000000000000;
            machine.at(-1)!.y = l.numbers()[1] + 10000000000000;
        }
    });

    let counter = 0;
    for (const m of machine) {
        const x = m.x;
        const y = m.y;
        const _aX = m.aX;
        const _aY = m.aY;
        const _bX = m.bX;
        const _bY = m.bY;

        const cA = (x * _bY - _bX * y) / (_aX * _bY - _bX * _aY);
        const cB = (y - _aY * cA) / _bY;

        if (cA == Math.round(cA) && cB == Math.round(cB)) counter += cA * 3 + cB;
    }
    return counter;
}

//_aX * cA + _bX * cB = x
//_aY * cA + _bY * cB = y

//_bY * cB = y - _aY * cA
//cB = (y - _aY * cA) / _bY

//_bX * cB = x - _aX * cA
//_bX * (y - _aY * cA) / _bY = x - _aX * cA
//_bX * (y - _aY * cA) = x * _bY - _aX * cA * _bY
//_aX * cA * _bY = x * _bY - _bX * y + _bX * _aY * cA
//_aX * cA * _bY - _bX * _aY * cA = x * _bY - _bX * y
//cA * (_aX * _bY - _bX * _aY) = x * _bY - _bX * y
//cA = (x * _bY - _bX * y) / (_aX * _bY - _bX * _aY)
