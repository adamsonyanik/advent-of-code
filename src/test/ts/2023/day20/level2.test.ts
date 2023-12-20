import "../../../../utils/index";
import { readExample, readInput } from "../../../../utils";
import { lcm } from "../../../../utils/math";

test("level 2 example", async () => console.log(run(await readExample(__dirname))));
test("level 2", async () => console.log(run(await readInput(__dirname))));

function run(_input: string) {
    const input = _input
        .lines()
        .map((l) => {
            let id = l.split(" -> ")[0];
            let type = "broadcast";
            let state: any = false;
            if (id.startsWith("%")) {
                id = id.substring(1);
                type = "flipflop";
            }
            if (id.startsWith("&")) {
                id = id.substring(1);
                type = "con";
                state = new Map<string, boolean>();
            }
            const connections = l.split(" -> ")[1].words();
            return { id, type, connections, state: state };
        })
        .toMap((c) => c.id);

    for (const comp of input.values()) {
        for (const n of comp.connections) {
            const c = input.get(n)!;
            if (c && c.type == "con") (c.state as Map<string, boolean>).set(comp.id, false);
        }
    }

    let presses = 0;
    const vdPulses = new Map<string, number>();

    while (vdPulses.size < input.get("vd")!.state.size) {
        presses++;
        const pulses: { from: string; to: string; isHigh: boolean }[] = [];
        pulseAt(pulses, "button", "broadcaster", false);

        while (pulses.length) {
            const pulse = pulses.shift()!;
            pulseAt(pulses, pulse.from, pulse.to, pulse.isHigh);
        }
    }

    function pulseAt(pulses: any[], from: string, to: string, isHigh: boolean) {
        const com = input.get(to)!;
        if (!com) return;
        if (com.type == "broadcast") {
            for (const c of com.connections) pulses.push({ from: to, to: c, isHigh });
        } else if (com.type == "flipflop") {
            if (!isHigh) {
                com.state = !com.state;
                for (const c of com.connections) pulses.push({ from: to, to: c, isHigh: com.state });
            }
        } else {
            const map = com.state as Map<string, boolean>;
            if (isHigh && to == "vd") vdPulses.set(from, presses);
            map.set(from, isHigh);
            for (const c of com.connections)
                pulses.push({ from: to, to: c, isHigh: ![...map.values()].every((v) => v) });
        }
    }

    return lcm(...vdPulses.values());
}
