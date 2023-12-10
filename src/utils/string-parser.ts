interface String {
    /**
     * splits string
     * @param separator default is "\n"
     * @param limit
     */
    lines(separator?: string | RegExp, limit?: number | undefined): string[];

    /**
     * replaces string
     * @param searchValue default is /\s/g
     * @param replaceValue default is ""
     */
    removeWS(
        searchValue?: { [Symbol.replace](string: string, replaceValue: string): string },
        replaceValue?: string
    ): string;

    /**
     * replaces string
     * @param searchValue default is /\s+/g
     * @param replaceValue default is " "
     */
    reduceWS(
        searchValue?: { [Symbol.replace](string: string, replaceValue: string): string },
        replaceValue?: string
    ): string;

    /**
     * matches string
     * @param matcher default is /-?\d+/g
     */
    numbers(matcher?: { [Symbol.match](string: string): RegExpMatchArray | null }): number[];

    /**
     * matches string
     * @param matcher default is /\d+/g
     */
    positivNumbers(matcher?: { [Symbol.match](string: string): RegExpMatchArray | null }): number[];

    /**
     * matches string
     * @param matcher default is /\d/g
     */
    digits(matcher?: { [Symbol.match](string: string): RegExpMatchArray | null }): number[];

    /**
     * matches string
     * @param matcher default is /[a-zA-Z]+/g
     */
    words(matcher?: { [Symbol.match](string: string): RegExpMatchArray | null }): string[];

    /**
     * splits string at with ""
     */
    chars(): string[];

    substrFrom(searchStringStart: string): string;
    substrBetweenFirstLast(searchStringStart: string, searchStringEnd?: string): string;
    substrBetweenFirst(searchStringStart: string, searchStringEnd: string, position?: number): string;

    log(ref?: { value: any }): string;
}

String.prototype.lines = function (separator: string | RegExp = /\n|\r\n/g, limit?: number | undefined) {
    return this.split(separator, limit);
};

String.prototype.removeWS = function (
    searchValue: { [Symbol.replace](string: string, replaceValue: string): string } = /\s/g,
    replaceValue: string = ""
) {
    return this.replace(searchValue, replaceValue);
};

String.prototype.reduceWS = function (
    searchValue: { [Symbol.replace](string: string, replaceValue: string): string } = /\s+/g,
    replaceValue: string = " "
) {
    return this.trim().replace(searchValue, replaceValue);
};

String.prototype.numbers = function (matcher: { [Symbol.match](string: string): RegExpMatchArray | null } = /-?\d+/g) {
    return this.match(matcher)!.map((n) => Number(n));
};

String.prototype.positivNumbers = function (
    matcher: { [Symbol.match](string: string): RegExpMatchArray | null } = /\d+/g
) {
    return this.numbers(matcher);
};

String.prototype.digits = function (matcher: { [Symbol.match](string: string): RegExpMatchArray | null } = /\d/g) {
    return this.numbers(matcher);
};

String.prototype.words = function (
    matcher: { [Symbol.match](string: string): RegExpMatchArray | null } = /[a-zA-Z]+/g
) {
    return this.match(matcher)!.map((s) => s);
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

String.prototype.log = function (ref?: { value: any }) {
    console.log(this);
    if (ref) ref.value = this;
    return "" + this;
};
