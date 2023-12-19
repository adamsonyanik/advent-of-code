import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const ins = _input
        .split("\n\n")[0]
        .lines()
        .map((l) => {
            const id = l.substring(0, l.indexOf("{"));
            return {
                id,
                ins: l
                    .substring(id.length + 1, l.length)
                    .split(",")
                    .slice(0, -1)
                    .map((ins) => {
                        const i = ins.split(/[><]/);
                        return {
                            part: ins.split(/[><]/)[0],
                            gt: ins.includes(">"),
                            n: Number(ins.split(/[><]/)[1].split(":")[0]),
                            target: ins.split(":")[1]
                        };
                    }),
                else: l
                    .split(",")
                    .at(-1)!
                    .substring(0, l.split(",").at(-1)!.length - 1)
            };
        })
        .toMap((ins) => ins.id);

    const partsCollection = _input
        .split("\n\n")[1]
        .lines()
        .map((l) =>
            l
                .substring(1, l.length - 1)
                .split(",")
                .map((p) => ({ id: p.split("=")[0], n: Number(p.split("=")[1]) }))
                .toMap((p) => p.id)
        );

    let value = 0;

    for (const parts of partsCollection) {
        let stage = "in";
        while (stage != "A" && stage != "R") {
            let hasComped = false;
            const comp = ins.get(stage)!;
            for (const c of comp.ins) {
                const pn = parts.get(c.part)!.n;
                if ((c.gt && pn > c.n) || (!c.gt && pn < c.n)) {
                    stage = c.target;
                    hasComped = true;
                    break;
                }
            }
            if (!hasComped) stage = comp.else;
        }
        if (stage == "A") value += [...parts.values()].map((p) => p.n).sum();
    }
    return value;
}
