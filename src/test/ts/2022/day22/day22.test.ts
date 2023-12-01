import data from "./day22.json";

test("day22", () => {
    console.log(getFinalCoords());
});

const map: string[][] = getInput()
    .split("\n\n")[0]
    .split("\n")
    .map((r) => r.split(""));

for (let y = 0; y < map.length; y++) {
    for (let x = map[y].length; x < map[0].length; x++) {
        map[y].push(" ");
    }
}

const password = getInput().split("\n\n")[1].split("");

const instructions: (string | "L" | "R")[] = [];

for (let i = 0; i < password.length; i++) {
    if (password[i] == "L" || password[i] == "R") {
        instructions.push(password[i]);
    } else {
        if (i == 0 || instructions[instructions.length - 1] == "L" || instructions[instructions.length - 1] == "R")
            instructions.push(password[i]);
        else instructions[instructions.length - 1] += password[i];
    }
}

const moves: (number | "L" | "R")[] = instructions.map((i) => {
    if (i == "L" || i == "R") {
        return i;
    } else return Number(i);
});

let pos = { x: 0, y: 0, facing: "r" };
for (let x = 0; x < map[0].length; x++) {
    if (map[0][x] == ".") {
        pos = { x: x, y: 0, facing: "r" };
        break;
    }
}
//   F R
//   D
// L B
// U
function move(steps: number): boolean {
    for (let i = 0; i < steps; i++) {
        let newPos = { x: pos.x, y: pos.y, facing: pos.facing };
        switch (pos.facing) {
            case "u":
                newPos.y--;
                break;
            case "d":
                newPos.y++;
                break;
            case "r":
                newPos.x++;
                break;
            case "l":
                newPos.x--;
                break;
        }

        if (
            newPos.x < 0 ||
            newPos.x >= map[0].length ||
            newPos.y < 0 ||
            newPos.y >= map.length ||
            map[newPos.y][newPos.x] == " "
        ) {
            if (newPos.y < 0 && newPos.x < 100) {
                // f - u
                newPos = { x: 0, y: newPos.x - 50 + 150, facing: getTurn("R", newPos.facing) };
            } else if (newPos.y < 0 && newPos.x > 99) {
                // r - u
                newPos = { x: newPos.x - 100, y: 199, facing: newPos.facing };
            } else if (newPos.x == 150) {
                // r - b
                newPos = { x: 99, y: 149 - newPos.y, facing: getTurn("O", newPos.facing) };
            } else if (newPos.x == 49 && newPos.y < 50 && newPos.facing == "l") {
                // f - l
                newPos = { x: 0, y: 149 - newPos.y, facing: getTurn("O", newPos.facing) };
            } else if (newPos.x >= 100 && newPos.y == 50 && newPos.facing == "d") {
                // r - d
                newPos = { x: 99, y: 50 + newPos.x - 100, facing: getTurn("R", newPos.facing) };
            } else if (newPos.x == 49 && newPos.y >= 50 && newPos.y <= 99 && newPos.facing == "l") {
                // d - l
                newPos = { x: newPos.y - 50, y: 100, facing: getTurn("L", newPos.facing) };
            } else if (newPos.x == 100 && newPos.y >= 50 && newPos.y <= 99 && newPos.facing == "r") {
                // d - r
                newPos = { x: newPos.y - 50 + 100, y: 49, facing: getTurn("L", newPos.facing) };
            } else if (newPos.x < 0 && newPos.y < 150) {
                // l - f
                newPos = { x: 50, y: 49 - (newPos.y - 100), facing: getTurn("O", newPos.facing) };
            } else if (newPos.x < 50 && newPos.y == 99 && newPos.facing == "u") {
                // l - d
                newPos = { x: 50, y: newPos.x + 50, facing: getTurn("R", newPos.facing) };
            } else if (newPos.x == 100 && newPos.y > 99 && newPos.facing == "r") {
                // b - r
                newPos = { x: 149, y: 49 - (newPos.y - 100), facing: getTurn("O", newPos.facing) };
            } else if (newPos.x > 49 && newPos.y == 150 && newPos.facing == "d") {
                // b - u
                newPos = { x: 49, y: 150 + newPos.x - 50, facing: getTurn("R", newPos.facing) };
            } else if (newPos.x < 0 && newPos.y > 149) {
                // u - f
                newPos = { x: 50 + (newPos.y - 150), y: 0, facing: getTurn("L", newPos.facing) };
            } else if (newPos.y > 199) {
                // u - r
                newPos = { x: newPos.x + 100, y: 0, facing: newPos.facing };
            } else if (newPos.x == 50 && newPos.y > 149 && newPos.facing == "r") {
                // u - b
                newPos = { x: newPos.y - 150 + 50, y: 149, facing: getTurn("L", newPos.facing) };
            } else throw new Error(newPos.x + ", " + newPos.y + ", " + newPos.facing);
        }

        if (map[newPos.y][newPos.x] == "#") return false;

        pos = newPos;
    }

    return true;
}

function turn(dir: "L" | "R") {
    if (dir == "R")
        switch (pos.facing) {
            case "u":
                pos.facing = "r";
                break;
            case "d":
                pos.facing = "l";
                break;
            case "r":
                pos.facing = "d";
                break;
            case "l":
                pos.facing = "u";
                break;
        }
    else
        switch (pos.facing) {
            case "u":
                pos.facing = "l";
                break;
            case "d":
                pos.facing = "r";
                break;
            case "r":
                pos.facing = "u";
                break;
            case "l":
                pos.facing = "d";
                break;
        }
}

function getTurn(dir: "L" | "R" | "O", look: string) {
    if (dir == "R")
        switch (look) {
            case "u":
                return "r";
            case "d":
                return "l";
            case "r":
                return "d";
            case "l":
                return "u";
        }
    else if (dir == "L")
        switch (look) {
            case "u":
                return "l";
            case "d":
                return "r";
            case "r":
                return "u";
            case "l":
                return "d";
        }
    else
        switch (look) {
            case "u":
                return "d";
            case "d":
                return "u";
            case "r":
                return "l";
            case "l":
                return "r";
        }

    throw new Error();
}

function getFaceCount(face: string) {
    switch (face) {
        case "u":
            return 3;
        case "d":
            return 1;
        case "r":
            return 0;
        case "l":
            return 2;
    }

    throw new Error();
}

function getFinalCoords() {
    pos = { x: 50, y: 0, facing: "u" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 50, y: 0, facing: "l" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 149, y: 0, facing: "r" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 100, y: 0, facing: "u" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 100, y: 49, facing: "d" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 50, y: 50, facing: "l" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 99, y: 50, facing: "r" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 0, y: 100, facing: "l" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 99, y: 100, facing: "r" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 0, y: 100, facing: "u" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 50, y: 149, facing: "d" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 49, y: 150, facing: "r" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 0, y: 150, facing: "l" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 0, y: 199, facing: "d" };
    drawPos();
    move(1);
    draw();

    console.log();

    pos = { x: 50, y: 0, facing: "r" };
    for (const m of moves) {
        if (m == "L" || m == "R") turn(m);
        else move(m);
    }

    return 1000 * (pos.y + 1) + 4 * (pos.x + 1) + getFaceCount(pos.facing);
}

function getCubeFace(x: number, y: number) {
    if (y < 50 && x < 100) return "F";
    else if (y < 50 && x < 150) return "R";
    else if (y < 100) return "D";
    else if (y < 150 && x < 50) return "L";
    else if (y < 150) return "B";
    else if (y < 200 && x < 50) return "U";

    throw new Error();
}

function drawPos() {
    console.log((pos.x % 50) + ", " + (pos.y % 50) + ", " + getCubeFace(pos.x, pos.y) + ", " + pos.facing);
}

function draw() {
    drawPos();
    //console.log(map.map((r, y) => y + " " + r.map((i, x) => pos.x == x && pos.y == y ? pos.facing : i).join("")).join("\n"));
}

function getInput(): string {
    /*return "        ...#\n" +
        "        .#..\n" +
        "        #...\n" +
        "        ....\n" +
        "...#.......#\n" +
        "........#...\n" +
        "..#....#....\n" +
        "..........#.\n" +
        "        ...#....\n" +
        "        .....#..\n" +
        "        .#......\n" +
        "        ......#.\n" +
        "\n" +
        "10R5L5R10L4R5L5";*/
    return data.data;
}
