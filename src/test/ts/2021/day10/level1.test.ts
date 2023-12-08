import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/index";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input = _input.lines();

    const table = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

    const error = [];

    loopLine: for (const line of input) {
        const stack = [];
        for (const char of line) {
            if ([")", "]", "}", ">"].includes(char)) {
                if (stack[stack.length - 1] !== char) {
                    error.push(char);
                    continue loopLine;
                }
                stack.pop();
            }

            if (char == "(") stack.push(")");
            if (char == "[") stack.push("]");
            if (char == "{") stack.push("}");
            if (char == "<") stack.push(">");
        }
    }

    // @ts-ignore
    return error.map((e) => table[e]).sum();
}
