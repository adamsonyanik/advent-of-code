import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 2 example", () => {
    console.log(run(example));
});

test("level 2", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input.lines();

    const table = { ")": 1, "]": 2, "}": 3, ">": 4 };

    let value: number[] = [];

    loopLine: for (const line of input) {
        const stack = [];
        for (const char of line) {
            if ([")", "]", "}", ">"].includes(char)) {
                if (stack[stack.length - 1] !== char) continue loopLine;
                stack.pop();
            }

            if (char == "(") stack.push(")");
            if (char == "[") stack.push("]");
            if (char == "{") stack.push("}");
            if (char == "<") stack.push(">");
        }

        let v = 0;
        for (const s of stack.reverse()) {
            v *= 5;
            // @ts-ignore
            v += table[s];
        }
        value.push(v);
    }
    value = value.sortNumericAsc();
    return value[Math.floor(value.length / 2)];
}
