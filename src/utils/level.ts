import StringStream from "./string-stream";

export default abstract class Level {
    protected readonly input;
    protected readonly output;

    public constructor(input: StringStream, output: StringStream) {
        this.input = input;
        this.output = output;
    }

    public abstract run(): void;
}
