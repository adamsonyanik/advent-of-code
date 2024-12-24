import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const wires = new Map<string, boolean | undefined>();
    const gates: { input: string[]; op: "AND" | "OR" | "XOR"; out: string }[] = [];
    const input = _input.lines().map((l) => {
        if (l.includes(":")) wires.set(l.split(":")[0], l.split(": ")[1] == "1");
        if (l.includes("->")) {
            const split = l.split(" ");
            for (const w of [split[0], split[2], split[4]]) if (!wires.has(w)) wires.set(w, undefined);
            gates.push({ input: [split[0], split[2]], op: split[1] as "AND" | "OR" | "XOR", out: split[4] });
        }
    });

    function step() {
        let c = 0;
        for (const g of gates) {
            if (wires.get(g.out) != undefined) continue;
            if (wires.get(g.input[0]) == undefined || wires.get(g.input[1]) == undefined) continue;

            if (g.op == "AND") wires.set(g.out, wires.get(g.input[0]) && wires.get(g.input[1]));
            else if (g.op == "OR") wires.set(g.out, wires.get(g.input[0]) || wires.get(g.input[1]));
            else if (g.op == "XOR") wires.set(g.out, wires.get(g.input[0]) != wires.get(g.input[1]));
            c++;
        }
        return c != 0;
    }

    while (step()) {}

    const c = [];
    for (const [w, v] of wires.entries()) {
        if (!w.startsWith("z")) continue;
        c[w.numbers()[0]] = v ? 1 : 0;
    }

    return parseInt(c.reverse().join(""), 2);
}
