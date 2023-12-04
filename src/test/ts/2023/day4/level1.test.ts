import data from "./day-data.json";
import example from "./day-example.json";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input: { winnings: number[]; numbers: number[] }[] = _input
        .replace(new RegExp(" {2}", "g"), " ")
        .split("\n")
        .map((s) => {
            return {
                winnings: s
                    .split("|")[0]
                    .split(":")[1]
                    .trim()
                    .split(" ")
                    .map((n) => Number(n)),
                numbers: s
                    .split("|")[1]
                    .trim()
                    .split(" ")
                    .map((n) => Number(n))
            };
        });

    const win = input.map((c) => c.numbers.filter((n) => c.winnings.includes(n)).length);

    let sum = 0;
    for (let i = 0; i < win.length; i++) {
        sum += value(win[i]);
    }
    return sum;

    function value(n: number) {
        if (n == 0) return 0;
        return Math.pow(2, n - 1);
    }
}
