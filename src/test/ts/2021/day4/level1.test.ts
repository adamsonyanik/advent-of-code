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
    const draws = _input.lines()[0].numbers();
    const boards = _input
        .lines()
        .slice(2)
        .bucket((v, i) => Math.floor(i / 6))
        .map((b) => ({
            id: b.hash,
            lines: b.items.slice(0, 5).map((l) => l.numbers().map((n) => ({ n: n, marked: false })))
        }));

    for (let i = 0; i < draws.length; i++) {
        mark(draws[i]);
        const cwins = checkWins();
        for (const win of cwins) {
            return countBoard(win) * draws[i];
        }
    }

    function mark(mark: number) {
        for (const b of boards)
            for (const l of b.lines)
                for (const n of l)
                    if (n.n == mark) {
                        n.marked = true;
                    }
    }

    function checkWins() {
        const wins = new Set<number | string>();
        for (const b of boards) {
            lineLoop: for (let y = 0; y < b.lines.length; y++) {
                for (let x = 0; x < b.lines[y].length; x++) {
                    if (!b.lines[y][x].marked) continue lineLoop;
                }
                wins.add(b.id);
            }
            lineLoop: for (let x = 0; x < b.lines[0].length; x++) {
                for (let y = 0; y < b.lines.length; y++) {
                    if (!b.lines[y][x].marked) continue lineLoop;
                }
                wins.add(b.id);
            }
        }

        return [...wins];
    }

    function countBoard(id: number | string) {
        const board = boards.find((b) => b.id == id)!;
        let sum = 0;
        for (let y = 0; y < board.lines.length; y++) {
            for (let x = 0; x < board.lines[y].length; x++) {
                if (!board.lines[y][x].marked) sum += board.lines[y][x].n;
            }
        }

        return sum;
    }
}
