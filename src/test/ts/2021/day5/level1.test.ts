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
    const input = _input
        .lines()
        .map((l) => {
            const [x1, y1, x2, y2] = l.numbers();
            if (x1 != x2 && y1 != y2) return [];
            const p = [];
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                    p.push({ x, y });
                }
            }
            return p;
        })
        .flat()
        .bucket((p) => p.x + "," + p.y)
        .filter((p) => p.size >= 2).length;
    return input;
}
