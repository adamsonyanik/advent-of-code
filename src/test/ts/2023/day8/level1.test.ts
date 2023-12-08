import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
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

    let current = "AAA";
    let instCounter = 0;
    while (current !== "ZZZ") {
        current = map.get(current)!.lr[inst[instCounter % inst.length]];
        instCounter++;
    }

    return instCounter;
}
