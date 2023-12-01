import data from "./day16.json";

test("day16", () => {
    console.log(getMostFlowRateIn(26));
});

type ValveNet = { id: string; flowRate: number; links: string[] }[];

const valveNet: ValveNet = getInput()
    .split("\n")
    .map((v) => ({
        id: v.split(";")[0].split("=")[0],
        flowRate: Number(v.split(";")[0].split("=")[1]),
        links: v.split(";")[1].split(",")
    }));

const flowValves = ["AA", ...valveNet.filter((v) => v.flowRate != 0).map((v) => v.id)];

type Context = {
    currentPos: string;
    currentPosElephant: string;
    openedValves: string[];
    openedValvesAt: number[];
    minMe: number;
    minElephant: number;
};

const shorterNet: { id: string; flowRate: number; links: { id: string; distance: number }[] }[] = [];
for (const v of flowValves) {
    const links = [];
    for (const link of flowValves) {
        if (link == v) continue;

        const other = shorterNet.filter((n) => n.id == link)[0];
        if (other != null) {
            links.push({ id: link, distance: other.links.filter((n) => n.id == v)[0].distance });
        } else {
            links.push({ id: link, distance: search(v, link).length + 1 });
        }
    }
    shorterNet.push({ id: v, flowRate: getValve(v).flowRate, links: links });
}

function getMostFlowRateIn(limit: number): number {
    const context = explore({
        currentPos: "AA",
        currentPosElephant: "AA",
        openedValves: [],
        openedValvesAt: [],
        minMe: limit,
        minElephant: limit
    });
    return calcReleasedPressure(context);
}

function explore(context: Context): Context {
    const options = getOptions(context);
    const contexts: Context[] = [];

    let counter = 0;
    if (context.minMe > context.minElephant) {
        for (const linkMe of options.linksMe) {
            contexts.push(
                explore({
                    currentPos: linkMe.id,
                    currentPosElephant: context.currentPosElephant,
                    openedValves: [...context.openedValves, linkMe.id],
                    openedValvesAt: [...context.openedValvesAt, context.minMe - linkMe.distance],
                    minMe: context.minMe - linkMe.distance,
                    minElephant: context.minElephant
                })
            );
        }
    } else {
        for (const linkElephant of options.linksElephant) {
            contexts.push(
                explore({
                    currentPos: context.currentPos,
                    currentPosElephant: linkElephant.id,
                    openedValves: [...context.openedValves, linkElephant.id],
                    openedValvesAt: [...context.openedValvesAt, context.minElephant - linkElephant.distance],
                    minMe: context.minMe,
                    minElephant: context.minElephant - linkElephant.distance
                })
            );

            if (context.minElephant == 26) {
                counter++;
                console.log("finished: " + counter + " / " + options.linksElephant.length);
            }
        }
    }

    if (contexts.length == 0) {
        return context;
    }
    return contexts.sort((a, b) => calcReleasedPressure(b) - calcReleasedPressure(a))[0];
}

function calcReleasedPressure(context: Context) {
    let sum = 0;
    for (let i = 0; i < context.openedValves.length; i++) {
        sum += getValveSN(context.openedValves[i]).flowRate * context.openedValvesAt[i];
    }
    return sum;
}

function getOptions(context: Context) {
    return {
        linksMe: getValveSN(context.currentPos).links.filter(
            (v) => context.minMe >= v.distance && !context.openedValves.includes(v.id)
        ),
        linksElephant: getValveSN(context.currentPosElephant).links.filter(
            (v) => context.minElephant >= v.distance && !context.openedValves.includes(v.id)
        )
    };
}

function getValveSN(id: string) {
    return shorterNet.filter((v) => v.id == id)[0];
}

function getValve(id: string) {
    return valveNet.filter((v) => v.id == id)[0];
}

function getInput(): string {
    /*return "AA=0;DD,II,BB\n" +
        "BB=13;CC,AA\n" +
        "CC=2;DD,BB\n" +
        "DD=20;CC,AA,EE\n" +
        "EE=3;FF,DD\n" +
        "FF=0;EE,GG\n" +
        "GG=0;FF,HH\n" +
        "HH=22;GG\n" +
        "II=0;AA,JJ\n" +
        "JJ=21;II";*/

    return data.data;
}

type AStarNode = { id: string; f: number; g: number; h: number; parent: AStarNode };

function search(startPos: string, endPos: string): AStarNode[] {
    const gridNodes: AStarNode[] = [];

    for (const v of valveNet) {
        gridNodes.push({
            id: v.id,
            f: 0,
            g: 0,
            h: 0,
            parent: null
        });
    }

    const start = gridNodes.filter((n) => n.id == startPos)[0];
    const end = gridNodes.filter((n) => n.id == endPos)[0];

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

        if (currentNode == end) {
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
                neighbor.h = heuristic(neighbor.id, end.id);
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

function heuristic(pos0: string, pos1: string): number {
    return 1;
}

function neighbors(grid: AStarNode[], node: AStarNode): AStarNode[] {
    return grid.filter((n) => getValve(node.id).links.includes(n.id));
}
