import data from "./day11.json";

test("day11", () => {
    console.log(getMonkeyBusiness());
});

type Monkey = {
    inspections: number,
    items: number[],
    op: (old: number) => number,
    test: (n: number) => number
}

function getMonkeyBusiness() {
    const monkeys: Monkey[] = [
        {
            inspections: 0,
            items: [64],
            op: (old: number) => old * 7,
            test: (n: number) => n % 13 == 0 ? 1 : 3,
        },
        {
            inspections: 0,
            items: [60, 84, 84, 65],
            op: (old: number) => old + 7,
            test: (n: number) => n % 19 == 0 ? 2 : 7,
        },
        {
            inspections: 0,
            items: [52, 67, 74, 88, 51, 61],
            op: (old: number) => old * 3,
            test: (n: number) => n % 5 == 0 ? 5 : 7,
        },
        {
            inspections: 0,
            items: [67, 72],
            op: (old: number) => old + 3,
            test: (n: number) => n % 2 == 0 ? 1 : 2,
        },
        {
            inspections: 0,
            items: [80, 79, 58, 77, 68, 74, 98, 64],
            op: (old: number) => old * old,
            test: (n: number) => n % 17 == 0 ? 6 : 0,
        },
        {
            inspections: 0,
            items: [62, 53, 61, 89, 86],
            op: (old: number) => old + 8,
            test: (n: number) => n % 11 == 0 ? 4 : 6,
        },
        {
            inspections: 0,
            items: [86, 89, 82],
            op: (old: number) => old + 2,
            test: (n: number) => n % 7 == 0 ? 3 : 0,
        },
        {
            inspections: 0,
            items: [92, 81, 70, 96, 69, 84, 83],
            op: (old: number) => old + 4,
            test: (n: number) => n % 3 == 0 ? 4 : 5,
        },
    ];

    for (let i = 0; i < 10000; i++) {
        round(monkeys);
    }

    monkeys.sort((a, b) => (b.inspections - a.inspections) as unknown as number);

    return monkeys[0].inspections * monkeys[1].inspections;
}

function round(monkeys: Monkey[]) {
    for (const m in monkeys) {
        monkeyTurn(monkeys, m as unknown as number);
    }
}

function monkeyTurn(monkeys: Monkey[], turn: number) {
    for (const i of monkeys[turn].items) {
        monkeys[turn].inspections++;
        // const wLvl = Math.floor(monkeys[turn].op(i) / 3);
        const wLvl = monkeys[turn].op(i) % (13 * 19 * 5 * 2 * 17 * 11 * 7 * 3);
        const nextMonkey = monkeys[turn].test(wLvl);
        monkeys[nextMonkey].items.push(wLvl);
    }

    monkeys[turn].items = [];
}

function getInput(): string {
    return data.data;
}
