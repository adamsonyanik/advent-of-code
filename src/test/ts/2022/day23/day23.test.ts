import data from "./day23.json";

test("day23", () => {
    console.log(getFinalCoords());
});

const map: string[][] = getInput()
    .split("\n")
    .map((r) => r.split(""));

const elves: { id: number; x: number; y: number }[] = [];

let id = 0;

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] == "#") elves.push({ id: id++, x: x, y: y });
    }
}

function getFinalCoords() {
    for (let i = 0; i < 1000; i++) {
        const nextPos = simulatePossiblePos(i);

        let counter = 0;
        for (const elv of elves) {
            const pos = nextPos.filter((e) => e.id == elv.id)[0];
            if (elv.x == pos.x && elv.y == pos.y) continue;
            if (nextPos.filter((e) => e.id != elv.id && e.x == pos.x && e.y == pos.y).length > 0) continue;

            elv.x = pos.x;
            elv.y = pos.y;
            counter++;
        }
        if (counter == 0) {
            draw();
            return i + 1;
        }
    }

    return -1;
}

function draw() {
    const minX = Math.min(...elves.map((e) => e.x));
    const maxX = Math.max(...elves.map((e) => e.x));
    const minY = Math.min(...elves.map((e) => e.y));
    const maxY = Math.max(...elves.map((e) => e.y));

    const grid: string[][] = [];
    for (let y = minY; y <= maxY; y++) {
        grid.push([]);
        for (let x = minX; x <= maxX; x++) {
            if (elves.filter((e) => e.x == x && e.y == y).length > 0) grid[grid.length - 1].push("#");
            else grid[grid.length - 1].push(".");
        }
    }

    console.log(grid.map((e) => e.join("")).join("\n"));
}

function simulatePossiblePos(it: number) {
    it = it % 4;
    const newElves: { id: number; x: number; y: number }[] = [];

    for (const elv of elves) {
        const newElf = { id: elv.id, x: elv.x, y: elv.y };
        if (!isElfSurrounded(elv.x, elv.y)) {
        } else if (
            it < 1 &&
            !isElfAt(elv.x - 1, elv.y - 1) &&
            !isElfAt(elv.x, elv.y - 1) &&
            !isElfAt(elv.x + 1, elv.y - 1)
        ) {
            newElf.y--;
        } else if (
            it < 2 &&
            !isElfAt(elv.x - 1, elv.y + 1) &&
            !isElfAt(elv.x, elv.y + 1) &&
            !isElfAt(elv.x + 1, elv.y + 1)
        ) {
            newElf.y++;
        } else if (
            it < 3 &&
            !isElfAt(elv.x - 1, elv.y - 1) &&
            !isElfAt(elv.x - 1, elv.y) &&
            !isElfAt(elv.x - 1, elv.y + 1)
        ) {
            newElf.x--;
        } else if (
            it < 4 &&
            !isElfAt(elv.x + 1, elv.y - 1) &&
            !isElfAt(elv.x + 1, elv.y) &&
            !isElfAt(elv.x + 1, elv.y + 1)
        ) {
            newElf.x++;
        } else if (!isElfAt(elv.x - 1, elv.y - 1) && !isElfAt(elv.x, elv.y - 1) && !isElfAt(elv.x + 1, elv.y - 1)) {
            newElf.y--;
        } else if (!isElfAt(elv.x - 1, elv.y + 1) && !isElfAt(elv.x, elv.y + 1) && !isElfAt(elv.x + 1, elv.y + 1)) {
            newElf.y++;
        } else if (!isElfAt(elv.x - 1, elv.y - 1) && !isElfAt(elv.x - 1, elv.y) && !isElfAt(elv.x - 1, elv.y + 1)) {
            newElf.x--;
        } else if (!isElfAt(elv.x + 1, elv.y - 1) && !isElfAt(elv.x + 1, elv.y) && !isElfAt(elv.x + 1, elv.y + 1)) {
            newElf.x++;
        }

        newElves.push(newElf);
    }
    return newElves;
}

function isElfAt(x: number, y: number) {
    return elves.filter((e) => e.x == x && e.y == y).length > 0;
}

function isElfSurrounded(posx: number, posy: number) {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (x == 0 && y == 0) continue;

            if (elves.filter((e) => e.x == x + posx && e.y == y + posy).length > 0) return true;
        }
    }

    return false;
}

function getInput(): string {
    /*return "....#..\n" +
        "..###.#\n" +
        "#...#.#\n" +
        ".#...##\n" +
        "#.###..\n" +
        "##.#.##\n" +
        ".#..#..";*/
    return data.data;
}
