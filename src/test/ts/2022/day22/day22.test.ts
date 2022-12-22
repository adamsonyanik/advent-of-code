import data from "./day22.json";

test("day22", () => {
    console.log(getFinalCoords());
});

const map: string[][] = getInput().split("\n\n")[0].split("\n").map(r => r.split(""));

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
        else
            instructions[instructions.length - 1] += password[i];
    }
}

const moves: (number | "L" | "R")[] = instructions.map(i => {
    if (i == "L" || i == "R") {
        return i;
    } else return Number(i);
});

let pos = {x: 0, y: 0, facing: "r"};
for (let x = 0; x < map[0].length; x++) {
    if (map[0][x] == ".") {
        pos = {x: x, y: 0, facing: "r"};
        break;
    }
}

function move(steps: number): boolean {
    for (let i = 0; i < steps; i++) {
        const newPos = {x: pos.x, y: pos.y, facing: pos.facing};
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

        if (newPos.x < 0 || newPos.x >= map[0].length || newPos.y < 0 || newPos.y >= map.length || map[newPos.y][newPos.x] == " ") {
            if (newPos.facing == "u") {
                for (let y = newPos.y + 1; y < map.length; y++) {
                    if (map[y][newPos.x] == " ") {
                        newPos.y = y - 1;
                        break;
                    }
                    if (y == map.length - 1)
                        newPos.y = map.length - 1;
                }
            }

            if (newPos.facing == "d") {
                for (let y = newPos.y - 1; y >= 0; y--) {
                    if (map[y][newPos.x] == " ") {
                        newPos.y = y + 1;
                        break;
                    }
                    if (y == 0)
                        newPos.y = 0;
                }
            }

            if (newPos.facing == "r") {
                for (let x = newPos.x - 1; x >= 0; x--) {
                    if (map[newPos.y][x] == " ") {
                        newPos.x = x + 1;
                        break;
                    }

                    if (x == 0)
                        newPos.x = 0;
                }
            }

            if (newPos.facing == "l") {
                for (let x = newPos.x + 1; x < map[0].length; x++) {
                    if (map[newPos.y][x] == " ") {
                        newPos.x = x - 1;
                        break;
                    }
                    if (x == map[0].length - 1)
                        newPos.x = map[0].length - 1;
                }
            }
        }

        if (map[newPos.y][newPos.x] == "#")
            return false;

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
    for (const m of moves) {
        if (m == "L" || m == "R")
            turn(m);
        else move(m);

        //console.log(map/*.filter((r, i) => i >= pos.y - 30 && i <= pos.y + 30)*/.map((r, y) => y + " " + r.map((i, x) => pos.x == x && pos.y == y ? pos.facing : i).join("")).join("\n"));
    }

    return 1000 * (pos.y + 1) + 4 * (pos.x + 1) + getFaceCount(pos.facing);
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
