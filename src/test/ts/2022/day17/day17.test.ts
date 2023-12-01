import data from "./day17.json";

test("day17", () => {
    console.log(getHeightAfter(10000));
});

type Rock = ("#" | " ")[][];

function getRock(index: number) {
    return rocks[index % rocks.length];
}

function getRockRight(index: number) {
    return rocksRight[index % rocks.length];
}

function getRockLeft(index: number) {
    return rocksLeft[index % rocks.length];
}

function getRockDown(index: number) {
    return rocksDown[index % rocks.length];
}

const jetStream: ("<" | ">")[] = getInput()
    .split("")
    .map((v) => v as "<" | ">");

function getJetStream(index: number) {
    return jetStream[index % jetStream.length];
}

function getInput(): string {
    //return ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";
    return data.data;
}

function getHeightAfter(iterations: number) {
    const grid: Rock = [["#", "#", "#", "#", "#", "#", "#"]];
    let height = 0;
    let lastHeight = 0;
    let iJetStream = 0;
    const heights = [];

    for (let iRock = 0; iRock < iterations; iRock++) {
        heights.push(height - lastHeight);
        const newRock = getRock(iRock);
        setHeight(grid, height + 3 + newRock.length);
        insertRock(grid, newRock, height + 3);
        //draw(grid, height - 20, height + 10, "+");
        let pos = { x: 2, y: height + 3 + newRock.length };
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (getJetStream(iJetStream++) == ">") {
                if (moveRight(grid, iRock, pos)) pos = { x: pos.x + 1, y: pos.y };

                //draw(grid, height - 20, height + 10, ">");
            } else {
                if (moveLeft(grid, iRock, pos)) pos = { x: pos.x - 1, y: pos.y };

                //draw(grid, height - 20, height + 10, "<");
            }
            if (!moveDown(grid, iRock, pos)) break;
            pos = { x: pos.x, y: pos.y - 1 };
            //draw(grid, height - 20, height + 10, "V continue");
        }
        //draw(grid, height - 20, height + 10, "V stop");
        lastHeight = height;
        height = Math.max(pos.y, height);
    }

    console.log(heights.join(""));
    return height;
}

function draw(grid: Rock, min: number, max: number, op: string) {
    //console.log(op + "\n\n" + grid.filter((f, index) => index >= min && index <= max).reverse().map(r => "|" + r.join("") + "|").join("\n"));
}

function setHeight(grid: Rock, height: number): Rock {
    while (grid.length <= height) {
        grid.push([" ", " ", " ", " ", " ", " ", " "]);
    }

    return grid;
}

function insertRock(grid: Rock, rock: Rock, height: number): Rock {
    for (let y = 0; y < rock.length; y++) {
        for (let x = 0; x < rock[y].length; x++) {
            grid[height + rock.length - y][x + 2] = rock[y][x];
        }
    }

    return grid;
}

function moveRight(grid: Rock, rockIndex: number, pos: { x: number; y: number }): boolean {
    const rockMove = getRockRight(rockIndex);
    for (let y = 0; y < rockMove.length; y++) {
        for (let x = 0; x < rockMove[y].length; x++) {
            if (rockMove[y][x] != "#") continue;
            if (pos.x + x == 6) return false;
            if (grid[pos.y - y][pos.x + x + 1] == "#") return false;
        }
    }

    const rock = getRock(rockIndex);
    for (let y = 0; y < rock.length; y++) {
        for (let x = rock[y].length - 1; x >= 0; x--) {
            if (rock[y][x] != "#") continue;
            grid[pos.y - y][pos.x + x] = " ";
            grid[pos.y - y][pos.x + x + 1] = "#";
        }
    }

    return true;
}

function moveLeft(grid: Rock, rockIndex: number, pos: { x: number; y: number }) {
    const rockMove = getRockLeft(rockIndex);
    for (let y = 0; y < rockMove.length; y++) {
        for (let x = 0; x < rockMove[y].length; x++) {
            if (rockMove[y][x] != "#") continue;
            if (pos.x + x == 0) return false;
            if (grid[pos.y - y][pos.x + x - 1] == "#") return false;
        }
    }

    const rock = getRock(rockIndex);
    for (let y = 0; y < rock.length; y++) {
        for (let x = 0; x < rock[y].length; x++) {
            if (rock[y][x] != "#") continue;
            grid[pos.y - y][pos.x + x] = " ";
            grid[pos.y - y][pos.x + x - 1] = "#";
        }
    }

    return true;
}

function moveDown(grid: Rock, rockIndex: number, pos: { x: number; y: number }): boolean {
    const rockMove = getRockDown(rockIndex);
    for (let y = 0; y < rockMove.length; y++) {
        for (let x = 0; x < rockMove[y].length; x++) {
            if (rockMove[y][x] != "#") continue;
            if (grid[pos.y - y - 1][pos.x + x] == "#") return false;
        }
    }

    const rock = getRock(rockIndex);
    for (let y = rock.length - 1; y >= 0; y--) {
        for (let x = 0; x < rock[y].length; x++) {
            if (rock[y][x] != "#") continue;
            grid[pos.y - y][pos.x + x] = " ";
            grid[pos.y - y - 1][pos.x + x] = "#";
        }
    }

    return true;
}

const rocks: Rock[] = [
    [["#", "#", "#", "#"]],
    [
        [" ", "#", " "],
        ["#", "#", "#"],
        [" ", "#", " "]
    ],
    [
        [" ", " ", "#"],
        [" ", " ", "#"],
        ["#", "#", "#"]
    ],
    [["#"], ["#"], ["#"], ["#"]],
    [
        ["#", "#"],
        ["#", "#"]
    ]
];

const rocksLeft: Rock[] = [
    [["#", " ", " ", " "]],
    [
        [" ", "#", " "],
        ["#", " ", " "],
        [" ", "#", " "]
    ],
    [
        [" ", " ", "#"],
        [" ", " ", "#"],
        ["#", " ", " "]
    ],
    [["#"], ["#"], ["#"], ["#"]],
    [
        ["#", " "],
        ["#", " "]
    ]
];

const rocksRight: Rock[] = [
    [[" ", " ", " ", "#"]],
    [
        [" ", "#", " "],
        [" ", " ", "#"],
        [" ", "#", " "]
    ],
    [
        [" ", " ", "#"],
        [" ", " ", "#"],
        [" ", " ", "#"]
    ],
    [["#"], ["#"], ["#"], ["#"]],
    [
        [" ", "#"],
        [" ", "#"]
    ]
];

const rocksDown: Rock[] = [
    [["#", "#", "#", "#"]],
    [
        [" ", " ", " "],
        ["#", " ", "#"],
        [" ", "#", " "]
    ],
    [
        [" ", " ", " "],
        [" ", " ", " "],
        ["#", "#", "#"]
    ],
    [[" "], [" "], [" "], ["#"]],
    [
        [" ", " "],
        ["#", "#"]
    ]
];
