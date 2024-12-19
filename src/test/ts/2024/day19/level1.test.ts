import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const input = _input.lines().map((l) => l);
    const patterns = input[0].split(", ");

    const designs = input.slice(2);

    function couldMakeDesign(have: string, should: string): boolean {
        if (have == should) return true;
        for (const p of patterns) {
            if (!should.startsWith(have + p)) continue;
            if (couldMakeDesign(have + p, should)) return true;
        }
        return false;
    }

    return designs.filter((d) => couldMakeDesign("", d)).length;
}
