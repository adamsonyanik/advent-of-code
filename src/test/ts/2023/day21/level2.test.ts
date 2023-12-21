import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.chars());

    const gridYLength = input.length;
    const gridXLength = input[0].length;

    const steps = 26501365;

    let s = { x: -1, y: -1 };
    for (let y = 0; y < gridYLength; y++) for (let x = 0; x < gridXLength; x++) if (input[y][x] == "S") s = { x, y };

    const distanceMap = getDistancesInNeighborhood();
    const longDistanceMapCache = new Map<string, number>();

    let plots = 0;

    for (let y = 0; y < gridYLength; y++)
        for (let x = 0; x < gridXLength; x++)
            for (let tileY = -1; tileY <= 1; tileY++)
                for (let tileX = -1; tileX <= 1; tileX++) {
                    const dist = distanceMap.get([x, y, tileX, tileY].join())!;
                    if (dist % 2 == steps % 2 && dist <= steps) plots++;

                    if (Math.abs(tileX) == 1 && Math.abs(tileY) == 1) plots += getPlotsForFarTiles(dist, true);
                    else if (Math.abs(tileX) == 1 || Math.abs(tileY) == 1) plots += getPlotsForFarTiles(dist, false);
                }

    return plots;

    function getDistancesInNeighborhood() {
        const distances = new Map<string, number>();
        const open = [{ x: s.x, y: s.y, tileX: 0, tileY: 0, dist: 0 }];
        while (open.length) {
            const pos = open.shift()!;

            if (pos.x < 0) {
                pos.tileX -= 1;
                pos.x += gridXLength;
            } else if (pos.x >= gridXLength) {
                pos.tileX += 1;
                pos.x -= gridXLength;
            }

            if (pos.y < 0) {
                pos.tileY -= 1;
                pos.y += gridYLength;
            } else if (pos.y >= gridYLength) {
                pos.tileY += 1;
                pos.y -= gridYLength;
            }

            if (input[pos.y][pos.x] == "#") continue;
            if (Math.abs(pos.tileX) > 2 || Math.abs(pos.tileY) > 2) continue;
            if (distances.has([pos.x, pos.y, pos.tileX, pos.tileY].join())) continue;
            distances.set([pos.x, pos.y, pos.tileX, pos.tileY].join(), pos.dist);

            for (const dir of [
                { x: 0, y: -1 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 }
            ])
                open.push({
                    x: pos.x + dir.x,
                    y: pos.y + dir.y,
                    tileX: pos.tileX,
                    tileY: pos.tileY,
                    dist: pos.dist + 1
                });
        }

        return distances;
    }

    function getPlotsForFarTiles(dist: number, isDiagonal: boolean) {
        const longDistCached = longDistanceMapCache.get([dist, isDiagonal].join());
        if (longDistCached) return longDistCached;

        const restTiles = Math.floor((steps - dist) / gridYLength);
        let plots = 0;
        for (let x = 1; x <= restTiles; x++) {
            const longDist = dist + gridYLength * x;
            if (longDist % 2 == steps % 2 && longDist <= steps) plots += isDiagonal ? x + 1 : 1;
        }
        longDistanceMapCache.set([dist, isDiagonal].join(), plots);
        return plots;
    }
}
