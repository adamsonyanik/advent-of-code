import { Array2DImage, ArrayImage, colorHSV, colorPalette, colorRGB, toHex } from "../array-image";

describe("array-image", () => {
    test("1d array to image", () => {
        new ArrayImage([1, 2, 3, 4], (i) => colorPalette[i]).draw("./src/utils/__tests__/output/image.png");
    });

    test("2d array to image", () => {
        new Array2DImage([[1, 2, 3], [4]], (i) => colorPalette[i]).draw("./src/utils/__tests__/output/2d-image.png");
    });

    describe("color", () => {
        test("number to hex", () => {
            expect(toHex(10)).toBe("0a");
            expect(toHex(0)).toBe("00");
            expect(toHex(5)).toBe("05");
            expect(toHex(17)).toBe("11");
            expect(toHex(255)).toBe("ff");
        });

        test("real number to hex", () => {
            expect(toHex(0.1)).toBe("00");
            expect(toHex(10.6)).toBe("0b");
            expect(toHex(5.1)).toBe("05");
            expect(toHex(17.9)).toBe("12");
        });

        test("number out of bounds < 0", () => {
            expect(toHex(1)).toBe("01");
            expect(toHex(0)).toBe("00");
            expect(toHex(-1)).toBe("00");
            expect(toHex(-100)).toBe("00");
        });

        test("number out of bounds > 255", () => {
            expect(toHex(254)).toBe("fe");
            expect(toHex(255)).toBe("ff");
            expect(toHex(256)).toBe("ff");
            expect(toHex(1000)).toBe("ff");
        });

        test("rgb", () => {
            expect(colorRGB(1 / 255, 0 / 255, -1 / 255)).toBe("#010000");
            expect(colorRGB(-100 / 255, 254 / 255, 255 / 255)).toBe("#00feff");
            expect(colorRGB(256 / 255, 1000 / 255, 95 / 255)).toBe("#ffff5f");
        });

        test("hsv", () => {
            expect(colorHSV(269.5 / 360, 0.498, 0.867)).toBe("#a56fdd");
            expect(colorHSV(147.1 / 360, 0.754, 0.749)).toBe("#2fbf70");
            expect(colorHSV(33.5 / 360, 0.15, 0.992)).toBe("#fdecd7");
        });
    });
});
