import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const combs = _input.lines().map((l) => {
        const numbers = new Array(5).fill(l.split(" ")[1].numbers()).flat();
        const springs = new Array(5).fill(l.split(" ")[0]).join("?");

        const state = new Map();
        return getCombsFromIndex(0, 0, 0);

        function getCombsFromIndex(i: number, numbersI: number, blockLength: number) {
            const hash = i + "," + numbersI + "," + blockLength;
            if (state.has(hash)) return state.get(hash);

            if (i >= springs.length) {
                if (
                    (numbersI == numbers.length && blockLength == 0) ||
                    (numbersI == numbers.length - 1 && blockLength == numbers[numbersI])
                )
                    return 1;
                else return 0;
            }

            let combs = 0;
            if (springs[i] == "?" || springs[i] == "#") combs += getCombsFromIndex(i + 1, numbersI, blockLength + 1);
            if (springs[i] == "?" || springs[i] == ".") {
                if (blockLength == 0) combs += getCombsFromIndex(i + 1, numbersI, 0);
                else if (blockLength > 0 && numbersI < numbers.length && numbers[numbersI] == blockLength)
                    combs += getCombsFromIndex(i + 1, numbersI + 1, 0);
            }

            state.set(hash, combs);
            return combs;
        }
    });
    return combs.sum();
}
