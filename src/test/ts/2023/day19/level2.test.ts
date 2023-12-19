import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const ins = _input
        .split("\n\n")[0]
        .lines()
        .map((l) => ({
            id: l.substring(0, l.indexOf("{")),
            ins: l
                .substring(l.indexOf("{") + 1, l.length)
                .split(",")
                .slice(0, -1)
                .map((ins) => ({
                    part: { x: 0, m: 1, a: 2, s: 3 }[ins.split(/[><]/)[0]]!,
                    gt: ins.includes(">"),
                    n: Number(ins.split(/[><]/)[1].split(":")[0]),
                    target: ins.split(":")[1]
                })),
            else: l
                .split(",")
                .at(-1)!
                .substring(0, l.split(",").at(-1)!.length - 1)
        }))
        .toMap((ins) => ins.id);

    let value = 0;
    const open = [{ state: "in", parts: new Array(4).fill({ start: 1, end: 4000 }) }];

    while (open.length) {
        let i = open.pop()!;

        if (i.state == "A") value += i.parts.map((p) => p.end - p.start + 1).mul();
        else if (i.state == "R") {
        } else {
            const comp = ins.get(i.state)!;
            for (const c of comp.ins) {
                const ranges = splitIntoRangesForPart(c.part, c.gt, c.n, i.parts);
                open.push({ state: c.target, parts: ranges.normalOp });
                i = { state: i.state, parts: ranges.inverseOp };
            }
            open.push({ state: comp.else, parts: i.parts });
        }
    }

    return value;

    function splitIntoRangesForPart(p: number, gt: boolean, n: number, parts: { start: number; end: number }[]) {
        const newParts = [...parts];
        const newPartsInv = [...parts];
        newParts[p] = splitRange(gt, false, n, parts[p].start, parts[p].end);
        newPartsInv[p] = splitRange(gt, true, n, parts[p].start, parts[p].end);

        return { normalOp: newParts, inverseOp: newPartsInv };
    }

    function splitRange(gt: boolean, opInv: boolean, n: number, start: number, end: number) {
        if (gt && !opInv) return { start: Math.max(start, n + 1), end };
        else if (!gt && !opInv) return { start, end: Math.min(end, n - 1) };
        else if (gt && opInv) return { start, end: Math.min(end, n) };
        else return { start: Math.max(start, n), end };
    }
}
