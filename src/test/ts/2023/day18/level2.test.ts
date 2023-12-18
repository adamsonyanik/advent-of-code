import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => {
        const hex = parseInt(l.split(" ")[2].substring(2, 7), 16);
        const dir = ["R", "D", "L", "U"][Number(l.split(" ")[2][7])];

        return { dir: dir, len: hex };
    });

    let pos = { x: 0, y: 0 };
    const coords = [pos];

    for (const ins of input) {
        if (ins.dir == "R") {
            pos.x += ins.len;
        }
        if (ins.dir == "U") {
            pos.y -= ins.len;
        }
        if (ins.dir == "L") {
            pos.x -= ins.len;
        }
        if (ins.dir == "D") {
            pos.y += ins.len;
        }

        coords.push({ ...pos });
    }

    let sum = 0;

    for (let i = 0; i < coords.length - 1; i++) {
        sum += coords[i].x * coords[i + 1].y - coords[i].y * coords[i + 1].x;
    }
    const edges = input.map((i) => i.len).sum();
    return (Math.abs(sum) + edges) / 2 + 1;
}
