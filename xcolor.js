const rgbRegex = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/;
const rgbaRegex = /^rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(0?(\.\d+)?|1(\.0)?)\)$/;
const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
const hexaRegex = /^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{4})$/;
const hslRegex = /^hsl\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%\)$/;
const hslaRegex = /^hsla\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%,\s?(0?(\.\d+)?|1(\.0)?)\)$/;
const hsbRegex = /^hsb\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%\)$/;
const hsbaRegex = /^hsba\((\d{1,3}),\s?(0?\d?\d|100)%,\s?(0?\d?\d|100)%,\s?(0?(\.\d+)?|1(\.0)?)\)$/

module.exports = class xcolor {
    /**
     * Initializes a new instance of the Color class with the specified color code.
     * By default, the alpha channel is set to 1.
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
    constructor(colorCode, alphaMode) {
        let regexp = new RegExp(rgbRegex.source + '|' + rgbaRegex.source + '|' + hexRegex.source + '|' + hexaRegex.source + '|' + hslRegex.source + '|' + hslaRegex.source + '|' + hsbRegex.source + '|' + hsbaRegex.source);
        if (!colorCode.match(regexp)) {
            console.error('The string '+colorCode+' is an invalid color format. Valid formats are: rgb, rgba, hex, hexa, hsl, hsla, hsb, hsba');
            throw new Error('The string '+colorCode+' is an invalid color format. Valid formats are: rgb, rgba, hex, hexa, hsl, hsla, hsb, hsba');
        } else {
            this.colorCode = colorCode;
            this.alphaMode = alphaMode;
        }

        let matches;
        if (matches = colorCode.match(rgbRegex)) {
            this.parseRgb(colorCode);
            this.parseHex(xcolor.rgb2hex(colorCode));
            this.parseHsb(xcolor.rgb2hsb(colorCode));
            this.parseHsl(xcolor.rgb2hsl(colorCode));
        } else if (matches = colorCode.match(rgbaRegex)) {
            this.parseRgba(colorCode);
            this.parseHexa(xcolor.rgba2hexa(colorCode));
            this.parseHsba(xcolor.rgba2hsba(colorCode));
            this.parseHsla(xcolor.rgba2hsla(colorCode));
        } else if (matches = colorCode.match(hexRegex)) {
            this.parseHex(colorCode);
            this.parseRgb(xcolor.hex2rgb(colorCode));
            this.parseHsb(xcolor.hex2hsb(colorCode));
            this.parseHsl(xcolor.hex2hsl(colorCode));
        } else if (matches = colorCode.match(hexaRegex)) {
            this.parseHexa(colorCode);
            this.parseRgba(xcolor.hexa2rgba(colorCode));
            this.parseHsba(xcolor.hexa2hsba(colorCode));
            this.parseHsla(xcolor.hexa2hsla(colorCode));
        } else if (matches = colorCode.match(hslRegex)) {
            this.parseHsl(colorCode);
            this.parseRgb(xcolor.hsl2rgb(colorCode));
            this.parseHsb(xcolor.hsl2hsb(colorCode));
            this.parseHex(xcolor.hsl2hex(colorCode));
        } else if (matches = colorCode.match(hslaRegex)) {
            this.parseHsla(colorCode);
            this.parseRgba(xcolor.hsla2rgba(colorCode));
            this.parseHsba(xcolor.hsla2hsba(colorCode));
            this.parseHexa(xcolor.hsla2hexa(colorCode));
        } else if (matches = colorCode.match(hsbRegex)) {
            this.parseHsb(colorCode);
            this.parseRgb(xcolor.hsb2rgb(colorCode));
            this.parseHsl(xcolor.hsb2hsl(colorCode));
            this.parseHex(xcolor.hsb2hex(colorCode));
        } else if (matches = colorCode.match(hsbaRegex)) {
            this.parseHsba(colorCode);
            this.parseRgba(xcolor.hsba2rgba(colorCode));
            this.parseHsla(xcolor.hsba2hsla(colorCode));
            this.parseHexa(xcolor.hsba2hexa(colorCode));
        }
    }

    getRgba() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
    getRgb() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
    getHexa() {
        return `#${this.hr}${this.hg}${this.hb}${this.ha}`;
    }
    getHex() {
        return `#${this.hr}${this.hg}${this.hb}`;
    }
    getHsba() {
        return `hsba(${this.hsbH},${this.hsbS}%,${this.hsbB}%,${this.hsbA})`;
    }
    getHsb() {
        return `hsb(${this.hsbH},${this.hsbS}%,${this.hsbB}%)`;
    }
    getHsla() {
        return `hsla(${this.hslH},${this.hslS}%,${this.hslL}%,${this.hslA})`;
    }
    getHsl() {
        return `hsl(${this.hslH},${this.hslS}%,${this.hslL}%)`;
    }

    parseRgb(colorCode) {
        let matches;
        if ((matches = colorCode.match(rgbRegex))) {
            this.r = parseInt(matches[1]);
            this.g = parseInt(matches[2]);
            this.b = parseInt(matches[3]);
            this.a = 1;
        } else {
            throw new Error(`${colorCode} has not a valid rgb format`);
        }
    }
    parseRgba(colorCode) {
        let matches;
        if ((matches = colorCode.match(rgbaRegex))) {
            this.r = parseInt(matches[1]);
            this.g = parseInt(matches[2]);
            this.b = parseInt(matches[3]);
            this.a = parseFloat(matches[4]);
        } else {
            throw new Error(`${colorCode} has not a valid rgba format`);
        }
    }
    parseHex(colorCode) {
        let matches;
        if ((matches = colorCode.match(hexRegex))) {
            let hex = matches[1];
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            this.hr = hex.substring(0, 2);
            this.hg = hex.substring(2, 4);
            this.hb = hex.substring(4, 6);
            this.ha = 1;
        } else {
            throw new Error(`${colorCode} has not a valid hex format`);
        }
    }
    parseHexa(colorCode) {
        let matches;
        if ((matches = colorCode.match(hexaRegex))) {
            let hexa = matches[1];
            if (hexa.length === 3) {
                hexa = hexa[0] + hexa[0] + hexa[1] + hexa[1] + hexa[2] + hexa[2];
            }
            this.hr = hexa.substring(0, 2);
            this.hg = hexa.substring(2, 4);
            this.hb = hexa.substring(4, 6);
            this.ha = hexa.substring(6, 8);
        } else {
            throw new Error(`${colorCode} has not a valid hexa format`);
        }
    }
    parseHsl(colorCode) {
        let matches;
        if ((matches = colorCode.match(hslRegex))) {
            let [h, s, l] = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
            this.hslH = h;
            this.hslS = s;
            this.hslL = l;
            this.hslA = 1;
            //this.parseRgb(xcolor.hsl2rgb(colorCode));
        } else {
            throw new Error(`${colorCode} has not a valid hsl format`);
        }
    }
    parseHsla(colorCode) {
        let matches;
        if ((matches = colorCode.match(hslaRegex))) {
            let [h, s, l, a] = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]), parseFloat(matches[4])];
            this.hslH = h;
            this.hslS = s;
            this.hslL = l;
            this.hslA = a;
            //this.parseRgba(xcolor.hsla2rgba(colorCode));
        } else {
            throw new Error(`${colorCode} has not a valid hsla format`);
        }
    }
    parseHsb(colorCode) {
        let matches;
        if ((matches = colorCode.match(hsbRegex))) {
            let [h, s, b] = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
            this.hsbH = h;
            this.hsbS = s;
            this.hsbB = b;
            this.hsbA = 1;
            //this.parseRgb(xcolor.hsb2rgb(colorCode));
        } else {
            throw new Error(`${colorCode} has not a valid hsb format`);
        }
    }

    parseHsba(colorCode) {
        let matches;
        if ((matches = colorCode.match(hsbaRegex))) {
            let [h, s, b, a] = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]), parseFloat(matches[4])];
            this.hsbH = h;
            this.hsbS = s;
            this.hsbB = b;
            this.hsbA = a;
            //this.parseRgba(xcolor.hsba2rgba(colorCode));
        } else {
            throw new Error(`${colorCode} has not a valid hsba format`);
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
        //let [r, g, b] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        //return `#${r}${g}${b}`;
        return '#'+color.match(/[\d\.]+/g).map((x,i)=> Math.round((+x)*(i<3?1:255)).toString(16).padStart(2,0)).join``;
    }

    static rgba2hex(color) {
        let [r, g, b, a] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `#${r}${g}${b}`;
    }

    static rgba2hexa(color) {
        return '#'+color.match(/[\d\.]+/g).map((x,i)=> Math.round((+x)*(i<3?1:255)).toString(16).padStart(2,0)).join``;
    }

    static hexa2rgba(color) {
        let [r, g, b, a] = color.match(/\w\w/g).map(x => +`0x${x}`);
        return `rgba(${r},${g},${b},${Math.round((a/255)*10)/10})`;
    }

    static hex2rgb(color) {
        let [r, g, b] = color.match(/\w\w/g).map(x => +`0x${x}`);
        return `rgb(${r},${g},${b})`;
    }

    static hex2hsb(color) {
        return xcolor.rgb2hsb(xcolor.hex2rgb(color));
    }

    static hexa2hsba(color) {
        return xcolor.rgba2hsba(xcolor.hexa2rgba(color));
    }

    static hex2hsl(color) {
        return xcolor.rgb2hsl(xcolor.hex2rgb(color));
    }

    static hexa2hsla(color) {
        return xcolor.rgba2hsla(xcolor.hexa2rgba(color));
    }

    static rgb2rgba(color) {
        let [r, g, b] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `rgba(${r},${g},${b}, 1)`;
    }

    static rgba2rgb(color) {
        let [r, g, b, a] = color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0));
        return `rgb(${r},${g},${b})`;
    }

    /**
    * @func hsl2hsb
    * @desc Return an HSB color from an HSL color
    * @param {Number} h - Hue Angle (0 - 360)
    * @param {Number} s - Saturation (0 - 100)
    * @param {Number} l - Lightness (0 - 100)
    * @return {StringHSB}
    * @example
    * hsl2hsb(0, 100, 50)
    * @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
    */
    static hsl2hsb(colorCode) {
        let [_, hslH, hslS, hslL] = colorCode.match(hslRegex).map(Number);
        const hsb1 = hslS * (hslL < 50 ? hslL : 100 - hslL) / 100;
        const hsbS = hsb1 === 0 ? 0 : 2 * hsb1 / (hslL + hsb1) * 100;
        const hsbB = hslL + hsb1;
        return `hsb(${hslH}, ${hsbS}%, ${hsbB}%)`;
    }

    static hsla2hsba(colorCode) {
        let [_, hslH, hslS, hslL, hslA] = colorCode.match(hslaRegex).map(Number);
        const hsb1 = hslS * (hslL < 50 ? hslL : 100 - hslL) / 100;
        const hsbS = hsb1 === 0 ? 0 : 2 * hsb1 / (hslL + hsb1) * 100;
        const hsbB = hslL + hsb1;
        return `hsba(${hslH}, ${hsbS}%, ${hsbB}%, ${hslA})`;
    }
    /**
    * @func hsb2hsl
    * @desc Return an HSL color from an HSB color
    * @param {Number} h - Hue Angle (0 - 360)
    * @param {Number} s - Saturation (0 - 100)
    * @param {Number} b - Brightness (0 - 100)
    * @return {ArrayHSL}
    * @example
    * hsb2hsl(0, 0, 0) // => [0, 100, 50]
    * @link https://gist.github.com/defims/0ca2ef8832833186ed396a2f8a204117
    */
    static hsb2hsl(colorCode) {
        let [_, hsbH, hsbS, hsbB] = colorCode.match(hsbRegex).map(Number);
        const hslL = (200 - hsbS) * hsbB / 100;
        const [hslS, hslB] = [
            hslL === 0 || hslL === 200 ? 0 : hsbS * hsbB / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
            hslL * 5 / 10
        ];
        return `hsl(${hsbH}, ${hslS}%, ${hslB}%)`;
    }

    static hsba2hsla(colorCode) {
        let [_, hsbH, hsbS, hsbB, hsbA] = colorCode.match(hsbaRegex).map(Number);
        const hslL = (200 - hsbS) * hsbB / 100;
        const [hslS, hslB] = [
            hslL === 0 || hslL === 200 ? 0 : hsbS * hsbB / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
            hslL * 5 / 10
        ];
        return `hsla(${hsbH}, ${hslS}%, ${hslB}%, ${hsbA})`;
    }

    static hsl2rgb(colorCode) {
        let [h, s, l] = colorCode.match(/\d+/g).map(Number);
        let a = s * Math.min(l, 100 - l) / 100;
        let f = n => {
            let k = (n + h / 30) % 12;
            let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
        }
        let red=Math.round(f(0)/100);
        let green=Math.round(f(8)/100);
        let blue=Math.round(f(4)/100);
        return `rgb(${red},${green},${blue})`;
    }

    static hsla2rgba(colorCode) {
        let [_, h, s, l, a] = colorCode.match(/\((\d+),\s?(\d+)%,\s?(\d+)%,\s?(\d*\.\d+)\)/).map(Number);
        let rgbA = (s * Math.min(l, 100 - l) / 100)/100;
        let f = n => {
            let k = (n + h / 30) % 12;
            let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color);
        }
        let red=Math.round(f(0)/100);
        let green=Math.round(f(8)/100);
        let blue=Math.round(f(4)/100);
        return `rgba(${red},${green},${blue},${rgbA})`;
    }

    static rgb2hsl(colorCode) {
        let [r, g, b] = colorCode.match(/\d+/g).map(Number);
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            s = max == 0 ? 0 : d / max,
            h = s == 0 ? 0 : d == min ? 0
                : max == r ? (g - b) / d + (g < b ? 6 : 0)
                    : max == g ? (b - r) / d + 2
                        : (r - g) / d + 4;
        return `hsl(${Math.round(h * 60)}, ${Math.round(s * 100)}%, ${Math.round(((max / 255) * 100))}%)`;
    }

    static rgba2hsla(colorCode) {
        let [_, r, g, b, a] = colorCode.match(/\((\d+),\s?(\d+),\s?(\d+),\s?(\d*\.\d+)\)/).map(Number);
        let [h, s, l] = this.rgb2hsl(`rgb(${r},${g},${b})`).match(/\d+/g).map(Number);
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }

    static hsb2rgb(colorCode) {
        let [h, s, b] = colorCode.match(/\d+/g).map(Number);
        s = s / 100;
        b = b / 100;
        let f = (n, k = (n + h / 60) % 6) => b - b * s * Math.max(Math.min(k, 4 - k, 1), 0);
        let red=Math.round(f(5)*255);
        let green=Math.round(f(3))*100;
        let blue=Math.round(f(1)*100);
        return `rgb(${red},${green},${blue})`;
    }

    static hsba2rgba(colorCode) {
        let [_, h, s, b, a] = colorCode.match(/\((\d+),\s?(\d+)%,\s?(\d+)%,\s?(\d*\.\d+)\)/).map(Number);
        s = s / 100;
        b = b / 100;
        let f = (n, k = (n + h / 60) % 6) => b - b * s * Math.max(Math.min(k, 4 - k, 1), 0);
        let red=Math.round(f(5)*255);
        let green=Math.round(f(3))*100;
        let blue=Math.round(f(1)*100);
        return `rgba(${red},${green},${blue},${a})`;
    }

    static rgb2hsb(colorCode) {
        let [r, g, b] = colorCode.match(/\d+/g).map(Number);
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            s = max == 0 ? 0 : d / max,
            h = s == 0 ? 0 : d == min ? 0
                : max == r ? (g - b) / d + (g < b ? 6 : 0)
                    : max == g ? (b - r) / d + 2
                        : (r - g) / d + 4;
        return `hsb(${Math.round(h * 60)}, ${Math.round(s * 100)}%, ${Math.round(((max / 255) * 100))}%)`;
    }

    static rgba2hsba(colorCode) {
        let [_, r, g, b, a] = colorCode.match(/\((\d+),\s?(\d+),\s?(\d+),\s?(\d*\.\d+)\)/).map(Number);
        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            d = max - min,
            s = max == 0 ? 0 : d / max,
            h = s == 0 ? 0 : d == min ? 0
                : max == r ? (g - b) / d + (g < b ? 6 : 0)
                    : max == g ? (b - r) / d + 2
                        : (r - g) / d + 4;
        return `hsba(${Math.round(h * 60)}, ${Math.round(s * 100)}%, ${Math.round(((max / 255) * 100))}%, ${a})`;
    }

    static hsl2hex(colorCode) {
        return xcolor.rgb2hex(xcolor.hsl2rgb(colorCode));
    }

    static hsla2hexa(colorCode) {
        return xcolor.rgba2hexa(xcolor.hsla2rgba(colorCode));
    }

    static hsb2hex(colorCode) {
        return xcolor.rgb2hex(xcolor.hsb2rgb(colorCode));
    }

    static hsba2hexa(colorCode) {
        return xcolor.rgba2hexa(xcolor.hsba2rgba(colorCode));
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