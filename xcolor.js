module.exports = class xcolor {
    /**
     * Initializes a new instance of the Color class with the specified color code.
     *
     * @param {string} colorCode - The color code to initialize the Color instance with.
     *                             The color code can be in any of the following formats:
     *                             - RGB: "rgb(R, G, B)"
     *                             - RGBA: "rgba(R, G, B, A)"
     *                             - Hex: "#RGB" or "#RRGGBB"
     *                             - Hexa: "#RRGGBBAA" or "#RRGGBB"
     *                             - HSL: "hsl(H, S%, L%)"
     *                             - HSLA: "hsla(H, S%, L%, A)"
     *                             - HSB: "hsb(H, S%, B%)"
     *                             - HSBA: "hsba(H, S%, B%, A)"
     *                             Where R, G, B, A, H, S, L, and B represent numeric values.
     * @return {void}
     */
    constructor(colorCode) {
        const rgbRegex = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/;
        const rgbaRegex = /^rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(0?\.\d+|1(\.0)?)\)$/;
        const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
        const hexaRegex = /^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{4})$/;
        const hslRegex = /^hsl\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%\)$/;
        const hslaRegex = /^hsla\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%,\s?(0?\.\d+|1(\.0)?)\)$/;
        const hsbRegex = /^hsb\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%\)$/;
        const hsbaRegex = /^hsba\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%,\s?(0?\.\d+|1(\.0)?)\)$/;

        let regexp = new RegExp(rgbRegex.source + '|' + rgbaRegex.source + '|' + hexRegex.source + '|' + hexaRegex.source + '|' + hslRegex.source + '|' + hslaRegex.source + '|' + hsbRegex.source + '|' + hsbaRegex.source);
        if (!colorCode.match(regexp)) {
            console.error('The string is an invalid color format. Valid formats are: rgb, rgba, hex, hexa, hsl, hsla, hsb, hsba');
            throw new Error('The string is an invalid color format. Valid formats are: rgb, rgba, hex, hexa, hsl, hsla, hsb, hsba');
        }

        let matches;
        if (matches = colorCode.match(rgbRegex)) {
            this.r = parseInt(matches[1]);
            this.g = parseInt(matches[2]);
            this.b = parseInt(matches[3]);
            this.a = 1;
        } else if (matches = colorCode.match(rgbaRegex)) {
            this.r = parseInt(matches[1]);
            this.g = parseInt(matches[2]);
            this.b = parseInt(matches[3]);
            this.a = parseFloat(matches[4]);
        } else if (matches = colorCode.match(hexRegex)) {
            let hex = matches[1];
            if (hex.length == 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            this.r = parseInt(hex.substring(0, 2), 16);
            this.g = parseInt(hex.substring(2, 4), 16);
            this.b = parseInt(hex.substring(4, 6), 16);
            this.a = 1;
        } else if (matches = colorCode.match(hexaRegex)) {
            let hexa = matches[1];
            if (hexa.length == 4) {
                hexa = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2] + hexa[3] + hexa[3];
            }
            parseInt(hexa.substring(0, 2), 16);
            this.g = parseInt(hexa.substring(2, 4), 16);
            this.b = parseInt(hexa.substring(4, 6), 16);
            this.a = parseInt(hexa.substring(6, 8), 16) / 255;
        } else if (matches = colorCode.match(hslRegex)) {
            xcolor.hsl2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
            this.a = 1;
        } else if (matches = colorCode.match(hslaRegex)) {
            xcolor.hsl2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
            this.a = parseFloat(matches[4]);
        } else if (matches = colorCode.match(hsbRegex)) {
            xcolor.hsb2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
            this.a = 1;
        } else if (matches = colorCode.match(hsbaRegex)) {
            xcolor.hsb2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
            this.a = parseFloat(matches[4]);
        }
    }

    getRgba() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
    getRgb() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
    getHexa() {
        return xcolor.rgba2hexa(this.getRgba());
    }
    getHex() {
        return xcolor.rgba2hex(this.getRgba());
    }
    getHsba() {
        let [h, s, b, a] = xcolor.rgb2hsb([this.r, this.g, this.b]);
        return `hsba(${h},${s},${b},${a})`;
    }
    getHsla() {
        let [h, s, l] = xcolor.rgb2hsl([this.r, this.g, this.b]);
        return `hsla(${h},${s},${l},${this.a})`;
    }
    static parse(colorCode) {
        let matches;
        if ((matches = colorCode.match(rgbRegex))) {
            return new xcolor([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
        } else if ((matches = colorCode.match(rgbaRegex))) {
            return new xcolor([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]), parseFloat(matches[4])]);
        } else if ((matches = colorCode.match(hexaRegex))) {
            let hexa = matches[1];
            if (hexa.length === 3) {
                hexa = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2];
            }
            return xcolor([parseInt(hexa.substring(0, 2), 16), parseInt(hexa.substring(2, 4), 16), parseInt(hexa.substring(4, 6), 16)]);
        } else if ((matches = colorCode.match(hslRegex))) {
            return xcolor.hsl2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
        } else if ((matches = colorCode.match(hslaRegex))) {
            return xcolor.hsl2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]).setAlpha(parseFloat(matches[4]));
        } else if ((matches = colorCode.match(hsbRegex))) {
            return xcolor.hsb2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]);
        } else if ((matches = colorCode.match(hsbaRegex))) {
            return xcolor.hsb2rgb([parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]).setAlpha(parseFloat(matches[4]));
        }
    }

    static hex2rgba(color) {
        let [r, g, b, a] = color.match(/\w\w/g).map(x => +`0x${x}`);
        return `rgba(${r},${g},${b},${a})`;
    }

    static hex2rgb(color) {
        let [r, g, b] = color.match(/\w\w/g).map(x => +`0x${x}`);
        return `rgb(${r},${g},${b})`;
    }

    static rgb2hex(color) {
        let [r, g, b] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `#${r}${g}${b}`;
    }

    static rgba2hex(color) {
        let [r, g, b, a] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `#${r}${g}${b}`;
    }

    static rgba2hexa(color) {
        let [r, g, b, a] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `#${r}${g}${b}${a}`;
    }

    static hexa2rgba(color) {
        let [r, g, b, a] = color.match(/\w\w/g).map(x => +`0x${x}`);
        return `rgba(${r},${g},${b},${a})`;
    }

    static hexa2rgb(color) {
        let [r, g, b, a] = color.match(/\w\w/g).map(x => +`0x${x}`);
        return `rgb(${r},${g},${b})`;
    }

    static rgb2rgba(color) {
        let [r, g, b] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `rgba(${r},${g},${b}, 1)`;
    }

    static rgba2rgb(color) {
        let [r, g, b, a] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `rgb(${r},${g},${b})`;
    }

    static hsl2rgb([h, s, l]) {
        let a = s * Math.min(l, 100 - l) / 100;
        let f = n => {
            let k = (n + h / 30) % 12;
            let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
        }
        return `rgb(${f(0)},${f(8)},${f(4)})`;
    }

    static hsla2rgba([h, s, l, a]) {
        let f = n => {
            let k = (n + h / 30) % 12;
            let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
        }
        return `rgba(${f(0)},${f(8)},${f(4)},${a})`;
    }

    static rgb2hsl([r, g, b]) {
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            s = max == 0 ? 0 : d / max,
            h = s == 0 ? 0 : d == min ? 0
                : max == r ? (g - b) / d + (g < b ? 6 : 0)
                : max == g ? (b - r) / d + 2
                : (r - g) / d + 4;
        return [Math.round(h * 60), Math.round(s * 100), Math.round(max / 2)];
    }

    static rgba2hsla([r, g, b, a]) {
        let [h, s, l] = this.rgb2hsl([r, g, b]);
        return [h, s, l, a];
    }

    static hsb2rgb([h, s, b]) {
        let f = n => {
            let k = (n + h / 60) % 6;
            let color = b * (1 - s * Math.max(Math.min(k, 4 - k, 1), 0));
            return Math.round(255 * color);
        }
        return `rgb(${f(5)},${f(3)},${f(1)})`;
    }

    static hsba2rgba([h, s, b, a]) {
        let f = n => {
            let k = (n + h / 60) % 6;
            let color = b * (1 - s * Math.max(Math.min(k, 4 - k, 1), 0));
            return Math.round(255 * color);
        }
        return `rgba(${f(5)},${f(3)},${f(1)},${a})`;
    }

    static rgb2hsb([r, g, b]) {
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            s = max == 0 ? 0 : d / max,
            h = s == 0 ? 0 : d == min ? 0
                : max == r ? (g - b) / d + (g < b ? 6 : 0)
                : max == g ? (b - r) / d + 2
                : (r - g) / d + 4;
        return [Math.round(h * 60), Math.round(s * 100), Math.round(max / 2)];
    }

    static rgba2hsba([r, g, b, a]) {
        let [h, s, l] = this.rgb2hsb([r, g, b]);
        return [h, s, l, a];
    }


    static randomColor(format = 'hex') {
        let methods = ['hex', 'rgb', 'rgba', 'hsb', 'hsba', 'hsl', 'hsla'];
        let method = methods.includes(format) ? format : methods[Math.floor(Math.random() * methods.length)];
        switch (method) {
            case 'hex':
                return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            case 'rgb':
                return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
            case 'rgba':
                return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.random()})`;
            case 'hsb':
                return `hsb(${Math.floor(Math.random() * 360)},${Math.floor(Math.random() * 100)}%,${Math.floor(Math.random() * 100)}%)`;
            case 'hsba':
                return `hsba(${Math.floor(Math.random() * 360)},${Math.floor(Math.random() * 100)}%,${Math.floor(Math.random() * 100)}%,${Math.random()})`;
            case 'hsl':
                return `hsl(${Math.floor(Math.random() * 360)},${Math.floor(Math.random() * 100)}%,${Math.floor(Math.random() * 100)}%)`;
            case 'hsla':
                return `hsla(${Math.floor(Math.random() * 360)},${Math.floor(Math.random() * 100)}%,${Math.floor(Math.random() * 100)}%,${Math.random()})`;
        }
    }


}