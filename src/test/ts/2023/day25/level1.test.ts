import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname))));
test("level 1", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input.lines().map((l) => l.words());
    const map = new Map<string, { id: string; neighbors: string[] }>();

    for (const line of input) {
        if (!map.has(line[0])) map.set(line[0], { id: line[0], neighbors: [] });

        for (const n of line.slice(1)) {
            if (!map.has(n)) map.set(n, { id: n, neighbors: [] });

            map.get(line[0])!.neighbors.push(n);
            map.get(n)!.neighbors.push(line[0]);
        }
    }

    /*let noCon: { a: string; b: string }[] = [];
    const allConnections = [...map.values()]
        .flatMap((c) => c.neighbors.map((n) => ({ a: c.id, b: n })))
        .filter((c) => c.a.localeCompare(c.b) < 0);

    const filteredCons = [];
    for (let i = 0; i < allConnections.length; i++) {
        const a = allConnections[i];
        if (findPaths(a.a, a.b) <= 4) {
            console.log(a);
            filteredCons.push(a);
        }
    }

    console.log(allConnections.map((c) => c.a + " " + c.b).join("\n"));

    console.log(allConnections.length, filteredCons.length);

    loop: for (let i = 0; i < filteredCons.length; i++) {
        const a = filteredCons[i];
        console.log(i);
        for (let j = i + 1; j < filteredCons.length; j++) {
            const b = filteredCons[j];
            if (a.a == b.a && a.b == b.b) continue;
            for (let k = j + 1; k < filteredCons.length; k++) {
                const c = filteredCons[k];
                if ((a.a == c.a && a.b == c.b) || (b.a == c.a && b.b == c.b)) continue;
                if (floodFill(a.a, [a, b, c]) != map.size) {
                    console.log(a, b, c);
                    noCon = [a, b, c];
                    break loop;
                }
            }
        }
    }*/
    const g1 = floodFill("grh", [
        { a: "grh", b: "nvh" },
        { a: "jzj", b: "vkb" },
        { a: "hhx", b: "vrx" }
    ]);
    return g1 * (map.size - g1);
    function floodFill(start: string, noConnection: { a: string; b: string }[]) {
        const open: string[] = [start];
        const seen = new Set<string>();
        while (open.length) {
            const pos = open.pop()!;
            if (seen.has(pos)) continue;
            seen.add(pos);

            const posInNoCon = noConnection.some((c) => c.a == pos || c.b == pos);
            const node = map.get(pos)!;
            if (node == undefined) {
                console.log(node);
            }
            for (const n of map.get(pos)!.neighbors) {
                if (
                    posInNoCon &&
                    noConnection.filter((c) => (c.a == pos && c.b == n) || (c.b == pos && c.a == n)).length
                )
                    continue;
                open.push(n);
            }
        }

        return seen.size;
    }

    function findPaths(start: string, end: string) {
        const open: string[] = [start];
        let paths = 0;
        const seen = new Set<string>();
        while (open.length) {
            const pos = open.pop()!;
            if (pos == end) paths++;
            if (seen.has(pos)) continue;
            seen.add(pos);

            for (const n of map.get(pos)!.neighbors) {
                open.push(n);
            }
        }
        return paths;
    }
}
