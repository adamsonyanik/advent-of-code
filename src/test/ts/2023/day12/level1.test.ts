import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const combs = _input.lines().map((l) => {
        const numbers = l.split(" ")[1].numbers();
        const springs = l.split(" ")[0].chars();

        const unknown = Math.pow(2, springs.filter((c) => c == "?").length);
        let sum = 0;

        const lines = [];
        for (let i = 0; i < unknown; i++) {
            const comb = i.toString(2).padStart(unknown.toString(2).length - 1, "0");

            let counter = 0;
            let line = "";
            for (let j = 0; j < springs.length; j++) {
                if (springs[j] == "?") {
                    line += comb[counter++] == "0" ? "#" : ".";
                } else line += springs[j];
            }

            lines.push(line);
        }

        for (const line of lines) {
            if (checkLine(line)) sum++;
        }

        return sum;

        function checkLine(line: string) {
            const reduceLine = line.reduceWS(/\.+/g).trim().split(" ");

            if (reduceLine.length != numbers.length) return 0;
            if (reduceLine.every((v, i) => v.length == numbers[i])) return 1;

            return 0;
        }
    });
    return combs.sum();
}
