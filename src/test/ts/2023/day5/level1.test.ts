import data from "./day-data.json";
import example from "./day-example.json";
import { Ranges } from "../../../../utils/range";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
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

    const seeds: number[] = [];
    for (let i = 0; i < input[0][0].length; i++) {
        seeds.push(convert(1, input[0][0][i]));
    }
    function convert(stage: number, location: number): number {
        if (stage > 7) return location;

        let des = location;
        for (let pI = 0; pI < input[stage].length; pI++) {
            const start = input[stage][pI][1];
            const end = start + input[stage][pI][2] - 1;
            const offset = input[stage][pI][0] - start;

            if (Ranges.splitRange({ start, end }, { start: location, end: location }).intersection == "inside")
                des = convert(stage + 1, location + offset);
        }
        return des;
    }
    return Math.min(...seeds);
}
