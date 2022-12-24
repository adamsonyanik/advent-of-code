import data from "./day24.json";

test("day24", () => {
    console.log(getShortestPath());
});

const map: string[][] = getInput().split("\n").map(r => r.split(""));

const blizzards: { x: number, y: number, dirX: number, dirY: number }[] = [];

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        switch (map[y][x]) {
            case ">":
                blizzards.push({x: x, y: y, dirX: 1, dirY: 0});
                break;
            case "<":
                blizzards.push({x: x, y: y, dirX: -1, dirY: 0});
                break;
            case "^":
                blizzards.push({x: x, y: y, dirX: 0, dirY: -1});
                break;
            case "v":
                blizzards.push({x: x, y: y, dirX: 0, dirY: 1});
                break;
        }
    }
}

let possiblePos: { x: number, y: number }[] = [{x: 1, y: 0}];

function getShortestPath() {
    let i = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        moveBlizzards();
        possiblePos = getAllOptions((a, b) => (b.x + b.y) - (a.x + a.y));
        i++;
        const atEnd = possiblePos.filter(p => p.y == map.length - 1);
        if (atEnd.length > 0) {
            possiblePos = atEnd;
            break;
        }
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
        moveBlizzards();
        possiblePos = getAllOptions((a, b) => (a.x + a.y) - (b.x + b.y));
        i++;
        const atEnd = possiblePos.filter(p => p.y == 0);
        if (atEnd.length > 0) {
            possiblePos = atEnd;
            break;
        }
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
        moveBlizzards();
        possiblePos = getAllOptions((a, b) => (b.x + b.y) - (a.x + a.y));
        i++;
        const atEnd = possiblePos.filter(p => p.y == map.length - 1);
        if (atEnd.length > 0) {
            possiblePos = atEnd;
            break;
        }
    }

    return i;
}

function moveBlizzards() {
    for (const b of blizzards) {
        b.x += b.dirX;
        b.y += b.dirY;

        if (b.x == 0)
            b.x = map[0].length - 2;

        if (b.y == 0)
            b.y = map.length - 2;

        if (b.x == map[0].length - 1)
            b.x = 1;

        if (b.y == map.length - 1)
            b.y = 1;
    }
}

function draw() {
    const grid: string[][] = [];

    for (let y = 0; y < map.length; y++) {
        grid.push([]);
        for (let x = 0; x < map[y].length; x++) {
            const bli = blizzards.filter(b => b.x == x && b.y == y);
            if (bli.length == 1) {
                grid[y].push(toArrow(bli[0].dirX, bli[0].dirY));
            } else if (bli.length > 1 && bli.length < 10) {
                grid[y].push("" + bli.length);
            } else if (bli.length > 1) {
                grid[y].push("0");
            } else {
                grid[y].push(map[y][x] == "#" ? "#" : ".");
            }
        }
    }

    console.log(grid.map(r => r.join("")).join("\n"));
}

function toArrow(x: number, y: number) {
    if (x == 0) {
        if (y == 1)
            return "v";
        else return "^";
    } else {
        if (x == 1)
            return ">";
        else return "<";
    }
}

function getAllOptions(sort: (a: { x: number, y: number }, b: { x: number, y: number }) => number) {
    const opt: { x: number, y: number }[] = [];
    for (const pos of possiblePos) {
        for (const p of getOptions(pos))
            if (opt.filter(a => a.x == p.x && a.y == p.y).length == 0)
                opt.push(p);
    }

    const size = 100;
    if (opt.length > size)
        return opt.sort(sort).slice(0, size);

    return opt;
}

function getOptions(pos: { x: number, y: number }) {
    const options: { x: number, y: number }[] = [];
    if (blizzards.filter(b => b.x == pos.x && b.y == pos.y).length == 0) {
        options.push({x: pos.x, y: pos.y});
    }
    if (pos.x - 1 >= 0 && blizzards.filter(b => b.x == pos.x - 1 && b.y == pos.y).length == 0 && map[pos.y][pos.x - 1] != "#") {
        options.push({x: pos.x - 1, y: pos.y});
    }
    if (pos.x + 1 < map[0].length && blizzards.filter(b => b.x == pos.x + 1 && b.y == pos.y).length == 0 && map[pos.y][pos.x + 1] != "#") {
        options.push({x: pos.x + 1, y: pos.y});
    }
    if (pos.y - 1 >= 0 && blizzards.filter(b => b.x == pos.x && b.y == pos.y - 1).length == 0 && map[pos.y - 1][pos.x] != "#") {
        options.push({x: pos.x, y: pos.y - 1});
    }
    if (pos.y + 1 < map.length && blizzards.filter(b => b.x == pos.x && b.y == pos.y + 1).length == 0 && map[pos.y + 1][pos.x] != "#") {
        options.push({x: pos.x, y: pos.y + 1});
    }

    return options;
}

function getInput(): string {
    /*return "#.######\n" +
        "#>>.<^<#\n" +
        "#.<..<<#\n" +
        "#>v.><>#\n" +
        "#<^v^^>#\n" +
        "######.#";*/
    return data.data;
}
