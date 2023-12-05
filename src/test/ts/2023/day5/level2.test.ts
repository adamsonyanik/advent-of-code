import data from "./day-data.json";
import example from "./day-example.json";
import { Range, Ranges } from "../../../../utils/range";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input: number[][][] = _input
        .split(
            /(?:seeds: |seed-to-soil map:\n|soil-to-fertilizer map:\n|fertilizer-to-water map:\n|water-to-light map:\n|light-to-temperature map:\n|temperature-to-humidity map:\n|humidity-to-location map:\n)+/
        )
        .slice(1)
        .map((nu) =>
            nu
                .trim()
                .split("\n")
                .map((l) => l.split(" ").map((n) => Number(n)))
        );

    const seeds: Range[][] = [];
    for (let r = 0; r < input[0][0].length; r += 2) {
        seeds.push(convertRange(1, [{ start: input[0][0][r], end: input[0][0][r] + input[0][0][r + 1] - 1 }]));
    }
    function convertRange(stage: number, ranges: Range[]): Range[] {
        const newRanges: Range[] = [];

        for (let pI = 0; pI < input[stage].length; pI++) {
            const start = input[stage][pI][1];
            const end = start + input[stage][pI][2] - 1;
            const offset = input[stage][pI][0] - start;

            for (let rI = 0; rI < ranges.length; rI++) {
                const split = Ranges.splitRange(ranges[rI], { start, end });
                if (split.intersection !== "outside") {
                    newRanges.push(
                        ...split["&"].map((r) => ({
                            start: r.start + offset,
                            end: r.end + offset
                        }))
                    );
                    ranges.splice(rI, 1, ...split.onlyA);
                    rI += split.onlyA.length - 1;
                }
            }
        }

        ranges.push(...newRanges);
        if (stage < 7) return convertRange(stage + 1, ranges);
        return ranges;
    }

    const locations = seeds.map((r) => Math.min(...r.map((s) => s.start)));
    return Math.min(...locations);
}
