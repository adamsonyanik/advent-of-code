import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => l.split("@").map((n) => ({ x: n.numbers()[0], y: n.numbers()[1], z: n.numbers()[2] })))
        .map((p) => ({ p: p[0], v: p[1] }));

    const time = 10000;

    const m = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const dx = input[i].v.x / input[j].v.x;
            const dy = input[i].v.y / input[j].v.y;
            const dz = input[i].v.z / input[j].v.z;

            m.push({
                dist: Math.abs(dx - dy) + Math.abs(dx - dz),
                lines: _input.lines()[i] + " | " + _input.lines()[j] + " | " + i + ", " + j,
                i0: i,
                i1: j
            });
        }
    }
    m.sort((a, b) => a.dist - b.dist);

    const matches: { t1: number; t2: number; t3: number }[] = [];

    const l1 = input[m[0].i0];
    const l2 = input[m[0].i1];
    const l1l2 = { x: l2.p.x - l1.p.x, y: l2.p.y - l1.p.y, z: l2.p.z - l1.p.z };

    const n = {
        x: l1.v.y * l1l2.z - l1.v.z * l1l2.y,
        y: l1.v.z * l1l2.x - l1.v.x * l1l2.z,
        z: l1.v.x * l1l2.y - l1.v.y * l1l2.x
    };

    function getIntersection(l3: { p: { x: number; y: number; z: number }; v: { x: number; y: number; z: number } }) {
        const p13 = { x: l1.p.x - l3.p.x, y: l1.p.y - l3.p.y, z: l1.p.z - l3.p.z };

        const vp13n = p13.x * n.x + p13.y * n.y + p13.z * n.z;
        const vplv3n = l3.v.x * n.x + l3.v.y * n.y + l3.v.z * n.z;

        const t = vp13n / vplv3n;
        const p = { x: l3.p.x + l3.v.x * t, y: l3.p.y + l3.v.y * t, z: l3.p.z + l3.v.z * t };

        return { t, p };
    }

    function getLine(points: { x: number; y: number; z: number }[]) {
        const avg = {
            x: points.map((p) => p.x).avg(),
            y: points.map((p) => p.y).avg(),
            z: points.map((p) => p.z).avg()
        };

        const dir0 = { x: points[0].x - avg.x, y: points[0].y - avg.y, z: points[0].z - avg.z };
        const forwardPoints = points.filter(
            (p) => dir0.x * (p.x - avg.x) + dir0.y * (p.y - avg.y) + dir0.z * (p.z - avg.z) > 0
        );
        const backwardPoints = points.filter(
            (p) => dir0.x * (p.x - avg.x) + dir0.y * (p.y - avg.y) + dir0.z * (p.z - avg.z) <= 0
        );

        const avgDir = {
            x: (forwardPoints.map((p) => p.x).avg() - backwardPoints.map((p) => p.x).avg()) / 2,
            y: (forwardPoints.map((p) => p.y).avg() - backwardPoints.map((p) => p.y).avg()) / 2,
            z: (forwardPoints.map((p) => p.z).avg() - backwardPoints.map((p) => p.z).avg()) / 2
        };

        return { p: avg, v: avgDir };
    }

    const points: { i: number; int: { p: { x: number; y: number; z: number }; t: number } }[] = [];
    for (let i = 0; i < input.length; i++) {
        if (i == m[0].i0 || i == m[0].i1) continue;
        points.push({ i, int: getIntersection(input[i]) });
    }

    function findPoints(i0: number, i1: number, i2: number, t0: number, t1: number, t2: number, range: number) {
        const matches = [];

        for (let t0i = t0 - range; t0i < t0 + range; t0i++) {
            const pos0 = {
                x: input[i0].p.x + input[i0].v.x * t0i,
                y: input[i0].p.y + input[i0].v.y * t0i,
                z: input[i0].p.z + input[i0].v.z * t0i
            };

            for (let t1i = t1 - range; t1i < t1 + range; t1i++) {
                const pos1 = {
                    x: input[i1].p.x + input[i1].v.x * t1i,
                    y: input[i1].p.y + input[i1].v.y * t1i,
                    z: input[i1].p.z + input[i1].v.z * t1i
                };

                for (let t2i = t2 - range; t2i < t2 + range; t2i++) {
                    const pos2 = {
                        x: input[i2].p.x + input[i2].v.x * t2i,
                        y: input[i2].p.y + input[i2].v.y * t2i,
                        z: input[i2].p.z + input[i2].v.z * t2i
                    };

                    if ((pos1.x - pos0.x) / (pos2.x - pos0.x) == (pos1.y - pos0.y) / (pos2.y - pos0.y)) {
                        matches.push(pos0, pos1, pos2);
                        console.log(pos0, pos1, pos2);
                    }
                }
            }
        }

        return matches;
    }

    const line = getLine(points.map((p) => p.int.p));

    const accPoints = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            for (let k = j + 1; k < points.length; k++) {
                accPoints.push(
                    ...findPoints(
                        points[i].i,
                        points[j].i,
                        points[k].i,
                        points[i].int.t,
                        points[j].int.t,
                        points[k].int.t,
                        10
                    )
                );
            }
        }
    }
    console.log(accPoints);
    console.log(
        `Gerade((${line.p.x}, ${line.p.y}, ${line.p.z}), (${line.p.x + line.v.x}, ${line.p.y + line.v.y}, ${
            line.p.z + line.v.z
        }))`
    );
    return matches;
}
