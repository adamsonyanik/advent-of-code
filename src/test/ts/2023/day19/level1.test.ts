import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const ins = _input
        .split("\n\n")[0]
        .lines()
        .map((l) => ({
            id: l.substring(0, l.indexOf("{")),
            ins: l
                .substring(l.indexOf("{") + 1)
                .split(",")
                .slice(0, -1)
                .map((ins) => ({
                    part: ins.split(/[><]/)[0],
                    gt: ins.includes(">"),
                    n: Number(ins.split(/[><]/)[1].split(":")[0]),
                    target: ins.split(":")[1]
                })),
            else: l
                .substring(0, l.length - 1)
                .split(",")
                .at(-1)!
        }))
        .toMap((ins) => ins.id);

    return _input
        .split("\n\n")[1]
        .lines()
        .map((l) => {
            const parts = l
                .substring(1, l.length - 1)
                .split(",")
                .map((p) => ({ id: p.split("=")[0], n: Number(p.split("=")[1]) }))
                .toMap((p) => p.id);

            let stage = "in";
            stageLoop: while (stage != "A" && stage != "R") {
                const comp = ins.get(stage)!;
                for (const c of comp.ins) {
                    const pn = parts.get(c.part)!.n;
                    if ((c.gt && pn > c.n) || (!c.gt && pn < c.n)) {
                        stage = c.target;
                        continue stageLoop;
                    }
                }
                stage = comp.else;
            }
            return stage == "A" ? [...parts.values()].map((p) => p.n).sum() : 0;
        })
        .sum();
}
