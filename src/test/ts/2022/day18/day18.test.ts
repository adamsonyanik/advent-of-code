import data from "./day18.json";

test("day18", async () => {
    const area = await getSurfaceArea();
    console.log(area);
});

const cubes = getInput()
    .split("\n")
    .map((r) => ({
        x: Number(r.split(",")[0]),
        y: Number(r.split(",")[1]),
        z: Number(r.split(",")[2])
    }));

const max = {
    x: Math.max(...cubes.map((c) => c.x)),
    y: Math.max(...cubes.map((c) => c.y)),
    z: Math.max(...cubes.map((c) => c.z))
};

const nCoords = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 }
];

async function getSurfaceArea() {
    const grid: boolean[][][] = [];

    for (let z = 0; z <= max.z; z++) {
        grid.push([]);
        for (let y = 0; y <= max.y; y++) {
            grid[z].push([]);
            for (let x = 0; x <= max.x; x++) {
                grid[z][y].push(false);
            }
        }
    }

    for (const cube of cubes) {
        grid[cube.z][cube.y][cube.x] = true;
    }

    await walk(grid, { x: 0, y: 0, z: 0 }, []);

    return counter;
}

let counter = 0;

async function walk(grid: boolean[][][], pos: { x: number; y: number; z: number }, visited: string[]) {
    visited.push(`${pos.x},${pos.y},${pos.z}`);
    for (const coord of nCoords) {
        const c = { x: coord.x + pos.x, y: coord.y + pos.y, z: coord.z + pos.z };
        if (c.x < -1 || c.x > max.x + 1 || c.y < -1 || c.y > max.y + 1 || c.z < -1 || c.z > max.z + 1) continue;
        if (visited.includes(`${c.x},${c.y},${c.z}`)) continue;
        if (grid[c.z] && grid[c.z][c.y] && grid[c.z][c.y][c.x]) {
            counter++;
            continue;
        }

        await walk(grid, c, visited);
    }
}

function getInput(): string {
    /*return "2,2,2\n" +
        "1,2,2\n" +
        "3,2,2\n" +
        "2,1,2\n" +
        "2,3,2\n" +
        "2,2,1\n" +
        "2,2,3\n" +
        "2,2,4\n" +
        "2,2,6\n" +
        "1,2,5\n" +
        "3,2,5\n" +
        "2,1,5\n" +
        "2,3,5";*/
    return data.data;
}
