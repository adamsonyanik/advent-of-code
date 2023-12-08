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
    const input = _input
        .lines()
        .map((l) => {
            const [x1, y1, x2, y2] = l.numbers();
            const p = [{ x: x2, y: y2 }];
            let disX = x2 - x1;
            let disY = y2 - y1;
            while (disX != 0 || disY != 0) {
                p.push({ x: x2 - disX, y: y2 - disY });
                disX = disX - Math.sign(disX);
                disY = disY - Math.sign(disY);
            }
            return p;
        })
        .flat()
        .bucket((p) => p.x + "," + p.y)
        .filter((p) => p.size >= 2).length;
    return input;
}
