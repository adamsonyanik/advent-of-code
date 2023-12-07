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
    const input: { bid: number; rank: string }[] = _input.lines().map((l) => ({
        bid: l.split(" ")[1].numbers()[0],
        rank: rank(
            l
                .replace(/A/g, "E")
                .replace(/K/g, "D")
                .replace(/Q/g, "C")
                .replace(/J/g, "*")
                .replace(/T/g, "A")
                .split(" ")[0]
                .chars()
        )
    }));

    input.sortAlphaAsc((a) => a.rank);
    return input.map((v, i) => (i + 1) * v.bid).sum();
}

function rank(cards: string[]) {
    const hand = cards.filter((c) => c != "*").bucket();
    hand.push({ hash: "*", items: [], size: 0 });

    hand.sortNumericDesc((e) => e.size);
    hand[0].size += cards.filter((c) => c == "*").length;

    let v = 0;
    if (hand[0].size >= 5) v = 6;
    else if (hand[0].size >= 4) v = 5;
    else if (hand[0].size >= 3 && hand[1].size >= 2) v = 4;
    else if (hand[0].size >= 3) v = 3;
    else if (hand[0].size >= 2 && hand[1].size >= 2) v = 2;
    else if (hand[0].size >= 2) v = 1;

    return v + cards.join("");
}
