type AStarNode<T> = T & {
    aStarProps: {
        f: number;
        g: number;
        h: number;
        cost: number;
        visited: boolean;
        closed: boolean;
        parent: null | AStarNode<T>;
    };
};

export const aStarGraphMap = (graph: { [key: string]: { [key: string]: number } }, start: string, end: string) => {
    return aStar<{ [key: string]: number }>(
        graph[start],
        graph[end],
        (i) =>
            Object.keys(i)
                .filter((k) => k !== "aStarProps")
                .map((key) => ({ node: graph[key], weight: i[key] })),
        () => 1,
        (e) => e == graph[end]
    ).map((e) => Object.keys(graph).find((key) => graph[key] === e)!);
};

export const aStarGraph = <T extends string | number>(
    graph: { node: T; neighbors: { node: T; weight: number }[] }[],
    start: T,
    end: T
) => {
    const map = graph.toMap((n) => n.node);
    function getNode(id: T) {
        return map.get(id)!;
    }

    return aStar<{ node: T; neighbors: { node: T; weight: number }[] }>(
        getNode(start),
        getNode(end),
        (i) => i.neighbors.map((n) => ({ node: getNode(n.node), weight: n.weight })),
        () => 1,
        (e) => e.node == end
    ).map((e) => e.node);
};

export const aStar = <T extends object>(
    start: T,
    end: T,
    getNeighbors: (node: T) => T[] | { node: T; weight: number }[],
    heuristic: (a: T, b: T) => number,
    isEnd: (node: T) => boolean = (n) => heuristic(n, end) == 0
) => {
    const startNode = initNode(start);
    const endNode = initNode(end);

    const openList: AStarNode<T>[] = [];
    const closedList: AStarNode<T>[] = [];
    openList.push(startNode);

    while (openList.length > 0) {
        let lowInd = 0;
        for (let i = 0; i < openList.length; i++)
            if (openList[i].aStarProps.f < openList[lowInd].aStarProps.f) lowInd = i;

        const currentNode = openList[lowInd];

        if (isEnd(currentNode)) {
            let curr = currentNode;
            const ret: AStarNode<T>[] = [];
            while (curr.aStarProps.parent) {
                ret.push(curr);
                curr = curr.aStarProps.parent;
            }
            ret.push(curr);
            return ret.reverse();
        }

        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        const weightedNeighbors = getNeighbors(currentNode);
        let neighbors: AStarNode<T>[] = [];
        let weights: number[] = [];
        if (weightedNeighbors.length > 0 && "node" in weightedNeighbors[0] && "weight" in weightedNeighbors[0]) {
            neighbors = weightedNeighbors.map((n) => initNode((n as { node: T }).node));
            weights = weightedNeighbors.map((n) => (n as { weight: number }).weight);
        } else {
            neighbors = weightedNeighbors.map((n) => initNode(n as T));
            weights = weightedNeighbors.map((n) => heuristic(n as T, currentNode));
        }

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            const weight = weights[i];
            if (closedList.indexOf(neighbor) != -1) continue;

            const gScore = currentNode.aStarProps.g + weight;
            let gScoreIsBest = false;

            if (openList.indexOf(neighbor) == -1) {
                gScoreIsBest = true;
                neighbor.aStarProps.h = heuristic(neighbor, endNode);
                openList.push(neighbor);
            } else if (gScore < neighbor.aStarProps.g) gScoreIsBest = true;

            if (gScoreIsBest) {
                neighbor.aStarProps.parent = currentNode;
                neighbor.aStarProps.g = gScore;
                neighbor.aStarProps.f = neighbor.aStarProps.g + neighbor.aStarProps.h;
            }
        }
    }

    throw new Error("no path found");
};

const initNode = <T extends object>(node: T): AStarNode<T> => {
    if ("aStarProps" in node) return node as AStarNode<T>;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    node.aStarProps = {
        f: 0,
        g: 0,
        h: 0,
        cost: 1,
        visited: false,
        closed: false,
        parent: null
    };

    return node as AStarNode<T>;
};

export const manhattan = (pos0: { x: number; y: number }, pos1: { x: number; y: number }) => {
    return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
};

export const manhattan3D = (pos0: { x: number; y: number; z: number }, pos1: { x: number; y: number; z: number }) => {
    return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y) + Math.abs(pos1.z - pos0.z);
};

export const euclidean = (pos0: { x: number; y: number }, pos1: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(pos1.x - pos0.x, 2) + Math.pow(pos1.y - pos0.y, 2));
};

export const euclidean3D = (pos0: { x: number; y: number; z: number }, pos1: { x: number; y: number; z: number }) => {
    return Math.sqrt(Math.pow(pos1.x - pos0.x, 2) + Math.pow(pos1.y - pos0.y, 2) + Math.pow(pos1.z - pos0.z, 2));
};

export const getGridNeighbors = <T>(grid: T[][], currentX: number, currentY: number, includeDiagonals: boolean) => {
    const ret = [];
    const x = currentX;
    const y = currentY;

    if (grid[y - 1] && grid[y - 1][x + 0]) ret.push(grid[y - 1][x + 0]);
    if (grid[y + 1] && grid[y + 1][x + 0]) ret.push(grid[y + 1][x + 0]);
    if (grid[y + 0] && grid[y + 0][x - 1]) ret.push(grid[y + 0][x - 1]);
    if (grid[y + 0] && grid[y + 0][x + 1]) ret.push(grid[y + 0][x + 1]);

    if (includeDiagonals) {
        if (grid[y - 1] && grid[y - 1][x - 1]) ret.push(grid[y - 1][x - 1]);
        if (grid[y + 1] && grid[y + 1][x - 1]) ret.push(grid[y + 1][x - 1]);
        if (grid[y - 1] && grid[y - 1][x + 1]) ret.push(grid[y - 1][x + 1]);
        if (grid[y + 1] && grid[y + 1][x + 1]) ret.push(grid[y + 1][x + 1]);
    }

    return ret;
};
