import data from "./day20.json";

test("day20", () => {
    console.log(getGroveCoords());
});

let id = 0;

function getId() {
    return id++;
}

const numbers = getInput().split("\n").map(r => ({id: getId(), v: Number(r) * 811589153}));
const mixingOrder = numbers.map(f => f.id);

function getGroveCoords() {
    const nL = numbers.length;

    for (let n = 0; n < 10; n++)
        for (let i = 0; i < nL; i++) {
            const mixElementId = mixingOrder[i];
            const index = numbers.findIndex(f => f.id == mixElementId);

            const c = numbers.splice(index, 1)[0];
            numbers.splice((index + c.v) % (nL - 1), 0, c);
        }

    const zeroIndex = numbers.findIndex(f => f.v == 0);

    return numbers[(zeroIndex + 1000) % nL].v + numbers[(zeroIndex + 2000) % nL].v + numbers[(zeroIndex + 3000) % nL].v;
}

function getInput(): string {
    /*return "1\n" +
        "2\n" +
        "-3\n" +
        "3\n" +
        "-2\n" +
        "0\n" +
        "4";*/
    return data.data;
}
