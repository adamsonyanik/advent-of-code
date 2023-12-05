export type Range = { start: number; end: number };

export class Ranges {
    public static splitRange(
        a: Range,
        b: Range
    ): {
        onlyA: Range[];
        "&": Range[];
        onlyB: Range[];
        "|": Range[];
        intersection: "outside" | "inside" | "half";
    } {
        let result;
        let swappedAB = false;
        // sort so a.start < b.start or if a.start == b.start then b inside a
        if (b.start < a.start || (a.start == b.start && a.end < b.end)) {
            const c = a;
            a = b;
            b = c;
            swappedAB = true;
        }

        // outside
        if (a.end < b.start)
            result = { onlyA: [a], "&": [], onlyB: [b], "|": [a, b], intersection: "outside" as const };
        // B inside A
        else if (a.start <= b.start && a.end >= b.end) {
            const onlyA = [];
            if (a.start < b.start) onlyA.push({ start: a.start, end: b.start - 1 });
            if (a.end > b.end) onlyA.push({ start: b.end + 1, end: a.end });

            result = { onlyA, "&": [b], onlyB: [], "|": [a], intersection: "inside" as const };
        }

        // half
        else {
            result = {
                onlyA: [{ start: a.start, end: b.start - 1 }],
                "&": [{ start: b.start, end: a.end }],
                onlyB: [{ start: a.end + 1, end: b.end }],
                "|": [{ start: a.start, end: b.end }],
                intersection: "half" as const
            };
        }

        if (swappedAB) {
            const c = result.onlyA;
            result.onlyA = result.onlyB;
            result.onlyB = c;
        }

        return result;
    }
}
