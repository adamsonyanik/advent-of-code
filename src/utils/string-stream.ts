export default class StringStream {
    private readonly lines: string[];

    public constructor(lines?: string) {
        if (lines) this.lines = this.split(lines);
        else this.lines = [];
    }

    public readLine() {
        return this.lines.shift();
    }

    public peekLine() {
        return this.lines[0];
    }

    public readLines() {
        return this.lines.splice(0);
    }

    public writeLine(lines: string) {
        this.lines.push(...this.split(lines));
    }

    private split(lines: string) {
        const splitted = lines.split(/\r?\n/);
        if (splitted[splitted.length - 1] === "") splitted.pop();
        return splitted;
    }

    public toString() {
        return this.lines.join("\n") + "\n";
    }
}
