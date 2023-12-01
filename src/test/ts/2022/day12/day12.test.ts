import data from "./day12.json";

test("day12", () => {
    console.log(getShortestPath());
});

type Pos = { x: number; y: number };

function getShortestPath() {
    let start = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };

    const grid = getInput()
        .split("\n")
        .map((e) => e.split(""));
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == "S") {
                start = { x, y };
            } else if (grid[y][x] == "E") {
                end = { x, y };
            }
        }
    }

    const input = getInput()
        .split("\n")
        .map((e) =>
            e.split("").map((c) => {
                if (c == "S") {
                    return 0;
                } else if (c == "E") {
                    return 25;
                }

                return c.charCodeAt(0) - 97;
            })
        );

    const startingPos = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            if (input[y][x] == 0) {
                const path = search(input, { x, y }, end);
                if (path) {
                    startingPos.push(path.length);
                }
            }
        }
    }

    startingPos.sort();
    return startingPos[0];
}

function getInput(): string {
    return data.data;
}

type AStarNode = { id: number; pos: Pos; f: number; g: number; h: number; parent: AStarNode; height: number };

function search(grid: number[][], startPos: Pos, endPos: Pos): AStarNode[] {
    const gridNodes: AStarNode[][] = [];

    let id = 0;
    for (let y = 0; y < grid.length; y++) {
        gridNodes.push([]);
        for (let x = 0; x < grid[y].length; x++) {
            gridNodes[y].push({
                id: id,
                pos: { x: x, y: y },
                f: 0,
                g: 0,
                h: 0,
                parent: null,
                height: grid[y][x]
            });
            id++;
        }
    }

    const start = gridNodes.flat().filter((n) => n.pos.x == startPos.x && n.pos.y == startPos.y)[0];
    const end = gridNodes.flat().filter((n) => n.pos.x == endPos.x && n.pos.y == endPos.y)[0];

    const openList: AStarNode[] = [];
    const closedList: AStarNode[] = [];
    openList.push(start);

    while (openList.length > 0) {
        let lowInd = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowInd].f) {
                lowInd = i;
            }
        }
        const currentNode = openList[lowInd];

        if (currentNode.pos.x == end.pos.x && currentNode.pos.y == end.pos.y) {
            let curr = currentNode;
            const ret = [];
            while (curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }

        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);
        const neighborA = neighbors(gridNodes, currentNode);

        for (let i = 0; i < neighborA.length; i++) {
            const neighbor = neighborA[i];
            if (closedList.includes(neighbor)) {
                continue;
            }

            const gScore = currentNode.g + 1;
            let gScoreIsBest = false;

            if (!openList.includes(neighbor)) {
                gScoreIsBest = true;
                neighbor.h = heuristic(neighbor.pos, end.pos);
                openList.push(neighbor);
            } else if (gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                neighbor.parent = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }
    return null;
}

function heuristic(pos0: Pos, pos1: Pos): number {
    return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
}

function neighbors(grid: AStarNode[][], node: AStarNode): AStarNode[] {
    const ret = [];
    const x = node.pos.x;
    const y = node.pos.y;

    if (grid[y] && grid[y][x - 1] && grid[y][x - 1].height <= node.height + 1) {
        ret.push(grid[y][x - 1]);
    }
    if (grid[y] && grid[y][x + 1] && grid[y][x + 1].height <= node.height + 1) {
        ret.push(grid[y][x + 1]);
    }
    if (grid[y - 1] && grid[y - 1][x] && grid[y - 1][x].height <= node.height + 1) {
        ret.push(grid[y - 1][x]);
    }
    if (grid[y + 1] && grid[y + 1][x] && grid[y + 1][x].height <= node.height + 1) {
        ret.push(grid[y + 1][x]);
    }
    return ret;
}
