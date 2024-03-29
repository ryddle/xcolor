Color = function (_code) {
    var _self = this;
    this.colorCode = _code;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;

    //private method
    /*
    var init = function () {
    }
    */

    this.getRgba = function () {
        return `rgba( ${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    this.getRgb = function () {
        return `rgb( ${this.r}, ${this.g}, ${this.b})`;
    }
    this.getRgbaObj = function () {
        let [r, g, b, a] = [this.r, this.g, this.b, this.a];
        return { r, g, b, a };
    }
    this.getRgbObj = function () {
        let [r, g, b] = [this.r, this.g, this.b];
        return { r, g, b };
    }
    this.getHexA = function () {
        return this.rgba2hexA(this.getRgba());
    }
    this.getHex = function () {
        return this.rgba2hex(this.getRgba());
    }

    ////// COLOR INTERPOLATOIN LERP
    // extract numeric r, g, b, a values from `rgba(nn, nn, nn, nn)` string
    this.parseRgba = function (color) {
        let [r, g, b, a] = color.replace('rgba(', '')
            .replace(')', '')
            .split(',')
            .map(str => Number(str));
        this.r = r; this.g = g; this.b = b; this.a = a;
    };

    this.parseRgb = function (color) {
        let [r, g, b] = color.replace('rgb(', '')
            .replace(')', '')
            .split(',')
            .map(str => Number(str));
        this.r = r; this.g = g; this.b = b;
    };

    this.hex2rgba = c => `rgba(${c.match(/\w\w/g).map(x => +`0x${x}`)},1)`;
    this.hex2rgb = c => `rgb(${c.match(/\w\w/g).map(x => +`0x${x}`)})`;
    this.rgba2hexA = c => '#' + (c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``);
    this.rgba2hex = c => '#' + (c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``).slice(0, -2);
    this.rgb2hex = c => '#' + (c.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``);

    this.rgb2hls = function (r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;
        
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return "hsl(" + h + "," + s + "%," + l + "%)";
    }

    this.getAlpha = function () {
        return this.a;
    }
    this.setAlpha = function (_alpha) {
        this.a = Math.random().toFixed(1);

        if (_alpha !== undefined) {
            var floatValues = /[+-]?([0-9]*[.])?[0-9]+/;
            if (!isNaN(_alpha)) {
                this.a = _alpha;
            } else if (_alpha.match(floatValues)) {
                this.a = parseFloat(_alpha);
            }
        }
    }

    //////// RANDOM COLOR
    /*const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    this.randomRGBAColor = function() {
        const randomByte = () => randomNumber(0, 255);
        const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2);
        return new Color(`rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`);
    };

    this.randomHLSColor = (() => {
        "use strict";

        const randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        return () => {
            var h = randomInt(0, 360);
            var s = randomInt(42, 98);
            var l = randomInt(40, 90);
            return `hsl(${h},${s}%,${l}%)`;
        };
    })();*/

    this.init();
}

// Constructor
Color.prototype.init = function () {
    if (this.colorCode.indexOf('rgb(') != -1) {
        this.parseRgb(this.colorCode);
    } else if (this.colorCode.indexOf('rgba(') != -1) {
        this.parseRgba(this.colorCode);
    } else if (this.colorCode.indexOf('#') != -1 && this.colorCode.length > 7) {
        this.parseRgba(this.hex2rgba(this.colorCode));
    } else if (this.colorCode.indexOf('rgb(') != -1) {
        this.parseRgb(this.hex2rgb(this.colorCode));
    } else {
        return false;
    }
}

Color.getColor = function (_color) {
    return new Color(_color);
}

Color.colorInterpolate = function (colorA, colorB, intval) {
    const rgbA = colorA.getRgbaObj(),
        rgbB = colorB.getRgbaObj();
    const colorVal = (prop) =>
        Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);
    return Color.getColor(`rgba( ${colorVal('r')}, ${colorVal('g')}, ${colorVal('b')}, ${colorVal('a')})`);
}

Color.getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

Color.getRandomRGBAColor = function () {
    const randomByte = () => Color.getRandomNumber(0, 255);
    const randomPercent = () => (Color.getRandomNumber(50, 100) * 0.01).toFixed(2);
    return new Color(`rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`);
};

Color.getRandomHLSColor = (() => {
    "use strict";

    /*const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };*/

    return () => {
        var h = Color.getRandomNumber(0, 360);
        var s = Color.getRandomNumber(42, 98);
        var l = Color.getRandomNumber(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    };
})();

//Color.prototype.darken = function(a) {return zim.darken(this, a);};