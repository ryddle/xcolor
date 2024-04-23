let mixpalettecontainer, palettescontainer01, palettescontainer02;
let shadescontainer;
let tintscontainer;
let tonescontainer;

function initialize() {
    //Palette.genColorPallete(xcolor.getHsb([Math.round(Math.random() * 300), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]));
    Palette.genColorPallete(xcolor.randomXcolor("hsb"));

    document.getElementById("inputcolor").value = Palette.baseColor.getHexString();
    //document.getElementById("inputcolor2").style.backgroundColor = Palette.baseColor.getHexString();
    document.getElementById("inputcolor2").value = Palette.baseColor.getHexString();

    document.getElementById("mainPanel").appendChild(genColorPanel(Palette.baseColor));

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

    document.body.appendChild(genPaletteLabel("Mix palette"));
    mixpalettecontainer = document.createElement("div");
    mixpalettecontainer.style.display = "inline-flex";
    document.body.appendChild(mixpalettecontainer);

    genMixPalette();

    document.body.appendChild(genPaletteLabel("Shades"));
    shadescontainer = document.createElement("div");
    shadescontainer.style.display = "inline-flex";
    shadescontainer.style.borderWidth = "1px";
    shadescontainer.style.borderStyle = "solid";
    shadescontainer.style.borderColor = "#ccc";
    document.body.appendChild(shadescontainer);

    document.body.appendChild(genPaletteLabel("Tints"));
    tintscontainer = document.createElement("div");
    tintscontainer.style.display = "inline-flex";
    tintscontainer.style.borderWidth = "1px";
    tintscontainer.style.borderStyle = "solid";
    tintscontainer.style.borderColor = "#ccc";
    document.body.appendChild(tintscontainer);

    document.body.appendChild(genPaletteLabel("Tones"));
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

function genColorLabel(color) {
    let label = document.createElement("span");
    label.style.display = "block";
    label.style.color = color.hsb.b > 60 ? "black" : "white";
    label.style.fontWeight = "bold";
    label.style.display = "table-cell";
    label.style.width = "100px";
    label.style.height = "100px";
    label.style.textAlign = "center";
    label.style.verticalAlign = "middle";
    label.innerText = color.getHexString().toUpperCase();
    return label;
}

function createColorDiv(color) {
    let colordiv = document.createElement("div");
    colordiv.style.background = color.getRgbString();
    colordiv.style.width = "100px";
    colordiv.style.height = "100px";
    colordiv.style.cursor = "cursor: grab";
    colordiv.style.cursor = "-webkit-grab";
    colordiv.style.position = "relative";
    colordiv.onclick = function () {
        navigator.clipboard.writeText(color.getHexString());
        updateColorPanel(color);
    }

    return colordiv;
}

function createColorPickerBtn(color) {
    let btn = document.createElement("button");
    btn.innerHTML = '<i class="fa fa-solid fa-eye-dropper" style="color:' + (color.hsb.b > 60 ? "black" : "white") + '"></i>';
    btn.style.padding = "5px";
    btn.style.background = "transparent";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.float = "right";
    btn.style.position = "absolute";
    btn.style.left = "75px";
    btn.onclick = function () {
        document.getElementById("inputcolor").value = color.getHexString();
        updateColor(color.getHexString());
    }
    return btn;
}

function genColorPanel(color) {
    let colorPanel = document.createElement("div");
    colorPanel.id = "colorPanel";
    colorPanel.style.display = "flex";
    colorPanel.style.flexWrap = "wrap";

    function genInputText(label, value) {
        let inputGroup = document.createElement("div");
        inputGroup.style.margin = "5px";
        inputGroup.style.display = "flex";
        inputGroup.style.alignItems = "center";

        let inputText = document.createElement("input");
        inputText.type = "text";
        inputText.value = value;
        inputText.readOnly = true;
        inputText.style.flexGrow = "1";
        inputText.style.marginRight = "5px";
        inputText.style.marginLeft = "5px";

        let btnCopy = document.createElement("button");
        btnCopy.innerHTML = '<i class="far fa-clipboard"></i>';
        btnCopy.style.padding = "5px";
        btnCopy.style.background = "transparent";
        btnCopy.style.border = "none";
        btnCopy.style.cursor = "pointer";
        btnCopy.onclick = function () {
            navigator.clipboard.writeText(inputText.value);
        }

        let labelText = document.createElement("span");
        labelText.innerText = label;

        inputGroup.appendChild(labelText);
        inputGroup.appendChild(inputText);
        inputGroup.appendChild(btnCopy);

        return inputGroup;
    }

    colorPanel.appendChild(genInputText("HEX", color.getHexString().toUpperCase()));
    colorPanel.appendChild(genInputText("RGB", color.getRgbString()));
    colorPanel.appendChild(genInputText("HSL", color.getHslString()));
    colorPanel.appendChild(genInputText("HSB", color.getHsbString()));

    return colorPanel;
}

function updateColorPanel(color) {
    let colorPanels = document.getElementById("colorPanel");
    let inputTexts = colorPanels.getElementsByTagName("input");

    inputTexts[0].value = color.getHexString().toUpperCase();
    inputTexts[1].value = color.getRgbString();
    inputTexts[2].value = color.getHslString();
    inputTexts[3].value = color.getHsbString();
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

        this.pallete.sort((a, b) => a.hsb.h - b.hsb.h);
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

    document.getElementById("inputcolor").value = color.getHexString();
    //document.getElementById("inputcolor2").style.backgroundColor = color.getHexString();
    document.getElementById("inputcolor2").value = color.getHexString();

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

    updateColorPanel(color);
}

function genMixPalette() {
    Palette.pallete.forEach(color => {

        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);

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
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
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
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
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
    splitComplementarycontainer.style.left = "-200px";
    let splitComplementaryPalette = [Palette.baseColor, Palette.splitComplementary2, Palette.splitComplementary3];
    splitComplementaryPalette.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
        splitComplementarycontainer.appendChild(colordiv);
    });
    let splitComplementaryLabel = genPaletteLabel("Split Complementary");
    splitComplementaryLabel.style.width = "200px";
    palettescontainer01.appendChild(splitComplementaryLabel);
    palettescontainer01.appendChild(splitComplementarycontainer);


    let triadiccontainer = document.createElement("div");
    triadiccontainer.style.display = "inline-flex";
    triadiccontainer.style.position = "relative";
    triadiccontainer.style.top = "20px";
    triadiccontainer.style.left = "-100px";
    let triadicPalette = [Palette.baseColor, Palette.triadic2, Palette.triadic3];
    triadicPalette.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
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
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
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
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
        squarecontainer.appendChild(colordiv);
    });
    let squareLabel = genPaletteLabel("Square");
    squareLabel.style.width = "100px";
    palettescontainer02.appendChild(squareLabel);
    palettescontainer02.appendChild(squarecontainer);
}

function genShadesTintsTones() {
    Palette.genShadesTintTones();

    Palette.shades.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);

        shadescontainer.appendChild(colordiv);
    });

    Palette.tints.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
        tintscontainer.appendChild(colordiv);
    });

    Palette.tones.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
        tonescontainer.appendChild(colordiv);
    });
}

function genMonochromaticPalette() {
    Palette.genMonochromaticPalette();

    Palette.monochromaticPalette.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
        monochromaticPaletteContainer.appendChild(colordiv);
    });
}

function genGreysPalette() {
    Palette.genGreysPalette();

    Palette.greysPalette.forEach(color => {
        let colordiv = createColorDiv(color);

        let cpbtn = createColorPickerBtn(color);
        colordiv.appendChild(cpbtn);

        let colorLabel = genColorLabel(color);
        colordiv.appendChild(colorLabel);
        greysPaletteContainer.appendChild(colordiv);
    });
}

let cpdialog = null;
function genColorPickerPanel(event, colorCode) {
    cpdialog = new xcolorPicker(event, colorCode);
    document.body.appendChild(cpdialog);

    cpdialog.showModal();

    cpdialog.addEventListener("close", () => {
        handleUserInput(cpdialog.returnValue);
    });

    cpdialog.addEventListener("click", function(event) {
        if (event.target === cpdialog) {
            cpdialog.close();
        }
    });
}

function handleUserInput(returnValue) {
    if (!returnValue) {
        console.log(" There was no return value");
    } else {
        console.log("Return value: " + returnValue);
        updateColor(returnValue);
    }
}

document.onload = initialize();