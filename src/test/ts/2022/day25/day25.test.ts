import data from "./day25.json";

test("day25", () => {
    console.log(getButtons());
});

const numbers: number[] = getInput().split("\n").map(r => toDec(r));

function getButtons(){
    const sum = numbers.reduce((a, b) => a + b, 0);
    return toHecto(sum);
}

function toHecto(value: number){
    const highestExp = Math.ceil(log5(value));

    let val = value;
    const num: string[] = [];
    for (let exp = highestExp; exp >= 0; exp--) {
        let cv = 0;
        let threshold = 0;
        for (let i = 0; i < exp; i++){
            threshold += 2 * Math.pow(5, i);
        }

        const tMax = Math.pow(5, exp) + threshold;
        const tMin = Math.pow(5, exp) - threshold;
        if (val > tMax) {
            num[exp] = "2";
            cv = 2;
        } else if (val >= tMin) {
            num[exp] = "1";
            cv = 1;
        } else if (val < -tMax) {
            num[exp] = "=";
            cv = -2;
        }  else if (val <= -tMin) {
            num[exp] = "-";
            cv = -1;
        } else {
            num[exp] = "0";
        }
        val -= cv * Math.pow(5, exp);
    }

    let result = "";
    let firstDig = false;
    for (let i = highestExp; i >= 0; i--){
        if (!firstDig) {
            if (num[i] == "0") continue;
            else firstDig = true;
        }
        result += num[i] ? num[i] : "0";
    }
    return result;
}

function log5(value: number){
   return (value >= 0 ? Math.log(value) : -Math.log(-value)) / Math.log(5);
}

function toDec(value: string){
    const trans = {"2": 2, "1": 1, "0": 0, "-": -1, "=": -2};
    let fiveCounter = 1;
    let sum = 0;
    for (let i = value.length- 1; i >= 0; i --){
        sum += trans[value[i]] * fiveCounter;
        fiveCounter *= 5;
    }
    return sum;
}

function getInput(): string {
    /*return "1=-0-2\n" +
        "12111\n" +
        "2=0=\n" +
        "21\n" +
        "2=01\n" +
        "111\n" +
        "20012\n" +
        "112\n" +
        "1=-1=\n" +
        "1-12\n" +
        "12\n" +
        "1=\n" +
        "122";*/
    return data.data;
}
