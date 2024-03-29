let shadescontainer;
let tintscontainer;
let tonescontainer;

function setup() {
    //createCanvas(0, 0);
    colorMode(HSB, 360, 100, 100);

    Pallete.genColorPallete(color(random(0, 300), random(0, 100), random(0, 100)));

    let palletecontainer = document.createElement("div");
    palletecontainer.style.display = "inline-flex";
    Pallete.pallete.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color;
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        colordiv.onclick = function () {
            while (shadescontainer.firstChild) { shadescontainer.removeChild(shadescontainer.firstChild); };
            while (tintscontainer.firstChild) { tintscontainer.removeChild(tintscontainer.firstChild); };
            while (tonescontainer.firstChild) { tonescontainer.removeChild(tonescontainer.firstChild); };

            Pallete.baseColor = color;
            genShadesTintsTones();
        }

        palletecontainer.appendChild(colordiv);
    });
    document.body.appendChild(palletecontainer);

    shadescontainer = document.createElement("div");
    shadescontainer.style.display = "inline-flex";
    shadescontainer.style.width = "100%";
    document.body.appendChild(shadescontainer);

    tintscontainer = document.createElement("div");
    tintscontainer.style.display = "inline-flex";
    tintscontainer.style.width = "100%";
    document.body.appendChild(tintscontainer);

    tonescontainer = document.createElement("div");
    tonescontainer.style.display = "inline-flex";
    tonescontainer.style.width = "100%";
    document.body.appendChild(tonescontainer);

    genShadesTintsTones();
}

var Pallete = {
    baseColor: null,
    analogous1: null,
    analogous3: null,
    complementary: null,
    splitComplementary2: null,
    splitComplementary3: null,
    triadic2: null,
    triadic3: null,
    tetradic2: null,
    square2: null,
    square4: null,
    pallete: [],
    shades: [],
    tints: [],
    tones: [],
    genColorPallete: function (_color) {
        colorMode(HSB);
        this.baseColor = color(_color);
        this.analogous1 = color((hue(this.baseColor) + 330) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.analogous3 = color((hue(this.baseColor) + 30) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.complementary = color((hue(this.baseColor) + 180) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.splitComplementary2 = color((hue(this.baseColor) + 150) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.splitComplementary3 = color((hue(this.baseColor) + 210) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.triadic2 = color((hue(this.baseColor) + 120) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.triadic3 = color((hue(this.baseColor) + 240) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.tetradic2 = color((hue(this.baseColor) + 60) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.square2 = color((hue(this.baseColor) + 90) % 360, saturation(this.baseColor), brightness(this.baseColor));
        this.square4 = color((hue(this.baseColor) + 270) % 360, saturation(this.baseColor), brightness(this.baseColor));

        this.pallete.push(this.baseColor, this.analogous1, this.analogous3, this.complementary, this.splitComplementary2, this.splitComplementary3, this.triadic2, this.triadic3, this.tetradic2, this.square2, this.square4);
    },

    genShadesTintTones: function () {
        this.shades= [];
        this.tints= [];
        this.tones= [];
        for (let i = 0; i < 15; i++) {
            this.shades.push(color(hue(this.baseColor), saturation(this.baseColor), map(i, 0, 14, brightness(this.baseColor), 0)));
        }
        for (let i = 0; i < 15; i++) {
            this.tints.push(color(hue(this.baseColor), map(i, 0, 14, saturation(this.baseColor), 0), map(i, 0, 14, brightness(this.baseColor), 100)));
        }
        for (let i = 0; i < 15; i++) {
            this.tones.push(color(hue(this.baseColor), map(i, 0, 14, saturation(this.baseColor), 0), brightness(this.baseColor)));
        }
    }
};
function genShadesTintsTones() {
    Pallete.genShadesTintTones();

    Pallete.shades.forEach(shade => {
        let shadediv = document.createElement("div");
        shadediv.style.background = shade;
        shadediv.style.width = "100px";
        shadediv.style.height = "100px";

        shadescontainer.appendChild(shadediv);
    });

    Pallete.tints.forEach(tint => {
        let tintsdiv = document.createElement("div");
        tintsdiv.style.background = tint;
        tintsdiv.style.width = "100px";
        tintsdiv.style.height = "100px";

        tintscontainer.appendChild(tintsdiv);
    });

    Pallete.tones.forEach(tone => {
        let tonesdiv = document.createElement("div");
        tonesdiv.style.background = tone;
        tonesdiv.style.width = "100px";
        tonesdiv.style.height = "100px";

        tonescontainer.appendChild(tonesdiv);
    });
}

