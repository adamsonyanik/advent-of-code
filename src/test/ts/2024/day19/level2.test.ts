import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l);
    const patterns = input[0].split(", ");

    const designs = input.slice(2);

    const cache = new Map<string, number>();

    function couldMakeDesign(rest: string): number {
        if (cache.has(rest)) return cache.get(rest)!;
        if (rest == "") return 1;

        let c = 0;
        for (const p of patterns) {
            if (!rest.startsWith(p)) continue;
            c += couldMakeDesign(rest.substring(p.length));
        }
        cache.set(rest, c);
        return c;
    }

    let counter = 0;
    for (const d of designs) counter += couldMakeDesign(d);
    return counter;
}
