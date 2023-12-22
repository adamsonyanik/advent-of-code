import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

type Brick = { start: { x: number; y: number; z: number }; end: { x: number; y: number; z: number } };

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => ({
            start: {
                x: l.split("~")[0].numbers()[0],
                y: l.split("~")[0].numbers()[1],
                z: l.split("~")[0].numbers()[2]
            },
            end: { x: l.split("~")[1].numbers()[0], y: l.split("~")[1].numbers()[1], z: l.split("~")[1].numbers()[2] }
        }))
        .sort((a, b) => a.start.z - b.start.z);

    function isInBrick(pos: { x: number; y: number; z: number }, brick: Brick) {
        return (
            pos.x >= brick.start.x &&
            pos.x <= brick.end.x &&
            pos.y >= brick.start.y &&
            pos.y <= brick.end.y &&
            pos.z >= brick.start.z &&
            pos.z <= brick.end.z
        );
    }

    function pushDown(brick: Brick, allBricks: Brick[], theoretically: boolean) {
        let isClearBeneath = brick.start.z > 0;
        if (isClearBeneath)
            loop: for (let x = brick.start.x; x <= brick.end.x; x++) {
                for (let y = brick.start.y; y <= brick.end.y; y++) {
                    for (const b of allBricks)
                        if (isInBrick({ x, y, z: brick.start.z - 1 }, b)) {
                            isClearBeneath = false;
                            break loop;
                        }
                }
            }

        if (!isClearBeneath) return false;

        if (!theoretically) {
            brick.start.z--;
            brick.end.z--;
        }
        return true;
    }

    function canBeRemoved(brick: Brick) {
        let canBeR = true;
        const removed = input.filter(
            (b) =>
                !(
                    b.start.x == brick.start.x &&
                    b.start.y == brick.start.y &&
                    b.start.z == brick.start.z &&
                    b.end.x == brick.end.x &&
                    b.end.y == brick.end.y &&
                    b.end.z == brick.end.z
                )
        );
        for (const b of input)
            if (pushDown(b, removed, true)) {
                canBeR = false;
                break;
            }
        return canBeR;
    }

    for (const b of input) while (pushDown(b, input, false)) {}
    return input.filter((b) => canBeRemoved(b)).length;
}
