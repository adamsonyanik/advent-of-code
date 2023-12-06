declare interface String {
    lines(): string[];
    removeWS(): string;
    reduceWS(): string;
    numbers(): number[];
    digits(): number[];
    chars(): string[];
    substrFrom(searchStringStart: string): string;
    substrBetweenFirstLast(searchStringStart: string, searchStringEnd?: string): string;
    substrBetweenFirst(searchStringStart: string, searchStringEnd: string, position?: number): string;
}

String.prototype.lines = function () {
    return this.split("\n");
};

String.prototype.removeWS = function () {
    return this.replace(/\s/g, "");
};

String.prototype.reduceWS = function () {
    return this.trim().replace(/\s+/g, " ");
};

String.prototype.numbers = function () {
    return this.match(/\d+/g)!.map((n) => Number(n));
};

String.prototype.digits = function () {
    return this.match(/\d/g)!.map((n) => Number(n));
};

String.prototype.chars = function () {
    return this.split("");
};

String.prototype.substrFrom = function (searchStringStart: string) {
    return this.substring(this.indexOf(searchStringStart) + searchStringStart.length);
};

String.prototype.substrBetweenFirstLast = function (searchStringStart: string, searchStringEnd?: string) {
    return this.substring(
        this.indexOf(searchStringStart) + searchStringStart.length,
        searchStringEnd ? this.lastIndexOf(searchStringEnd) : undefined
    );
};

String.prototype.substrBetweenFirst = function (searchStringStart: string, searchStringEnd: string, position?: number) {
    const startIndex = this.indexOf(searchStringStart, position) + searchStringStart.length;
    return this.substring(startIndex, this.indexOf(searchStringEnd, startIndex));
};
