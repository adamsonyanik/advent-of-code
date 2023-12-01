import data from "./day6.json";

test("day6", () => {
    console.log(getEvolutionSize());
});

const fish: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function getEvolutionSize() {
    const input = getInput().split(",");

    for (const i of input) {
        fish[Number(i)]++;
    }

    for (let i = 0; i < 256; i++) {
        simulate();
    }

    return fish.reduce((p, c) => p + c);
}

function simulate() {
    const newFish = fish[0];

    for (let i = 0; i < fish.length - 1; i++) {
        fish[i] = fish[i + 1];
    }

    fish[8] = newFish;
    fish[6] += newFish;
}

function getInput(): string {
    //return "3,4,3,1,2";
    return data.data;
}
