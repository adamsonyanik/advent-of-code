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
    const input = _input.lines().map((l) => l.digits());
    let i = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        i++;
        const c = step();
        if (c != undefined) return c;
    }

    function step() {
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                input[y][x]++;
                if (input[y][x] == 10) flash(x, y);
            }
        }

        let flashes = 0;

        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                if (input[y][x] > 9) {
                    input[y][x] = 0;
                    flashes++;
                }
            }
        }

        if (flashes == input.length * input[0].length) return i;
    }

    function flash(_x: number, _y: number) {
        for (let y = _y - 1; y <= _y + 1; y++) {
            for (let x = _x - 1; x <= _x + 1; x++) {
                if ((x != _x || y != _y) && input[y] != undefined && input[y][x] != undefined) {
                    input[y][x]++;
                    if (input[y][x] == 10) flash(x, y);
                }
            }
        }
    }
}
