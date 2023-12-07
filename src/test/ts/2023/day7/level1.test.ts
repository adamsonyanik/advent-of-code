import data from "./day-data.json";
import example from "./day-example.json";
import "../../../../utils/string-parser";
import { sumF } from "../../../../utils/statistics";

test("level 1 example", () => {
    console.log(run(example));
});

test("level 1", () => {
    console.log(run(data));
});

function run(_input: string) {
    const input: { cards: string[]; bid: number; rank: string }[] = _input.lines().map((l) => {
        const cards = l
            .split(" ")[0]
            .chars()
            .map((s) => {
                switch (s) {
                    case "A":
                        return "E";
                    case "K":
                        return "D";
                    case "Q":
                        return "C";
                    case "J":
                        return "B";
                    case "T":
                        return "A";
                    default:
                        return s;
                }
            });

        return {
            cards,
            bid: l.split(" ")[1].numbers()[0],
            rank: rank(cards)
        };
    });

    input.sort((a, b) => a.rank.localeCompare(b.rank));
    return sumF(input, (v, i) => (i + 1) * v.bid);
}

function rank(cards: string[]) {
    const hand: { amount: number; card: string }[] = [];
    for (const card of cards) {
        if (!hand.map((c) => c.card).includes(card)) hand.push({ amount: cards.filter((c) => c == card).length, card });
    }

    hand.sort((a, b) => b.amount - a.amount);

    let v = 0;
    if (hand[0].amount >= 5) v = 6;
    else if (hand[0].amount >= 4) v = 5;
    else if (hand[0].amount >= 3 && hand[1].amount >= 2) v = 4;
    else if (hand[0].amount >= 3) v = 3;
    else if (hand[0].amount >= 2 && hand[1].amount >= 2) v = 2;
    else if (hand[0].amount >= 2) v = 1;

    return v + cards.join("");
}
