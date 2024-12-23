import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 2", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const nodes = new Map<string, string[]>();
    const input = _input.lines().map((l) => {
        const n = l.split("-");
        if (!nodes.has(n[0])) nodes.set(n[0], []);
        if (!nodes.has(n[1])) nodes.set(n[1], []);

        nodes.get(n[0])!.push(n[1]);
        nodes.get(n[1])!.push(n[0]);
    });

    const nodeList = [...nodes.keys()];
    let groups = new Set<string>(nodeList);

    while (groups.size > 1) {
        const newGroups = new Set<string>();
        for (const g of groups) {
            const groupNodes = g.split(",");
            nLoop: for (const n of nodeList) {
                if (groupNodes.includes(n)) continue;
                for (const gi of groupNodes) if (!nodes.get(n)!.includes(gi)) continue nLoop;

                newGroups.add([...groupNodes, n].sortAlphaAsc().join(","));
            }
        }
        groups = newGroups;
    }
    return [...groups][0];
}
