import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input.lines();

    let bits = [...input];
    for (let i = 0; i < bits[0].length && bits.length > 1; i++) {
        const b = bits
            .map((l) => l[i])
            .bucket()
            .sortNumericDesc((e) => e.size);
        let bit = b[0].hash;
        if (b[0].size == b[1].size) bit = "1";

        bits = bits.filter((l) => l[i] == bit);
    }

    let bits2 = [...input];
    for (let i = 0; i < bits2[0].length && bits2.length > 1; i++) {
        const b = bits2
            .map((l) => l[i])
            .bucket()
            .sortNumericAsc((e) => e.size);
        let bit = b[0].hash;
        if (b[0].size == b[1].size) bit = "0";

        bits2 = bits2.filter((l) => l[i] == bit);
    }
    return parseInt(bits[0], 2) * parseInt(bits2[0], 2);
}
