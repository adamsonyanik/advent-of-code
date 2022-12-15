import data from "./day15.json";

test("day15", () => {
    const limit = {start: 0, end: 4000000};
    console.log(getTuningFrequency(getPlaceForBeacon(limit), limit));
});

type sensorRange = { start: number, end: number };

function getTuningFrequency(pos: { x: number, y: number }, limit: sensorRange): number {
    return pos.x * limit.end + pos.y;
}

function getPlaceForBeacon(limit: sensorRange): { x: number, y: number } {
    const row = getRowForBeacon(limit);

    for (let i = 0; i <= limit.end; i++) {
        if (!overlapPosArray(i, row.range))
            return {x: i, y: row.row};
    }

    return null;
}

function getRowForBeacon(limit: sensorRange): { row: number, range: sensorRange[] } {
    const sensorBeacon = getInput().split("\n").map(p => ({
        sensor: {
            x: Number(p.split(":")[0].split(",")[0].split("=")[1]),
            y: Number(p.split(":")[0].split(",")[1].split("=")[1])
        },
        beacon: {
            x: Number(p.split(":")[1].split(",")[0].split("=")[1]),
            y: Number(p.split(":")[1].split(",")[1].split("=")[1])
        },
    }));

    const sensorBeaconDis = sensorBeacon.map(sb => ({...sb, distance: distance(sb.sensor, sb.beacon)}));

    for (let i = 0; i <= limit.end; i++) {
        const ranges = getNotBeaconPlacesIn(i, sensorBeaconDis, limit);
        if (ranges != null) {
            console.log("found in y: " + i);
            return {row: i, range: ranges};
        }
        if (i % 10000 == 0) {
            console.log(i);
        }
    }

    return null;
}

function getNotBeaconPlacesIn(row: number, sensorBeaconDis: { distance: number, sensor: { x: number, y: number }, beacon: { x: number, y: number } }[], limit: sensorRange): sensorRange[] {
    const ranges = sensorBeaconDis.map(sb => ({
        ...sb,
        range: getRangeLimit(sb, row, limit)
    })).map(sb => sb.range).filter(range => range != null);
    const mergedRangesLength = getRangeLength(ranges);

    if (mergedRangesLength == limit.end + 1)
        return null;

    return mergeRanges(ranges);
}

function getInput(): string {
    return data.data;
}

function distance(pos0: { x: number, y: number }, pos1: { x: number, y: number }): number {
    return Math.abs(pos0.x - pos1.x) + Math.abs(pos0.y - pos1.y);
}

function getRange(sensor: { sensor: { x: number, y: number }, distance: number }, row: number): sensorRange {
    const numberOfPlacesDiv2 = sensor.distance - Math.abs(sensor.sensor.y - row);

    if (numberOfPlacesDiv2 < 0) {
        return null;
    }

    return {start: sensor.sensor.x - numberOfPlacesDiv2, end: sensor.sensor.x + numberOfPlacesDiv2};
}

function getRangeLimit(sensor: { sensor: { x: number, y: number }, distance: number }, row: number, limit: sensorRange): sensorRange {
    const numberOfPlacesDiv2 = sensor.distance - Math.abs(sensor.sensor.y - row);

    if (numberOfPlacesDiv2 < 0) {
        return null;
    }

    return {
        start: Math.max(limit.start, sensor.sensor.x - numberOfPlacesDiv2),
        end: Math.min(limit.end, sensor.sensor.x + numberOfPlacesDiv2)
    };
}

function mergeInRanges(rangeIn: sensorRange, rest: sensorRange[]): sensorRange[] {
    for (let i = 0; i < rest.length; i++) {
        if (overlap(rangeIn, rest[i])) {
            const merged = mergeRange(rangeIn, rest[i]);

            if (rest.length == 1) {
                return [merged];
            } else {
                return mergeInRanges(merged, rest.filter(r => r != rest[i]));
            }
        }
    }

    return [rangeIn, ...rest];
}

function mergeRange(range0: sensorRange, range1: sensorRange) {
    return {start: Math.min(range0.start, range1.start), end: Math.max(range0.end, range1.end)};
}

function overlapPosArray(pos: number, rest: sensorRange[]): boolean {
    return overlapArray({start: pos, end: pos}, rest);
}

function overlapArray(first: sensorRange, rest: sensorRange[]): boolean {
    for (let i = 0; i < rest.length; i++) {
        if (overlap(first, rest[i])) {
            return true;
        }
    }

    return false;
}

function overlap(first: sensorRange, second: sensorRange): boolean {
    if (first.start <= second.start && first.end >= second.start) {
        return true;
    }

    if (first.start <= second.end && first.end >= second.end) {
        return true;
    }

    if (second.start <= first.start && second.end >= first.start) {
        return true;
    }

    if (second.start <= first.end && second.end >= first.end) {
        return true;
    }

    return false;
}

function getRangeLength(ranges: sensorRange[]) {
    return getRangeLengths(mergeRanges(ranges));
}

function mergeRanges(ranges: sensorRange[]) {
    let mergedRanges: sensorRange[] = [];
    for (const range of ranges) {
        mergedRanges = mergeInRanges(range, mergedRanges);
    }
    return mergedRanges;
}

function getRangeLengths(mergedRanges: sensorRange[]) {
    let sum = 0;
    for (const range of mergedRanges) {
        sum += range.end - range.start + 1;
    }

    return sum;
}
