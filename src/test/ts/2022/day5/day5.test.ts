import data from "./day5.json";
import { Stack } from "./Stack";

test("day5", () => {
    console.log(getTopCrates());
});

type Instruction = { quantity: number; from: number; to: number };

const stacks: Stack<string>[] = [];

function getTopCrates() {
    const input = getInput().split("\n\n");
    const place = input[0].split("\n").map((s) => {
        s += " ";
        return s
            .replace(new RegExp("\\[", "g"), "")
            .replace(new RegExp("] ", "g"), "")
            .replace(new RegExp(" {4}", "g"), "_");
    });

    for (let i = 0; i < place[0].length; i++) {
        stacks.push(new Stack());
    }

    for (let i = place.length - 2; i >= 0; i--) {
        for (let j = 0; j < place[i].length; j++) {
            if (place[i].charAt(j) !== "_") stacks[j].push(place[i].charAt(j));
        }
    }

    const instructions: Instruction[] = input[1].split("\n").map((i) => {
        const numbers = i.split("move ").join("").split("from ").join("").split("to ").join("").split(" ");
        return { quantity: Number(numbers[0]), from: Number(numbers[1]) - 1, to: Number(numbers[2]) - 1 };
    });

    for (const i of instructions) {
        exeInstruction(i);
    }

    return stacks.map((s) => s.peek()).join("");
}

function exeInstruction(instruction: Instruction) {
    const creates: string[] = [];
    for (let i = 0; i < instruction.quantity; i++) {
        creates.push(stacks[instruction.from].pop());
    }

    for (let i = instruction.quantity - 1; i >= 0; i--) {
        stacks[instruction.to].push(creates[i]);
    }
}

function getInput(): string {
    return data.data;
}
