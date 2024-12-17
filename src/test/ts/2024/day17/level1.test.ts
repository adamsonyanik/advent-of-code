import "../../../../utils/index";
import { downloadInputAsync, readExample, readInput } from "../../../../utils";
import { mod } from "../../../../utils/math";

test("download input", async () => await downloadInputAsync(__dirname));
test("level 1 example", async () => console.log(run(await readExample(__dirname), true)));
test("level 1", async () => console.log(run(await readInput(__dirname), false)));

function run(_input: string, _isExample: boolean) {
    const regs = [0, 0, 0];

    const input = _input.lines();
    regs[0] = input[0].numbers()[0];
    regs[1] = input[1].numbers()[0];
    regs[2] = input[2].numbers()[0];

    const program = input[4].numbers();

    const out: number[] = [];

    function comboOperand(operand: number) {
        if (operand <= 3) return operand;
        else return regs[operand - 4];
    }

    for (let ip = 0; ip < program.length; ) {
        const op = program[ip];

        if (op == 0) {
            regs[0] = Math.floor(regs[0] / Math.pow(2, comboOperand(program[ip + 1])));
        } else if (op == 1) {
            regs[1] = regs[1] ^ program[ip + 1];
        } else if (op == 2) {
            regs[1] = mod(comboOperand(program[ip + 1]), 8);
        } else if (op == 3) {
            if (regs[0] != 0) ip = program[ip + 1];
            else ip += 2;
        } else if (op == 4) {
            regs[1] = regs[1] ^ regs[2];
        } else if (op == 5) {
            out.push(mod(comboOperand(program[ip + 1]), 8));
            console.log(out.at(-1));
        } else if (op == 6) {
            //regs[1] = Math.floor(regs[0] / Math.pow(2, comboOperand(program[ip + 1])));
        } else if (op == 7) {
            regs[2] = Math.floor(regs[0] / Math.pow(2, comboOperand(program[ip + 1])));
        }

        if (op != 3) ip += 2;
    }

    return out.join(",");
}
