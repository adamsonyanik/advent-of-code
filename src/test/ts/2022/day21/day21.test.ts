import data from "./day21.json";

test("day21", () => {
    console.log(getRootNumber());
});

const names: Map<string, [a: string, op: string, b: string] | number> = new Map();

getInput().split("\n").map(r => {
    let evaluate: [a: string, op: string, b: string] | number;
    if (r.includes("+") || r.includes("-") || r.includes("*") || r.includes("/")) {
        const st = r.split(": ")[1];
        const a = st.split(" ")[0];
        const op = st.split(" ")[1];
        const b = st.split(" ")[2];
        evaluate = [a, op, b];
    } else
        evaluate = Number(r.split(": ")[1]);

    names.set(r.split(":")[0], evaluate);
});

function getNumber(name: string): number {
    const number = names.get(name);
    if (name == "root")
        return getNumber(number[0]) == getNumber(number[2]) ? 1 : 0;

    if (Array.isArray(number))
        switch (number[1]) {
            case "+":
                return getNumber(number[0]) + getNumber(number[2]);
            case "-":
                return getNumber(number[0]) - getNumber(number[2]);
            case "*":
                return getNumber(number[0]) * getNumber(number[2]);
            case "/":
                return getNumber(number[0]) / getNumber(number[2]);
        }
    return number as number;
}

function findToHumn(name: string, array: string[]): string[] {
    if (Array.isArray(names.get(name))) {
        const a = findToHumn(names.get(name)[0], [...array, name]);
        const b = findToHumn(names.get(name)[2], [...array, name]);
        if (a.length > 0)
            return a;
        else
            return b;
    } else {
        if (name == "humn")
            return [...array, "humn"];
        return [];
    }
}

function correct(name: string, number: number, route: string[]): number {
    if (name == "humn")
        return number;

    else {
        if (route.includes(names.get(name)[0]))
            switch (names.get(name)[1]) {
                case "+":
                    return correct(names.get(name)[0], number - getNumber(names.get(name)[2]), route);
                case "-":
                    return correct(names.get(name)[0], number + getNumber(names.get(name)[2]), route);
                case "*":
                    return correct(names.get(name)[0], number / getNumber(names.get(name)[2]), route);
                case "/":
                    return correct(names.get(name)[0], number * getNumber(names.get(name)[2]), route);
            }
        else
            switch (names.get(name)[1]) {
                case "+":
                    return correct(names.get(name)[2], number - getNumber(names.get(name)[0]), route);
                case "-":
                    return correct(names.get(name)[2], getNumber(names.get(name)[0]) - number, route);
                case "*":
                    return correct(names.get(name)[2], number / getNumber(names.get(name)[0]), route);
                case "/":
                    return correct(names.get(name)[2], getNumber(names.get(name)[0]) / number, route);
            }

        throw new Error("not found");
    }
}

function getRootNumber() {
    const route = findToHumn("root", []);
    const number = getNumber(route.includes(names.get("root")[0]) ? names.get("root")[2] : names.get("root")[0]);
    const correctHumn = correct("root", 2 * number, route);
    names.set("humn", correctHumn);
    console.log(getNumber("root"));

    return correctHumn;
}

function getInput(): string {
    /*return "root: pppw + sjmn\n" +
        "dbpl: 5\n" +
        "cczh: sllz + lgvd\n" +
        "zczc: 2\n" +
        "ptdq: humn - dvpt\n" +
        "dvpt: 3\n" +
        "lfqf: 4\n" +
        "humn: 5\n" +
        "ljgn: 2\n" +
        "sjmn: drzm * dbpl\n" +
        "sllz: 4\n" +
        "pppw: cczh / lfqf\n" +
        "lgvd: ljgn * ptdq\n" +
        "drzm: hmdt - zczc\n" +
        "hmdt: 32";*/
    return data.data;
}
