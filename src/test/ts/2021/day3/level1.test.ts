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
    const input = _input.lines();

    let gamma = "";
    let epsilon = "";
    for (let i = 0; i < input[0].length; i++) {
        const b = input
            .map((l) => l[i])
            .bucket()
            .sortNumericDesc((e) => e.size);

        gamma += b[0].hash;
        epsilon += b[1].hash;
    }
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
