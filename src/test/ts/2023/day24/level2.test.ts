// @ts-ignore
import nerdamer from "nerdamer/nerdamer.core.js";
import "nerdamer/Algebra.js";
import "nerdamer/Calculus.js";
import "nerdamer/Solve.js";
import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => l.split("@").map((n) => ({ x: n.numbers()[0], y: n.numbers()[1], z: n.numbers()[2] })))
        .map((p) => ({ p: p[0], v: p[1] }));

    // p.x + t*v.x = x + t*v ; line intersection at same time t, for rock and line
    // t = (x - p.x) / (v.x - v) ; analogous for y and z
    // => (x - p.x) / (v.x - v) = (y - p.y) / (v.y - w) = (z - p.z) / (v.z - u)

    // => (x - p.x) / (v.x - v) - (y - p.y) / (v.y - w) = 0
    // => (y - p.y) / (v.y - w) - (z - p.z) / (v.z - u) = 0

    const eq = [];

    for (const p of input.slice(0, 4)) {
        eq.push(`(x-${p.p.x})/(${p.v.x}-v)-(y-${p.p.y})/(${p.v.y}-w)=0`);
        eq.push(`(y-${p.p.y})/(${p.v.y}-w)-(z-${p.p.z})/(${p.v.z}-u)=0`);
    }

    console.log(eq);

    console.log(nerdamer.solveEquations(["2*x-y=8", "10*x+7*y-z=53", "4*z+y=6"]));
    // @ts-ignore
    const sol = nerdamer.solveEquations(eq, ["x", "y", "z", "v", "w", "u"]);
    console.log(sol.toString());
    console.log(
        input
            .slice(0, 4)
            .map(
                (p) =>
                    `(x - ${p.p.x}) / (${p.v.x} - v) - (y - ${p.p.y}) / (${p.v.y} - w),\n\t(y - ${p.p.y}) / (${p.v.y} - w) - (z - ${p.p.z}) / (${p.v.z} - u)`
            )
            .join(",\n\t") + "\n])"
    );

    const solved = { u: 289, v: -86, w: -143, x: 334948624416533, y: 371647004954419, z: 142351957892081 };
    return solved.x + solved.y + solved.z;
}
