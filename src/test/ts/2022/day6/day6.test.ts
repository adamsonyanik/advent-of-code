import data from "./day6.json";

test("day6", () => {
    console.log(getIndexOfFirstPacket());
});

function getIndexOfFirstPacket() {
    const input = getInput();

    let i = 0;
    for (i = 0; i < input.length - 5; i++) {
        let shouldBreak = true;
        for (let f = 0; f < 14; f++) {
            for (let s = f + 1; s < 14; s++) {
                if (input.charAt(i + f) === input.charAt(i + s)) shouldBreak = false;
            }
        }
        if (shouldBreak) break;
    }

    return i + 14;
}

function getInput(): string {
    return data.data;
}
