import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";
import { aWithoutB, intersect } from "../../../../utils/set";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => {
            const inp = l
                .split("|")[0]
                .words()
                .map((n) => n.split(""))
                .bucket((v) => v.length)
                .toMap((v) => v.hash);
            const out = l.split("|")[1].words();

            const _1 = inp.get(2)!.items[0];
            const _4 = inp.get(4)!.items[0];
            const _7 = inp.get(3)!.items[0];
            const _8 = inp.get(7)!.items[0];
            const _235 = inp.get(5)!.items;
            const _690 = inp.get(6)!.items;

            const a = aWithoutB(_7, _1)[0];
            const cde = _690.map((d) => aWithoutB(_8, d)[0]);
            const c = intersect(_1, cde)[0];
            const de = aWithoutB(cde, [c]);
            const d = intersect(_4, de)[0];
            const e = aWithoutB(de, [d])[0];
            const f = aWithoutB(_7, [a, c])[0];
            const b = aWithoutB(_4, [c, d, f])[0];
            const g = aWithoutB(_8, [a, b, c, d, e, f])[0];

            const ta = { a, b, c, d, e, f, g };
            const t = {};

            for (const [key, value] of Object.entries(ta)) {
                // @ts-ignore
                t[value] = key;
            }

            const v = {
                abcefg: "0",
                cf: "1",
                acdeg: "2",
                acdfg: "3",
                bcdf: "4",
                abdfg: "5",
                abdefg: "6",
                acf: "7",
                abcdefg: "8",
                abcdfg: "9"
            };

            return Number(
                out
                    .map((o) =>
                        o
                            .split("")
                            // @ts-ignore
                            .map((c) => t[c])
                            .sortAlphaAsc()
                            .join("")
                    )
                    // @ts-ignore
                    .map((o) => v[o])
                    .join("")
            );
        })
        .sum();

    return input;
}
