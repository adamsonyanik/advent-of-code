import data from "./day2.json";

test("day2", () => {
    console.log(calcScore());
});

function calcScore(): number {
    const input: { a: string, b: string }[] = getInput().split("\n").map(s => {
        const r = s.split(" ");
        return {a: r[0], b: r[1]};
    });
    const shouldPlay = input.map(e => ({a: e.a, b: getShouldPlay(e)}));
    return shouldPlay.reduce((p, c) => p + getScore(c.b, getResult(c)), 0);
}

function getShouldPlay(round: { a: string, b: string }): string {
    switch (round.a + round.b) {
        case "AX":
            return "Z";
        case "AY":
            return "X";
        case "AZ":
            return "Y";
        case "BX":
            return "X";
        case "BY":
            return "Y";
        case "BZ":
            return "Z";
        case "CX":
            return "Y";
        case "CY":
            return "Z";
        case "CZ":
            return "X";
        default:
            throw new Error("unexpected round: " + round.a + round.b);
    }
}

function getResult(round: { a: string, b: string }): number {
    switch (round.a + round.b) {
        case "AX":
            return 0;
        case "AY":
            return 1;
        case "AZ":
            return -1;
        case "BX":
            return -1;
        case "BY":
            return 0;
        case "BZ":
            return 1;
        case "CX":
            return 1;
        case "CY":
            return -1;
        case "CZ":
            return 0;
        default:
            throw new Error("unexpected round: " + round.a + round.b);
    }
}

function getScore(selected: string, won: number): number {
    let sScore = 0;
    switch (selected) {
        case "X":
            sScore = 1;
            break;
        case "Y":
            sScore = 2;
            break;
        case "Z":
            sScore = 3;
            break;
        default:
            throw new Error("unexpected selected: " + selected);
    }

    let wScore = 0;
    switch (won) {
        case -1:
            wScore = 0;
            break;
        case 0:
            wScore = 3;
            break;
        case 1:
            wScore = 6;
            break;
        default:
            throw new Error("unexpected selected: " + selected);
    }

    return sScore + wScore;
}

function getInput(): string {
    return data.data;
}
