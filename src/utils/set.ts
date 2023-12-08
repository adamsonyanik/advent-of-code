export function intersect<T>(a: T[], b: T[]) {
    if (b.length > a.length) {
        const t = b;
        b = a;
        a = t;
    }

    return a
        .filter(function (e) {
            return b.indexOf(e) > -1;
        })
        .filter(function (e, i, c) {
            return c.indexOf(e) === i;
        });
}

export function union<T>(a: T[], b: T[]) {
    if (a.length > b.length) {
        const t = b;
        b = a;
        a = t;
    }

    const c = [...a];
    for (const e of b) if (c.indexOf(e) == -1) c.push(e);
    return c;
}

export function aWithoutB<T>(a: T[], b: T[]) {
    const c = [];
    for (const e of a) if (b.indexOf(e) == -1) c.push(e);
    return c;
}
