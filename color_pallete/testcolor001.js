let mixpalettecontainer, palettescontainer01, palettescontainer02;
let shadescontainer;
let tintscontainer;
let tonescontainer;

function initialize() {
    Palette.genColorPallete(xcolor.getHsb([Math.round(Math.random() * 300), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]));

    document.getElementById("inputcolor").value = Palette.baseColor.getHex();

    palettescontainer01 = document.createElement("div");
    palettescontainer01.style.display = "inline-flex";
    palettescontainer01.style.marginBottom = "20px";
    palettescontainer01.style.width = "100%";
    document.body.appendChild(palettescontainer01);

    palettescontainer02 = document.createElement("div");
    palettescontainer02.style.display = "inline-flex";
    palettescontainer02.style.marginBottom = "20px";
    document.body.appendChild(palettescontainer02);

    genBasePalettes();

    document.body.appendChild(genPaletteLabel("mix palette"));
    mixpalettecontainer = document.createElement("div");
    mixpalettecontainer.style.display = "inline-flex";
    document.body.appendChild(mixpalettecontainer);

    genMixPalette(); 

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

    document.body.appendChild(genPaletteLabel("Greys Palette"));
    greysPaletteContainer = document.createElement("div");
    greysPaletteContainer.style.display = "inline-flex";
    greysPaletteContainer.style.borderWidth = "1px";
    greysPaletteContainer.style.borderStyle = "solid";
    greysPaletteContainer.style.borderColor = "#ccc";
    document.body.appendChild(greysPaletteContainer);

    genGreysPalette();

}

function genPaletteLabel(_label) {
    let label = document.createElement("span");
    label.style.display = "block";
    label.innerText = _label;
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
        this.pallete = [];
        this.baseColor = _color;
        let analogousPalette = xcolor.analogousPalette(this.baseColor);
        this.analogous1 = analogousPalette[0];
        this.analogous3 = analogousPalette[2];
        let complementaryPalette = xcolor.complementaryPalette(this.baseColor);
        this.complementary = complementaryPalette[1];
        let splitComplementaryPalette = xcolor.splitComplementaryPalette(this.baseColor);
        this.splitComplementary2 = splitComplementaryPalette[1];
        this.splitComplementary3 = splitComplementaryPalette[2];
        let triadicPalette = xcolor.triadicPalette(this.baseColor);
        this.triadic2 = triadicPalette[1];
        this.triadic3 = triadicPalette[2];
        let tetradicPalette = xcolor.tetradicPalette(this.baseColor);
        this.tetradic2 = tetradicPalette[1];
        let squarePalette = xcolor.squarePalette(this.baseColor);
        this.square2 = squarePalette[1];
        this.square4 = squarePalette[3];

        this.pallete.push(this.baseColor, this.analogous1, this.analogous3, this.complementary, this.splitComplementary2, this.splitComplementary3, this.triadic2, this.triadic3, this.tetradic2, this.square2, this.square4);

        this.pallete.sort((a,b) => a.hsbH - b.hsbH);
    },

    genShadesTintTones: function () {
        this.shades = xcolor.shades(this.baseColor);
        this.tints = xcolor.tints(this.baseColor);
        this.tones = xcolor.tones(this.baseColor);
    },

    genMonochromaticPalette: function () {
        this.monochromaticPalette = xcolor.monochromaticPalette(this.baseColor);
    },

    genGreysPalette: function () {
        this.greysPalette = xcolor.greysPalette(this.baseColor);
    }
};

function updateColor(_color) {
    color = xcolor.getXcolor(_color);

    while (mixpalettecontainer.firstChild) { mixpalettecontainer.removeChild(mixpalettecontainer.firstChild); };
    while (palettescontainer01.firstChild) { palettescontainer01.removeChild(palettescontainer01.firstChild); };
    while (palettescontainer02.firstChild) { palettescontainer02.removeChild(palettescontainer02.firstChild); };

    while (shadescontainer.firstChild) { shadescontainer.removeChild(shadescontainer.firstChild); };
    while (tintscontainer.firstChild) { tintscontainer.removeChild(tintscontainer.firstChild); };
    while (tonescontainer.firstChild) { tonescontainer.removeChild(tonescontainer.firstChild); };

    while (monochromaticPaletteContainer.firstChild) { monochromaticPaletteContainer.removeChild(monochromaticPaletteContainer.firstChild); };

    Palette.genColorPallete(color);
    genMixPalette();
    genBasePalettes();
    genShadesTintsTones();
    genMonochromaticPalette();
}

function genMixPalette(){
    Palette.pallete.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        colordiv.onclick = function () {

            document.getElementById("inputcolor").value = color.getHex();

            while (mixpalettecontainer.firstChild) { mixpalettecontainer.removeChild(mixpalettecontainer.firstChild); };
            while (palettescontainer01.firstChild) { palettescontainer01.removeChild(palettescontainer01.firstChild); };
            while (palettescontainer02.firstChild) { palettescontainer02.removeChild(palettescontainer02.firstChild); };

            while (shadescontainer.firstChild) { shadescontainer.removeChild(shadescontainer.firstChild); };
            while (tintscontainer.firstChild) { tintscontainer.removeChild(tintscontainer.firstChild); };
            while (tonescontainer.firstChild) { tonescontainer.removeChild(tonescontainer.firstChild); };

            while (monochromaticPaletteContainer.firstChild) { monochromaticPaletteContainer.removeChild(monochromaticPaletteContainer.firstChild); };

            Palette.genColorPallete(color);
            genMixPalette();
            genBasePalettes();
            genShadesTintsTones();
            genMonochromaticPalette();
        }

        mixpalettecontainer.appendChild(colordiv);
    });
}

function genBasePalettes() {
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
    analogousLabel.style.width = "100px";
    palettescontainer01.appendChild(analogousLabel);
    palettescontainer01.appendChild(analogouscontainer);

    let complementarycontainer = document.createElement("div");
    complementarycontainer.style.display = "inline-flex";
    complementarycontainer.style.position = "relative";
    complementarycontainer.style.top = "20px";
    complementarycontainer.style.left = "-100px";
    let complementaryPalette = [Palette.baseColor, Palette.complementary];
    complementaryPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        complementarycontainer.appendChild(colordiv);
    });
    let complementaryLabel = genPaletteLabel("Complementary");
    complementaryLabel.style.width = "100px";
    palettescontainer01.appendChild(complementaryLabel);
    palettescontainer01.appendChild(complementarycontainer);

    let splitComplementarycontainer = document.createElement("div");
    splitComplementarycontainer.style.display = "inline-flex";
    splitComplementarycontainer.style.position = "relative";
    splitComplementarycontainer.style.top = "20px";
    splitComplementarycontainer.style.left = "-100px";
    let splitComplementaryPalette = [Palette.baseColor, Palette.splitComplementary2, Palette.splitComplementary3];
    splitComplementaryPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        splitComplementarycontainer.appendChild(colordiv);
    });
    let splitComplementaryLabel = genPaletteLabel("Split Complementary");
    splitComplementaryLabel.style.width = "100px";
    palettescontainer01.appendChild(splitComplementaryLabel);
    palettescontainer01.appendChild(splitComplementarycontainer);


    let triadiccontainer = document.createElement("div");
    triadiccontainer.style.display = "inline-flex";
    triadiccontainer.style.position = "relative";
    triadiccontainer.style.top = "20px";
    triadiccontainer.style.left = "-100px";
    let triadicPalette = [Palette.baseColor, Palette.triadic2, Palette.triadic3];
    triadicPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        triadiccontainer.appendChild(colordiv);
    });
    let triadicLabel = genPaletteLabel("Triadic");
    triadicLabel.style.width = "100px";
    palettescontainer02.appendChild(triadicLabel);
    palettescontainer02.appendChild(triadiccontainer);

    let tetradiccontainer = document.createElement("div");
    tetradiccontainer.style.display = "inline-flex";
    tetradiccontainer.style.position = "relative";
    tetradiccontainer.style.top = "20px";
    tetradiccontainer.style.left = "-100px";
    let tetradicPalette = [Palette.baseColor, Palette.tetradic2, Palette.complementary, Palette.triadic3];
    tetradicPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        tetradiccontainer.appendChild(colordiv);
    });
    let tetradicLabel = genPaletteLabel("Tetradic");
    tetradicLabel.style.width = "100px";
    palettescontainer02.appendChild(tetradicLabel);
    palettescontainer02.appendChild(tetradiccontainer);

    let squarecontainer = document.createElement("div");
    squarecontainer.style.display = "inline-flex";
    squarecontainer.style.position = "relative";
    squarecontainer.style.top = "20px";
    squarecontainer.style.left = "-100px";
    let squarePalette = [Palette.baseColor, Palette.square2, Palette.complementary, Palette.square4];
    squarePalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";
        squarecontainer.appendChild(colordiv);
    });
    let squareLabel = genPaletteLabel("Square");
    squareLabel.style.width = "100px";
    palettescontainer02.appendChild(squareLabel);
    palettescontainer02.appendChild(squarecontainer);
}

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

function genGreysPalette() {
    Palette.genGreysPalette();

    Palette.greysPalette.forEach(color => {
        let colordiv = document.createElement("div");
        colordiv.style.background = color.getRgb();
        colordiv.style.width = "100px";
        colordiv.style.height = "100px";

        greysPaletteContainer.appendChild(colordiv);
    });
}

document.onload = initialize();