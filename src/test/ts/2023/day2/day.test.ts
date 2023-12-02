import data from "./day-data.json";
import example from "./day-example.json";

test("day example", () => {
    console.log(run(example));
});

test("day", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input: string[] = _input.split("\n");
    const games = input.map((s) => {
        const id = Number(s.split(":")[0].substring(5));
        const list = s
            .split(":")[1]
            .split(";")
            .map((l) =>
                l.split(",").map((n) => ({ color: n.trim().split(" ")[1], number: Number(n.trim().split(" ")[0]) }))
            );

        return { id: id, list: list };
    });

    let sum = 0;
    for (const g of games) sum += calcGame(g);

    return sum;
}
function calcGame(game: { id: number; list: { color: string; number: number }[][] }) {
    let red = 0;
    let green = 0;
    let blue = 0;

    for (const l of game.list)
        for (const c of l) {
            if (c.color == "red") red = Math.max(red, c.number);
            if (c.color == "green") green = Math.max(green, c.number);
            if (c.color == "blue") blue = Math.max(blue, c.number);
        }

    return red * green * blue;
}
