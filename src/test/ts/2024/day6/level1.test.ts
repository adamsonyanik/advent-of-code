import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.split(""));

    const startPos = { x: 0, y: 0, dir: 0 };
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[0].length; x++)
            if (input[y][x] == "^") {
                startPos.x = x;
                startPos.y = y;
            }

    const currentPos = { ...startPos };

    function move() {
        const dir = { x: 0, y: 0 };
        if (currentPos.dir == 0) dir.y = -1;
        else if (currentPos.dir == 1) dir.x = 1;
        else if (currentPos.dir == 2) dir.y = 1;
        else if (currentPos.dir == 3) dir.x = -1;

        if (input[currentPos.y + dir.y] && input[currentPos.y + dir.y][currentPos.x + dir.x] == "#")
            currentPos.dir = (currentPos.dir + 1) % 4;
        else if (!input[currentPos.y + dir.y] || !input[currentPos.y + dir.y][currentPos.x + dir.x]) return false;
        else {
            currentPos.x = currentPos.x + dir.x;
            currentPos.y = currentPos.y + dir.y;
        }

        return true;
    }

    const dPos = new Set();
    dPos.add(currentPos.x + "," + currentPos.y);
    while (move()) dPos.add(currentPos.x + "," + currentPos.y);
    return dPos.size;
}
