import { mkdir, readFile, rename, stat, writeFile } from "fs/promises";
import { basename, dirname } from "path";
import { expect } from "vitest";
import StringStream from "./string-stream";

function levelName() {
    return {
        level: basename(dirname(expect.getState().testPath!)),
        testFile: expect.getState().currentTestName!.split(" > ").at(-1)!
    };
}

export async function readInputFile() {
    const { level, testFile } = levelName();
    return await readFile(`src/${level}/input/${level}_${testFile}.in`, "utf-8");
}

export async function writeOutputFile(data: string) {
    const { level, testFile } = levelName();
    await mkdir(`src/${level}/output`, { recursive: true });
    await writeFile(`src/${level}/output/${level}_${testFile}.out`, data);
}

export async function expectedOutputFileExists() {
    const { level, testFile } = levelName();
    try {
        await stat(`src/${level}/known-output/${level}_${testFile}.out`);
        return true;
    } catch (e) {
        return false;
    }
}

export async function readExpectedOutputFile() {
    const { level, testFile } = levelName();
    return new StringStream(await readFile(`src/${level}/known-output/${level}_${testFile}.out`, "utf-8")).toString();
}

export async function moveExampleOutFile() {
    const { level } = levelName();
    if (!(await expectedOutputFileExists()))
        await rename(`src/${level}/input/${level}_example.out`, `src/${level}/known-output/${level}_example.out`);
}
