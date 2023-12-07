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
    const [times, distances]: number[][] = _input.lines().map((l) => l.removeWS().numbers());

    let win = 1;
    for (let i = 0; i < times.length; i++) win *= race(times[i], distances[i]);

    return win;

    function race(ms: number, distance: number) {
        // -x^2 + ms*x - distance = 0
        // x^2 - ms*x + distance = 0

        const pq1 = ms / 2;
        const pq2 = Math.sqrt(pq1 * pq1 - distance);
        const x1 = Math.ceil(pq1 + pq2 - 1);
        const x2 = Math.floor(pq1 - pq2 + 1);
        return x1 - x2 + 1;
    }
}
