import "../../../../utils/index";
import fs from "fs";

test("level 1 example", async () => console.log(run()));

function run() {
    function to3D(points: number[], z: number) {
        const p = [];
        for (let i = 0; i + 1 < points.length; i += 2) p.push(points[i], points[i + 1], z);
        return p;
    }
    function tri(flipped: boolean): number[] {
        if (!flipped) return [0, 1, ...rotate([0, 1], 120), ...rotate([0, 1], 240)];
        else return translate(rotate(tri(false), 180), 0, -1);
    }
    function rotate(points: number[], angle: number) {
        const a = (angle * Math.PI) / 180;
        const p = [...points];
        for (let i = 0; i + 1 < p.length; i += 2) {
            const x = Math.cos(a) * p[i] - Math.sin(a) * p[i + 1];
            const y = Math.sin(a) * p[i] + Math.cos(a) * p[i + 1];
            p[i] = x;
            p[i + 1] = y;
        }

        return p;
    }

    function getMid(points: number[]) {
        const factor = 1000 / 3;
        return (
            Math.round((points[0] + points[2] + points[4]) * factor) +
            "," +
            Math.round((points[1] + points[3] + points[5]) * factor)
        );
    }

    function translate(points: number[], x: number, y: number) {
        const p = [...points];
        for (let i = 0; i + 1 < p.length; i += 2) {
            p[i] += x;
            p[i + 1] += y;
        }

        return p;
    }

    function flipX(points: number[], f: number) {
        const p = [...points];
        if (f % 2 == 0) return p;
        for (let i = 0; i + 1 < p.length; i += 6) {
            const x1 = -p[i];
            const y1 = p[i + 1];
            const x2 = -p[i + 4];
            const y2 = p[i + 5];
            const x3 = -p[i + 2];
            const y3 = p[i + 3];
            p[i] = x1;
            p[i + 1] = y1;
            p[i + 2] = x2;
            p[i + 3] = y2;
            p[i + 4] = x3;
            p[i + 5] = y3;
        }

        return p;
    }

    function flipY(points: number[], f: number) {
        let p = [...points];
        if (f % 2 == 0) return p;
        for (let i = 0; i + 1 < p.length; i += 6) {
            const x1 = p[i];
            const y1 = -p[i + 1];
            const x2 = p[i + 4];
            const y2 = -p[i + 5];
            const x3 = p[i + 2];
            const y3 = -p[i + 3];
            p[i] = x1;
            p[i + 1] = y1;
            p[i + 2] = x2;
            p[i + 3] = y2;
            p[i + 4] = x3;
            p[i + 5] = y3;
        }

        return translate(p, 0, -1);
    }

    const xTranslate = Math.sin((120 * Math.PI) / 180);
    const yTranslate = 1.5;

    const orangeTile = [
        ...tri(false),
        ...tri(true),
        ...translate(tri(false), xTranslate, -yTranslate),
        ...translate(tri(true), xTranslate, -yTranslate),
        ...translate(tri(false), 2 * xTranslate, -2 * yTranslate),
        ...translate(tri(true), 3 * xTranslate, -yTranslate),
        ...translate(tri(false), 4 * xTranslate, -2 * yTranslate),
        ...translate(tri(true), 4 * xTranslate, -2 * yTranslate),
        ...translate(tri(true), 5 * xTranslate, -yTranslate),
        ...translate(tri(false), 6 * xTranslate, -2 * yTranslate),
        ...translate(tri(true), 7 * xTranslate, -yTranslate),
        ...translate(tri(false), 7 * xTranslate, -yTranslate),
        ...translate(tri(true), 6 * xTranslate, 0)
    ];

    const blueTile = [
        ...tri(false),
        ...translate(tri(true), xTranslate, yTranslate),
        ...translate(tri(false), 2 * xTranslate, 0),
        ...translate(tri(true), 3 * xTranslate, yTranslate),
        ...translate(tri(false), 3 * xTranslate, yTranslate),
        ...translate(tri(true), 4 * xTranslate, 2 * yTranslate),
        ...translate(tri(false), 4 * xTranslate, 2 * yTranslate),
        ...translate(tri(true), 5 * xTranslate, 3 * yTranslate),
        ...translate(tri(false), 6 * xTranslate, 2 * yTranslate),
        ...translate(tri(true), 7 * xTranslate, 3 * yTranslate),
        ...translate(tri(false), 8 * xTranslate, 2 * yTranslate),
        ...translate(tri(true), 8 * xTranslate, 2 * yTranslate)
    ];

    const greenTile = [
        ...tri(false),
        ...tri(true),
        ...translate(tri(true), xTranslate, yTranslate),
        ...translate(tri(false), xTranslate, yTranslate),
        ...translate(tri(true), 2 * xTranslate, 2 * yTranslate),
        ...translate(tri(false), 3 * xTranslate, yTranslate),
        ...translate(tri(true), 4 * xTranslate, 2 * yTranslate),
        ...translate(tri(false), 4 * xTranslate, 2 * yTranslate),
        ...translate(tri(false), 5 * xTranslate, yTranslate),
        ...translate(tri(true), 6 * xTranslate, 2 * yTranslate),
        ...translate(tri(false), 6 * xTranslate, 2 * yTranslate)
    ];

    const yellowTile = [
        ...tri(false),
        ...translate(tri(true), -xTranslate, yTranslate),
        ...translate(tri(true), xTranslate, yTranslate),
        ...translate(tri(false), 2 * xTranslate, 0),
        ...translate(tri(true), 2 * xTranslate, 0),
        ...translate(tri(false), 3 * xTranslate, -yTranslate),
        ...translate(tri(true), 3 * xTranslate, -yTranslate),
        ...translate(tri(false), 4 * xTranslate, -2 * yTranslate),
        ...translate(tri(true), 4 * xTranslate, -2 * yTranslate),
        ...translate(tri(false), 3 * xTranslate, -3 * yTranslate),
        ...translate(tri(true), 3 * xTranslate, -3 * yTranslate),
        ...translate(tri(false), 2 * xTranslate, -4 * yTranslate),
        ...translate(tri(true), xTranslate, -3 * yTranslate)
    ];

    const tiles = [yellowTile, blueTile, greenTile, orangeTile];
    const colors = [0xffff00, 0x5588ff, 0x007700, 0xffaa00];

    const edgeGridEasy = [
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ]
    ];
    const edgeGridHard = [
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
            [1, 1],
            [0, 1],
            [0, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ],
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 0],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ]
    ];
    const edgeGrid = edgeGridHard;
    const edge = [];
    const board = new Set<string>();

    for (let y = 0; y < edgeGrid.length; y++)
        for (let x = 0; x < edgeGrid[y].length; x++) {
            if ((y + x) % 2 != 0) continue;

            const t = translate(tri(false), x * xTranslate, y * yTranslate);
            const tFlipped = translate(tri(true), x * xTranslate, y * yTranslate);
            if (edgeGrid[y][x][0] == 1) edge.push(...t);
            else board.add(getMid(t));
            if (edgeGrid[y][x][1] == 1) edge.push(...tFlipped);
            else board.add(getMid(tFlipped));
        }

    const possible: { x: number; y: number; a: number; fx: number; fy: number }[][] = [];

    for (let tileI = 0; tileI < tiles.length; tileI++) {
        possible[tileI] = [];
        for (let a = 0; a < 360; a += 120) {
            const currentTileRotated = rotate(tiles[tileI], a);
            for (let fx = 0; fx < 2; fx++) {
                for (let fy = 0; fy < 2; fy++) {
                    const currentTileRotatedFlipped = flipY(flipX(currentTileRotated, fx), fy);
                    for (let y = 0; y < edgeGrid.length; y++)
                        for (let x = 0; x < edgeGrid[y].length; x++) {
                            if ((y + x) % 2 != 0) continue;
                            const currentTile = translate(currentTileRotatedFlipped, x * xTranslate, y * yTranslate);
                            if (canPlaceTile(currentTile, board)) possible[tileI].push({ x, y, a, fx, fy });
                        }
                }
            }
        }
    }

    function canPlaceTile(tile: number[], board: Set<string>) {
        for (let i = 0; i < tile.length; i += 6) {
            const mid = getMid(tile.slice(i, i + 6));
            if (board.has(mid)) continue;
            else return false;
        }
        return true;
    }

    function removeTileFromBoard(tile: number[], board: Set<string>) {
        for (let i = 0; i < tile.length; i += 6) board.delete(getMid(tile.slice(i, i + 6)));
    }

    function btPlaceTile(
        board: Set<string>,
        tilePlacement: { x: number; y: number; a: number; fx: number; fy: number }[]
    ): { x: number; y: number; a: number; fx: number; fy: number }[][] {
        if (tilePlacement.length == 4) return [tilePlacement];

        const configs = [];

        const tI = tilePlacement.length;
        for (let i = 0; i < possible[tI].length; i++) {
            const cp = possible[tI][i];
            const currentTile = translate(
                flipY(flipX(rotate(tiles[tI], cp.a), cp.fx), cp.fy),
                cp.x * xTranslate,
                cp.y * yTranslate
            );
            if (!canPlaceTile(currentTile, board)) continue;

            const newBoard = new Set([...board]);
            removeTileFromBoard(currentTile, newBoard);
            configs.push(...btPlaceTile(newBoard, [...tilePlacement, possible[tilePlacement.length][i]]));
        }

        return configs;
    }

    const configs = btPlaceTile(board, []);

    const meshes = {
        "0": [
            [
                { mesh: to3D(orangeTile, 0), color: 0xffaa00 },
                { mesh: to3D(blueTile, 0), color: 0x5588ff },
                { mesh: to3D(greenTile, 0), color: 0x007700 },
                { mesh: to3D(flipY(yellowTile, 1), 0), color: 0xffff00 },
                { mesh: to3D(edge, -0.5), color: 0xffffff }
            ],
            [{ line: [0, 0, 0, 0, 0, 10], color: 0xff0000 }],
            []
        ]
    };

    for (let i = 0; i < configs.length; i++) {
        // @ts-ignore
        meshes["" + (i + 1)] = [
            [
                ...configs[i].map((t, i) => ({
                    mesh: to3D(
                        translate(flipY(flipX(rotate(tiles[i], t.a), t.fx), t.fy), t.x * xTranslate, t.y * yTranslate),
                        0
                    ),
                    color: colors[i]
                })),
                { mesh: to3D(edge, -0.5), color: 0xffffff }
            ],
            [],
            []
        ];
    }

    const meshesVis = { controls: { display: configs.length + 1 }, meshes };
    fs.writeFile(`${__dirname}/meshes/a.json`, JSON.stringify(meshesVis), () => {});
    return configs.length;
}
