import data from "./day10.json";

test("day10", () => {
    getSignalStrength();
    console.log(buffer.map((e) => e.join("")).join("\n"));
});

const buffer: string[][] = [[]];
let x = 1;
let step = 0;

function getSignalStrength() {
    const input: ("noop" | { ins: "addx"; value: number })[] = getInput()
        .split("\n")
        .map((c) => {
            if (c.split(" ")[0] == "noop") {
                return "noop";
            } else {
                return { ins: "addx", value: Number(c.split(" ")[1]) };
            }
        });

    for (const i of input) {
        if (i !== "noop") {
            draw();
            draw();
            x += i.value;
        } else {
            draw();
        }
    }
}

function draw() {
    if (step > 39) {
        step = 0;
        buffer.push([]);
    }

    if (Math.abs(step - x) <= 1) {
        buffer[buffer.length - 1].push("#");
    } else {
        buffer[buffer.length - 1].push(".");
    }

    step++;
}

function getInput(): string {
    return data.data;
}
