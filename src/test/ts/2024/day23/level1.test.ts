import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

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

    const groups = [];

    for (let i = 0; i < nodeList.length; i++)
        for (let j = i + 1; j < nodeList.length; j++)
            for (let k = j + 1; k < nodeList.length; k++) {
                if (
                    nodes.get(nodeList[i])!.includes(nodeList[j]) &&
                    nodes.get(nodeList[i])!.includes(nodeList[k]) &&
                    nodes.get(nodeList[j])!.includes(nodeList[k]) &&
                    (nodeList[i].startsWith("t") || nodeList[j].startsWith("t") || nodeList[k].startsWith("t"))
                )
                    groups.push([nodeList[i], nodeList[j], nodeList[k]]);
            }
    return groups.length;
}
