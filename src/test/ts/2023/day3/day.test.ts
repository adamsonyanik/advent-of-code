import data from "./day-data.json";
import example from "./day-example.json";

test("day example", () => {
    console.log(run(example));
});

test("day", () => {
    console.log(run(data));
});

function run(_input: string) {
    const gears: { x: number; y: number; ratio: number; number: number }[] = [];

    const input: string[][] = _input.split("\n").map((s) => s.split(""));
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[y].length; x++) {
            let n = "";
            for (
                let nI = x;
                nI < input[y].length && ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(input[y][nI]);
                nI++
            )
                n += input[y][nI];

            if (n != "") {
                if (input[y] && input[y][x - 1] && input[y][x - 1] == "*") {
                    addGearRatio(x - 1, y, Number(n));
                }
                if (input[y] && input[y][x + n.length] && input[y][x + n.length] == "*") {
                    addGearRatio(x + n.length, y, Number(n));
                }

                for (let i = x - 1; i < x + n.length + 1; i++) {
                    if (input[y - 1] && input[y - 1][i] && input[y - 1][i] == "*") {
                        addGearRatio(i, y - 1, Number(n));
                    }
                    if (input[y + 1] && input[y + 1][i] && input[y + 1][i] == "*") {
                        addGearRatio(i, y + 1, Number(n));
                    }
                }

                x += n.length;
            }
        }

    let sum = 0;
    for (const g of gears.filter((g) => g.number == 2)) sum += g.ratio;
    return sum;

    function addGearRatio(x: number, y: number, ratio: number) {
        let gear = gears.find((g) => g.x == x && g.y == y);
        if (!gear) {
            gear = { x, y, ratio: 1, number: 0 };
            gears.push(gear);
        }

        gear.ratio *= ratio;
        gear.number++;
    }
}
