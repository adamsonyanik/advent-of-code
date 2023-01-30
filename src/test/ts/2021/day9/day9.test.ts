import data from "./day9.json";

test("day9", () => {
    console.log(getLowPoints());
});

const map: number[][] = getInput().split("\n").map(r => r.split("").map(p => Number(p)));

function getLowPoints() {
    const lowPoints = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const p = map[y][x];
            if ((!(map[y + 1] !== undefined && map[y + 1][x] !== undefined) || map[y + 1][x] > p) &&
                (!(map[y] !== undefined && map[y][x + 1] !== undefined) || map[y][x + 1] > p) &&
                (!(map[y - 1] !== undefined && map[y - 1][x] !== undefined) || map[y - 1][x] > p) &&
                (!(map[y] !== undefined && map[y][x - 1] !== undefined) || map[y][x - 1] > p))
                lowPoints.push({x, y});
        }
    }

    const basins = [];
    for (const p of lowPoints) {
        basins.push(getBasinSize(p));
    }

    const top3 = basins.sort((a, b) => b - a).filter((v, i) => i < 3);
    return top3.reduce((p, c) => p * c, 1);
}

function getBasinSize(p: { x: number, y: number }) {
    const checkedPositions: { x: number, y: number }[] = [];
    getNeighbors(p, checkedPositions);
    return checkedPositions.filter(n => map[n.y][n.x] !== 9).length;
}

function getNeighbors(p: { x: number, y: number }, checkedPositions: { x: number, y: number }[]) {
    if (checkedPositions.filter(c => p.x === c.x && p.y === c.y).length !== 0)
        return;

    if (map[p.y] === undefined || map[p.y][p.x] === undefined)
        return;

    if (map[p.y][p.x] == 9)
        return;

    checkedPositions.push(p);

    getNeighbors({x: p.x, y: p.y + 1}, checkedPositions);
    getNeighbors({x: p.x, y: p.y - 1}, checkedPositions);
    getNeighbors({x: p.x + 1, y: p.y}, checkedPositions);
    getNeighbors({x: p.x - 1, y: p.y}, checkedPositions);
}

function getInput(): string {
    /*return "2199943210\n" +
        "3987894921\n" +
        "9856789892\n" +
        "8767896789\n" +
        "9899965678";*/
    return data.data;
}
