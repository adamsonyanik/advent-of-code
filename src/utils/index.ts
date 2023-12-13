import "./array.ts";
import "./string-parser.ts";
import fs from "fs";

export const ref = () => ({ value: undefined });

/**
 * creates an array with values from inclusive a to inclusive b
 * @param a
 * @param b
 */
export const range = (a: number, b: number) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);

    const array = new Array(max - min + 1);

    let i = 0;
    for (let x = min; x < max; x++) {
        array[i++] = x;
    }

    return array;
};

export const readExample = async (dir: string) => {
    return readFile(dir, "example.txt").replace(/\r/g, "").trim();
};

export const readInput = async (dir: string) => {
    const fileName = "input.txt";
    let input = readFile(dir, fileName);
    if (input.length == 0) {
        const download = await downloadInput(dir);
        if (download !== undefined) {
            input = download;
            fs.writeFile(`${dir}/${fileName}`, input, () => {});
        } else return "";
    }
    return input.replace(/\r/g, "").trim();
};

const readFile = (dir: string, fileName: string) => {
    return fs.readFileSync(`${dir}/${fileName}`, "utf8");
};

const downloadInput = async (dir: string) => {
    const path = dir.split(/[\\/]/g);
    const day = path[path.length - 1].substring(3);
    const year = path[path.length - 2];

    const s = process.env.SESSION_COOKIE;

    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: {
            Cookie: `session=${process.env.SESSION_COOKIE}`
        },
        credentials: "include",
        method: "GET"
    });
    const input = await response.text();
    if (response.ok) {
        console.log("downloaded: \n\n" + input);
        return input;
    } else console.error("download failed: " + input);

    return undefined;
};

export const downloadInputAsync = async (dir: string, time: number = 20000) => {
    await new Promise<void>((resolve) =>
        setTimeout(async () => {
            await readInput(dir);
            resolve();
        }, time)
    );
};
