import { createCanvas } from "canvas";
import fs from "fs";
import { dirname } from "path";

export class ArrayImage<T> {
    constructor(
        private array: T[],
        private elementToColor: (element: T) => string,
        private gridWidth?: number,
        private elementPixelSize = 1
    ) {}

    public draw(path: string) {
        this.gridWidth = this.gridWidth ? this.gridWidth : this.array.length;

        const width = this.gridWidth * this.elementPixelSize;
        const height = Math.ceil(this.array.length / this.gridWidth) * this.elementPixelSize;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d");

        let x = 0;
        let y = 0;
        for (const element of this.array) {
            context.fillStyle = this.elementToColor(element);
            context.fillRect(
                x * this.elementPixelSize,
                y * this.elementPixelSize,
                this.elementPixelSize,
                this.elementPixelSize
            );

            x++;
            if (x >= this.gridWidth) {
                x = 0;
                y++;
            }
        }

        fs.mkdirSync(dirname(path), { recursive: true });
        fs.writeFileSync(path, canvas.toBuffer("image/png"));
    }
}

export class Array2DImage<T> {
    constructor(
        private array: T[][],
        private elementToColor: (element: T) => string,
        private elementPixelSize = 1
    ) {}

    public draw(path: string) {
        const width = Math.max(...this.array.map((row) => row.length)) * this.elementPixelSize;
        const height = this.array.length * this.elementPixelSize;

        const canvas = createCanvas(width, height);
        const context = canvas.getContext("2d");

        for (let y = 0; y < this.array.length; y++)
            for (let x = 0; x < this.array[y].length; x++) {
                context.fillStyle = this.elementToColor(this.array[y][x]);
                context.fillRect(
                    x * this.elementPixelSize,
                    y * this.elementPixelSize,
                    this.elementPixelSize,
                    this.elementPixelSize
                );
            }

        fs.mkdirSync(dirname(path), { recursive: true });
        fs.writeFileSync(path, canvas.toBuffer("image/png"));
    }
}

export const colorPalette = [
    "#000",
    "#fff",
    "#f00",
    "#0f0",
    "#00f",
    "#ff0",
    "#0ff",
    "#f0f",
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395",
    "#3366cc",
    "#994499",
    "#22aa99",
    "#aaaa11",
    "#6633cc",
    "#e67300",
    "#8b0707",
    "#651067",
    "#329262",
    "#5574a6",
    "#3b3eac",
    "#b77322",
    "#16d620",
    "#b91383",
    "#f4359e",
    "#9c5935",
    "#a9c413",
    "#2a778d",
    "#668d1c",
    "#bea413",
    "#0c5922",
    "#743411"
];

/**
 *
 * @param r range [0,1]
 * @param g range [0,1]
 * @param b range [0,1]
 */
export const colorRGB = (r: number, g: number, b: number) => {
    return "#" + toHex(r * 255) + toHex(g * 255) + toHex(b * 255);
};

/**
 *
 * @param h range [0,1]
 * @param s range [0,1]
 * @param v range [0,1]
 */
export const colorHSV = (h: number, s: number, v: number) => {
    const rgb = hsvToRGB(h, s, v);
    return "#" + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
};

/**
 *
 * @param h range [0,1]
 * @param s range [0,1]
 * @param v range [0,1]
 */
const hsvToRGB = (h: number, s: number, v: number) => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0;
    let g = 0;
    let b = 0;
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
};

export const toHex = (n: number) => {
    return Math.min(255, Math.max(0, Math.round(n)))
        .toString(16)
        .padStart(2, "0");
};
