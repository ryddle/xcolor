const map = (value, x1, y1, x2, y2) => Math.round((value - x1) * (y2 - x2) / (y1 - x1) + x2);


let shadescontainer;
let tintscontainer;
let tonescontainer;

function initialize() {
    Palette.genColorPallete(xcolor.getHsb([Math.round(Math.random() * 300), Math.round(Math.random()* 100), Math.round(Math.random() * 100)]));

    let palettecontainer = document.createElement("div");
    palettecontainer.style.display = "inline-flex";
    Palette.pallete.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        colordiv.onclick = function () {
            while (shadescontainer.firstChild) { shadescontainer.removeChild(shadescontainer.firstChild); };
            while (tintscontainer.firstChild) { tintscontainer.removeChild(tintscontainer.firstChild); };
            while (tonescontainer.firstChild) { tonescontainer.removeChild(tonescontainer.firstChild); };
            
            while (monochromaticPaletteContainer.firstChild) { monochromaticPaletteContainer.removeChild(monochromaticPaletteContainer.firstChild); };

            Palette.baseColor = color;
            genShadesTintsTones();
            genMonochromaticPalette();
        }

        palettecontainer.appendChild(colordiv);
    });

    let palettescontainer = document.createElement("div");
    palettescontainer.style.display = "inline-flex";
    palettescontainer.style.marginBottom= "20px";

    let analogouscontainer = document.createElement("div");
    analogouscontainer.style.display = "inline-flex";
    analogouscontainer.style.position = "relative";
    analogouscontainer.style.top = "20px";
    analogouscontainer.style.left = "-100px";
    let analogousPalette = [Palette.analogous1, Palette.baseColor, Palette.analogous3];
    analogousPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        analogouscontainer.appendChild(colordiv);
    });
    let analogousLabel = genPaletteLabel("Analogous");
    analogousLabel.style.width="100px";
    palettescontainer.appendChild(analogousLabel);
    palettescontainer.appendChild(analogouscontainer);
    document.body.appendChild(palettescontainer);

    let complementarycontainer = document.createElement("div");
    complementarycontainer.style.display = "inline-flex";
    complementarycontainer.style.position = "relative";
    complementarycontainer.style.top = "20px";
    complementarycontainer.style.left = "-100px";
    let complementaryPalette = [ Palette.baseColor, Palette.complementary];
    complementaryPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        complementarycontainer.appendChild(colordiv);
    });
    let complementaryLabel = genPaletteLabel("Complementary");
    complementaryLabel.style.width="100px";
    palettescontainer.appendChild(complementaryLabel);
    palettescontainer.appendChild(complementarycontainer);

    let splitComplementarycontainer = document.createElement("div");
    splitComplementarycontainer.style.display = "inline-flex";
    splitComplementarycontainer.style.position = "relative";
    splitComplementarycontainer.style.top = "20px";
    splitComplementarycontainer.style.left = "-100px";
    let splitComplementaryPalette = [ Palette.baseColor, Palette.splitComplementary2, Palette.splitComplementary3];
    splitComplementaryPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        splitComplementarycontainer.appendChild(colordiv);
    });
    let splitComplementaryLabel = genPaletteLabel("Split Complementary");
    splitComplementaryLabel.style.width="100px";
    palettescontainer.appendChild(splitComplementaryLabel);
    palettescontainer.appendChild(splitComplementarycontainer);

    let triadiccontainer = document.createElement("div");
    triadiccontainer.style.display = "inline-flex";
    triadiccontainer.style.position = "relative";
    triadiccontainer.style.top = "20px";
    triadiccontainer.style.left = "-100px";
    let triadicPalette = [ Palette.baseColor, Palette.triadic2, Palette.triadic3];
    triadicPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        triadiccontainer.appendChild(colordiv);
    });
    let triadicLabel = genPaletteLabel("Triadic");
    triadicLabel.style.width="100px";
    palettescontainer.appendChild(triadicLabel);
    palettescontainer.appendChild(triadiccontainer);

    let tetradiccontainer = document.createElement("div");
    tetradiccontainer.style.display = "inline-flex";
    tetradiccontainer.style.position = "relative";
    tetradiccontainer.style.top = "20px";
    tetradiccontainer.style.left = "-100px";
    let tetradicPalette = [ Palette.baseColor, Palette.tetradic2, Palette.complementary, Palette.triadic3];
    tetradicPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        tetradiccontainer.appendChild(colordiv);
    });
    let tetradicLabel = genPaletteLabel("Tetradic");
    tetradicLabel.style.width="100px";
    palettescontainer.appendChild(tetradicLabel);
    palettescontainer.appendChild(tetradiccontainer);
    
    let squarecontainer = document.createElement("div");
    squarecontainer.style.display = "inline-flex";
    squarecontainer.style.position = "relative";
    squarecontainer.style.top = "20px";
    squarecontainer.style.left = "-100px";
    let squarePalette = [ Palette.baseColor, Palette.square2, Palette.complementary, Palette.square4];
    squarePalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        squarecontainer.appendChild(colordiv);
    });
    let squareLabel = genPaletteLabel("Square");
    squareLabel.style.width="100px";
    palettescontainer.appendChild(squareLabel);
    palettescontainer.appendChild(squarecontainer);
    
    
    document.body.appendChild(genPaletteLabel("mix palette"));
    document.body.appendChild(palettecontainer);

    document.body.appendChild(genPaletteLabel("shades"));
    shadescontainer = document.createElement("div");
    shadescontainer.style.display = "inline-flex";
    shadescontainer.style.borderWidth = "1px";
    shadescontainer.style.borderStyle = "solid";
    shadescontainer.style.borderColor = "#ccc";
    document.body.appendChild(shadescontainer);

    document.body.appendChild(genPaletteLabel("tints"));
    tintscontainer = document.createElement("div");
    tintscontainer.style.display = "inline-flex";
    tintscontainer.style.borderWidth = "1px";
    tintscontainer.style.borderStyle = "solid";
    tintscontainer.style.borderColor = "#ccc";
    document.body.appendChild(tintscontainer);

    document.body.appendChild(genPaletteLabel("tones"));
    tonescontainer = document.createElement("div");
    tonescontainer.style.display = "inline-flex";
    tonescontainer.style.borderWidth = "1px";
    tonescontainer.style.borderStyle = "solid";
    tonescontainer.style.borderColor = "#ccc";
    document.body.appendChild(tonescontainer);

    genShadesTintsTones();

    document.body.appendChild(genPaletteLabel("Monochromatic Palette"));
    monochromaticPaletteContainer = document.createElement("div");
    monochromaticPaletteContainer.style.display = "inline-flex";
    monochromaticPaletteContainer.style.borderWidth = "1px";
    monochromaticPaletteContainer.style.borderStyle = "solid";
    monochromaticPaletteContainer.style.borderColor = "#ccc";
    document.body.appendChild(monochromaticPaletteContainer);

    genMonochromaticPalette();    
    
}

function genPaletteLabel(_label) {
    let label = document.createElement("span");
    label.style.display="block";
    label.innerText=_label;
    return label;
}

var Palette = {
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
    monochromaticPalette: [],
    shades: [],
    tints: [],
    tones: [],
    genColorPallete: function (_color) {
        this.baseColor = _color;
        this.analogous1 = xcolor.getHsb([(this.baseColor.hsbH + 330) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.analogous3 = xcolor.getHsb([(this.baseColor.hsbH + 30) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.complementary = xcolor.getHsb([(this.baseColor.hsbH + 180) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.splitComplementary2 = xcolor.getHsb([(this.baseColor.hsbH + 150) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.splitComplementary3 = xcolor.getHsb([(this.baseColor.hsbH + 210) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.triadic2 = xcolor.getHsb([(this.baseColor.hsbH + 120) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.triadic3 = xcolor.getHsb([(this.baseColor.hsbH + 240) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.tetradic2 = xcolor.getHsb([(this.baseColor.hsbH + 60) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.square2 = xcolor.getHsb([(this.baseColor.hsbH + 90) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);
        this.square4 = xcolor.getHsb([(this.baseColor.hsbH + 270) % 360, this.baseColor.hsbS, this.baseColor.hsbB]);

        this.pallete.push(this.baseColor, this.analogous1, this.analogous3, this.complementary, this.splitComplementary2, this.splitComplementary3, this.triadic2, this.triadic3, this.tetradic2, this.square2, this.square4);
    },

    genShadesTintTones: function () {
        this.shades= [];
        this.tints= [];
        this.tones= [];
        for (let i = 0; i < 15; i++) {
            this.shades.push(xcolor.getHsb([this.baseColor.hsbH, this.baseColor.hsbS, map(i, 0, 14, this.baseColor.hsbB, 0)]));
        }
        for (let i = 0; i < 15; i++) {
            this.tints.push(xcolor.getHsb([this.baseColor.hsbH, map(i, 0, 14, this.baseColor.hsbS, 0), map(i, 0, 14, this.baseColor.hsbB, 100)]));
        }
        for (let i = 0; i < 15; i++) {
            this.tones.push(xcolor.getHsb([this.baseColor.hsbH, map(i, 0, 14, this.baseColor.hsbS, 0), this.baseColor.hsbB]));
        }
    },

    genMonochromaticPalette: function () {
        this.monochromaticPalette= [];
        let n = 15;
        for (var i = 0; i < n; i++) {
            let saturation = 100;
            /* Vary the brightness regardless of value number */
            let brightness = map(i, 0, n - 1, 100, 0);
            /* Increase saturation only in the first half */
            if (i < n/2)
              saturation = map(i, 0, n/2 - 1, 0, 100);
            this.monochromaticPalette.push(xcolor.getHsb([this.baseColor.hsbH, Math.min(Math.round(saturation),100), Math.round(brightness)]));
          }
    }
};
function genShadesTintsTones() {
    Palette.genShadesTintTones();

    Palette.shades.forEach(shade => {
        let shadediv = document.createElement("div");
        shadediv.style.background = shade.getRgb();
        shadediv.style.width = "100px";
        shadediv.style.height = "100px";

        shadescontainer.appendChild(shadediv);
    });

    Palette.tints.forEach(tint => {
        let tintsdiv = document.createElement("div");
        tintsdiv.style.background = tint.getRgb();
        tintsdiv.style.width = "100px";
        tintsdiv.style.height = "100px";

        tintscontainer.appendChild(tintsdiv);
    });

    Palette.tones.forEach(tone => {
        let tonesdiv = document.createElement("div");
        tonesdiv.style.background = tone.getRgb();
        tonesdiv.style.width = "100px";
        tonesdiv.style.height = "100px";

        tonescontainer.appendChild(tonesdiv);
    });
}

function genMonochromaticPalette() {
    Palette.genMonochromaticPalette();

    Palette.monochromaticPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";

        monochromaticPaletteContainer.appendChild(colordiv);
    });
}

document.onload = initialize();