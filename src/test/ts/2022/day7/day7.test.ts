import data from "./day7.json";

test("day7", () => {
    console.log(getTotalSizeOfMax100000());
});

type Command = { command: string, args: string, out: string[] }

type Dir = { name: string, files: File[], dirs: Dir[], parent: Dir };
type File = { name: string, size: number };

const root: Dir = {name: "/", files: [], dirs: [], parent: null};
let cd = root;

function getTotalSizeOfMax100000() {
    const input: Command[] = getInput().split("$ ").map(c => {
        const out = c.split("\n");
        out.shift();
        out.pop();
        return {
            command: c.split("\n")[0].split(" ")[0],
            args: c.split("\n")[0].split(" ")[1],
            out: out
        };
    });
    input.shift();

    for (const c of input) {
        if (c.command == "cd") {
            if (c.args == "/") {
                cd = root;
            } else if (c.args == "..") {
                cd = cd.parent;
            } else {
                if (cd.dirs.filter(d => d.name == c.args).length == 0)
                    addDir(cd, c.args);

                cd = cd.dirs.filter(d => d.name == c.args)[0];
            }
        } else if (c.command == "ls") {
            for (const line of c.out) {
                const out = line.split(" ");
                if (out[0] == "dir") {
                    addDir(cd, out[1]);
                } else {
                    addFile(cd, out[1], Number(out[0]));
                }
            }
        }
    }

    const mustDeleteSize = calcSize(root) - (70000000 - 30000000);

    const dirs = getAllDir(root, []).filter(d => calcSize(d) >= mustDeleteSize).sort((a, b) => calcSize(a) - calcSize(b));

    return calcSize(dirs[0]);
}

function getAllDir(dir: Dir, array: Dir[]): Dir[] {
    array.push(dir);
    for (const d of dir.dirs) {
        getAllDir(d, array);
    }

    return array;
}

function calcSize(dir: Dir): number {
    let sum = 0;
    for (const d of dir.dirs) {
        sum += calcSize(d);
    }

    for (const f of dir.files) {
        sum += f.size;
    }

    return sum;
}


function addFile(parent: Dir, name: string, size: number) {
    if (parent.files.filter(f => f.name == name).length > 0)
        return;

    parent.files.push({name: name, size: size});
}

function addDir(parent: Dir, name: string) {
    if (parent.dirs.filter(d => d.name == name).length > 0)
        return;

    parent.dirs.push({name: name, files: [], dirs: [], parent: parent});
}

function getInput(): string {
    return data.data;
}
