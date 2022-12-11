import data from "./day9.json";

test("day9", () => {
    console.log(getNumUniquePos());
});

const head: { x: number, y: number } = {x: 0, y: 0};
const body: { x: number, y: number }[] = [];
const tail: { x: number, y: number } = {x: 0, y: 0};

const tailPositions: { x: number, y: number }[] = [{x: 0, y: 0}];

function getNumUniquePos() {
    for (let i = 0; i < 8; i++) {
        body.push({x: 0, y: 0});
    }

    const input: { dir: "U" | "D" | "L" | "R", amount: number }[] = getInput().split("\n").map(c => ({
        dir: c.split(" ")[0] as "U" | "D" | "L" | "R",
        amount: Number(c.split(" ")[1])
    }));

    const steps: { x: number, y: number }[] = [];

    for (const d of input) {
        for (let i = 0; i < d.amount; i++) {
            if (d.dir == "U") {
                steps.push({x: 0, y: 1});
            } else if (d.dir == "D") {
                steps.push({x: 0, y: -1});
            } else if (d.dir == "L") {
                steps.push({x: -1, y: 0});
            } else if (d.dir == "R") {
                steps.push({x: 1, y: 0});
            }
        }
    }

    for (const s of steps) {
        step(s);
    }

    return tailPositions.length;
}

function step(dir: { x: number, y: number }) {
    head.x += dir.x;
    head.y += dir.y;

    if (!isTouching(head, body[0])) {
        body[0].x += Math.min(1, Math.max(-1, head.x - body[0].x));
        body[0].y += Math.min(1, Math.max(-1, head.y - body[0].y));
    }

    for (let i = 1; i < 8; i++) {
        if (!isTouching(body[i - 1], body[i])) {
            body[i].x += Math.min(1, Math.max(-1, body[i - 1].x - body[i].x));
            body[i].y += Math.min(1, Math.max(-1, body[i - 1].y - body[i].y));
        }
    }

    if (!isTouching(body[7], tail)) {
        setTailInDir(Math.min(1, Math.max(-1, body[7].x - tail.x)), Math.min(1, Math.max(-1, body[7].y - tail.y)));
    }
}

function isTouching(first: { x: number, y: number }, next: { x: number, y: number }) {
    return !(Math.abs(first.x - next.x) > 1 || Math.abs(first.y - next.y) > 1 || Math.abs(first.x - next.x) + Math.abs(first.y - next.y) > 2);
}

function setTailInDir(x: number, y: number) {
    tail.x += x;
    tail.y += y;

    if (tailPositions.filter(p => p.x == tail.x && p.y == tail.y).length == 0) {
        tailPositions.push({x: tail.x, y: tail.y});
    }
}

function getInput(): string {
    return data.data;
}
