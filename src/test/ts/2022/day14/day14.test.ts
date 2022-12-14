import data from "./day14.json";

test("day14", () => {
    console.log(getMaxSand());
});

function getMaxSand() {
    const paths = getInput().split("\n").map(p => p.split(" -> ").map(pos => ({
        x: Number(pos.split(",")[0]),
        y: Number(pos.split(",")[1])
    })));


    let ys = [...paths.map(p => p.map(pos => pos.y)).flat(), 0];

    let maxY = Math.max(...ys);

    paths.push([{x: 100, y: maxY + 2}, {x: 800, y: maxY + 2}]);

    const xs = [...paths.map(p => p.map(pos => pos.x)).flat(), 500];
    ys = [...paths.map(p => p.map(pos => pos.y)).flat(), 0];

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    maxY = Math.max(...ys);

    const grid: ("." | "#" | "o" | "+")[][] = [];

    for (let y = 0; y <= maxY - minY; y++) {
        grid.push([]);
        for (let x = 0; x <= maxX - minX; x++) {
            if (x == 500 - minX && y == 0)
                grid[y].push("+");
            grid[y].push(".");
        }
    }

    for (const p of paths) {
        for (let i = 0; i < p.length - 1; i++) {
            const xStart = (p[i].x < p[i + 1].x ? p[i].x : p[i + 1].x) - minX;
            const xEnd = (p[i].x > p[i + 1].x ? p[i].x : p[i + 1].x) - minX;
            const yStart = (p[i].y < p[i + 1].y ? p[i].y : p[i + 1].y) - minY;
            const yEnd = (p[i].y > p[i + 1].y ? p[i].y : p[i + 1].y) - minY;

            for (let x = xStart; x <= xEnd; x++) {
                for (let y = yStart; y <= yEnd; y++) {
                    grid[y][x] = "#";
                }
            }
        }
    }

    let counter = 0;
    while (dropSand(grid, 500 - minX)) {
        //console.log(grid.map(r => r.join("")).join("\n"));
        counter++;
    }

    return counter + 1;
}

function getInput(): string {
    return data.data;
}

function dropSand(grid: ("." | "#" | "o" | "+")[][], x: number): boolean {
    let pos: { x: number, y: number } = {x: x, y: 0};
    while (pos.x < grid[0].length && pos.x >= 0 && pos.y < grid.length - 1 && pos.y >= 0) {
        if (grid[pos.y + 1][pos.x] == ".") {
            pos = {x: pos.x, y: pos.y + 1};
        } else if (pos.x == 0) {
            return false;
        } else if (grid[pos.y + 1][pos.x - 1] == ".") {
            pos = {x: pos.x - 1, y: pos.y + 1};
        } else if (pos.x == grid[0].length - 1) {
            return false;
        } else if (grid[pos.y + 1][pos.x + 1] == ".") {
            pos = {x: pos.x + 1, y: pos.y + 1};
        } else if (pos.x == x && pos.y == 0) {
            console.log("at top");
            return false;
        } else {
            grid[pos.y][pos.x] = "o";
            //console.log(pos.y + "," + pos.x);
            return true;
        }
    }
    return false;
}
