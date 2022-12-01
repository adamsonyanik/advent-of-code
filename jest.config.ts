export default {
    preset: "ts-jest",
    roots: ["./src"],
    transform: {"\\.ts$": ["ts-jest"]},
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleDirectories: ["node_modules", "src"],
};
