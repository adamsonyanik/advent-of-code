import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";
import { lcm } from "../../../../utils/math";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const inst = _input.lines()[0].replace(/L/g, "0").replace(/R/g, "1").digits();
    const input: { id: string; lr: string[] }[] = _input
        .lines()
        .slice(2)
        .map((l) => {
            return {
                id: l.split(" = ")[0],
                lr: l.split(" = ")[1].words(/[a-zA-Z0-9]+/g)
            };
        });

    const map = input.toMap((v) => v.id);
    const steps = [];

    for (const start of input.filter((i) => i.id.endsWith("A")).map((i) => i.id)) {
        let current = start;
        let instCounter = 0;
        while (!current.endsWith("Z")) {
            current = map.get(current)!.lr[inst[instCounter % inst.length]];
            instCounter++;
        }
        steps.push(instCounter);
    }

    return lcm(...steps);
}
