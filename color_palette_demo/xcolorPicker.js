class xcolorPicker {
    #copyIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#454545"></path> </g></svg>';

    constructor(event, colorCode) {
        this.color = xcolor.getXcolor('#ff0000');
        this.htmlcolor = { name: "", value: "" };

        if (colorCode !== undefined) {
            this.color = xcolor.getXcolor(colorCode);
        }

        this.tabcontentStyle = {
            display: 'none',
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderTop: 'none'
        };

        this.tabActiveStyle = {
            backgroundColor: '#eee',
            float: 'left',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease 0s',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'rgb(70 70 70)',
            height: '22px',
            marginTop: '30px',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            border: '1px solid #ccc'
        }


        this.tabStyle = {
            backgroundColor: 'inherit',
            float: 'left',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease 0s',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'rgb(68, 68, 68)',
            height: '20px',
            marginTop: '32px',
            borderTop: '1px solid #eee',
            borderRight: '1px solid #eee'
        }

        this.#createColorForms();

        this.#createColorPickerPanel(event);

        this.#updateRgbForm();
        this.#updateRgbPickers();
        this.#updateHslForm();
        this.#updateHslPickers();
        this.#updateHsbForm();
        this.#updateHsbPickers();
        this.#updateHtmlForm()

        return this.colorPickerDialog;
    }

    #createInputColorElm(id, type, label, value, style) {
        const labelsStyle = {
            fontFamily: 'monospace',
            fontSize: '1.2em'
        };
        const inputsStyle = {
            width: "60px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginBottom: '10px',
            textAlign: 'right'
        };
        let inputColorElmForm = document.createElement("div");
        Object.assign(inputColorElmForm.style, {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        });

        let inputColorElmLabel = document.createElement("label");
        inputColorElmLabel.for = id;
        inputColorElmLabel.innerText = label;
        Object.assign(inputColorElmLabel.style, labelsStyle);

        let inputColorElm = document.createElement("input");
        inputColorElm.id = id;
        inputColorElm.type = type;
        inputColorElm.value = value;
        inputColorElm.min = "0";
        inputColorElm.max = "100";
        Object.assign(inputColorElm.style, inputsStyle);
        if (style !== undefined && typeof style === 'object') {
            Object.assign(inputColorElm.style, style);
        }

        return { form: inputColorElmForm, label: inputColorElmLabel, input: inputColorElm };
    }

    #createSlider() {
        let slider01 = document.createElement("div");
        slider01.className = "IroSlider";
        Object.assign(slider01.style, {
            position: "relative",
            width: "350px",
            height: "44px",
            borderRadius: "22px",
            overflow: "visible",
            display: "block",
            marginTop: "12px"
        });

        let slider02 = document.createElement("div");
        slider02.className = "IroSliderGradient";
        Object.assign(slider02.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "22px",
            boxSizing: "border-box",
            border: "4px solid rgb(255, 255, 255)"
        })

        return { slider01: slider01, slider02: slider02 };
    }

    #createCircle(left, top){
        let _circleOut = document.createElement("div");
        Object.assign(_circleOut.style, {
            border: '2px solid #444',
            borderRadius: '13px',
            willChange: 'transform',
            top: top + 'px',
            left: left + 'px',
            width: '24px',
            height: '24px',
            position: 'absolute',
            overflow: 'visible'
        });

        let _circleIn = document.createElement("div");
        Object.assign(_circleIn.style, {
            border: '2px solid rgb(255, 255, 255)',
            borderRadius: '12px',
            top: '0px',
            left: '0px',
            width: '20px',
            height: '20px',
            position: 'absolute',
            overflow: 'visible'
        });

        _circleOut.appendChild(_circleIn);
        return _circleOut;
    }

    #createCopyButton(copyElm) {
        let _copyButton = document.createElement("button");
        _copyButton.type = "button";
        Object.assign(_copyButton.style, {
            width: '24px',
            height: '24px',
            padding: '0px'
        });
        _copyButton.innerHTML = this.#copyIcon;
        _copyButton.onclick = function () {
            navigator.clipboard.writeText(copyElm.value);
        }
        return _copyButton;
    }

    #createFormPanel() {
        /// form panel
        let _formPanel = document.createElement("div");
        Object.assign(_formPanel.style, {
            padding: '5px',
            float: "right",
            width: "220px",
            height: "520px",
            backgroundColor: "rgb(241, 241, 241)",
            border: "1px solid #ccc",
            borderRadius: "4px"
        });
        return _formPanel;
    }

    #createFormPanelColor() {
        let _formPanelColor = document.createElement("div");
        Object.assign(_formPanelColor.style, {
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: this.color.getRgbString(),
            height: "50px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "10px"
        });

        return _formPanelColor;
    }

    #createColorForms() {
        let _self = this;
        /// rgb form
        // red
        let _rgbRedForm = this.#createInputColorElm("rgbRed", "number", "Red", this.color.rgb.r);
        this.rgbRedForm = _rgbRedForm.form;
        this.rgbRedLabel = _rgbRedForm.label;
        this.rgbRedInput = _rgbRedForm.input;
        this.rgbRedInput.onchange = function () {
            _self.color = xcolor.getRgb(this.value, _self.color.rgb.g, _self.color.rgb.b);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.rgbRedForm.appendChild(this.rgbRedLabel);
        this.rgbRedForm.appendChild(this.rgbRedInput);
        // green
        let _rgbGreenForm = this.#createInputColorElm("rgbGreen", "number", "Green", this.color.rgb.g);
        this.rgbGreenForm = _rgbGreenForm.form;
        this.rgbGreenLabel = _rgbGreenForm.label;
        this.rgbGreenInput = _rgbGreenForm.input;
        this.rgbGreenInput.onchange = function () {
            _self.color = xcolor.getRgb(_self.color.rgb.r, this.value, _self.color.rgb.b);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.rgbGreenForm.appendChild(this.rgbGreenLabel);
        this.rgbGreenForm.appendChild(this.rgbGreenInput);
        // blue
        let _rgbBlueForm = this.#createInputColorElm("rgbBlue", "number", "Blue", this.color.rgb.b);
        this.rgbBlueForm = _rgbBlueForm.form;
        this.rgbBlueLabel = _rgbBlueForm.label;
        this.rgbBlueInput = _rgbBlueForm.input;
        this.rgbBlueInput.onchange = function () {
            _self.color = xcolor.getRgb(_self.color.rgb.r, _self.color.rgb.g, this.value);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.rgbBlueForm.appendChild(this.rgbBlueLabel);
        this.rgbBlueForm.appendChild(this.rgbBlueInput);
        // rgb
        let _rgbRgbForm = this.#createInputColorElm("rgbRgb", "text", "RGB", this.color.getRgbString(), { width: '160px', marginTop: '10px', textAlign: 'left' });
        this.rgbRgbForm = _rgbRgbForm.form;
        this.rgbRgbLabel = _rgbRgbForm.label;
        this.rgbRgbInput = _rgbRgbForm.input;
        this.rgbRgbInput.onchange = function () {
            _self.color = xcolor.getRgbColor(this.value);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        }
        this.copyIconRgb = this.#createCopyButton(this.rgbRgbInput);

        this.rgbRgbForm.appendChild(this.rgbRgbLabel);
        this.rgbRgbForm.appendChild(this.rgbRgbInput);
        this.rgbRgbForm.appendChild(this.copyIconRgb);
        ////////////////////////////////////////////////////////////////////////////////////////
        /// hex form
        // red
        let _hexRedForm = this.#createInputColorElm("hexRed", "text", "Red", this.color.hex.r);
        this.hexRedForm = _hexRedForm.form;
        this.hexRedLabel = _hexRedForm.label;
        this.hexRedInput = _hexRedForm.input;
        this.hexRedInput.onchange = function () {
            _self.color = xcolor.getHex(this.value, _self.color.hex.g, _self.color.hex.b);
            _self.hexWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.updateHexForm();
            _self.updateHexPickers();
        };
        this.hexRedForm.appendChild(this.hexRedLabel);
        this.hexRedForm.appendChild(this.hexRedInput);
        // green
        let _hexGreenForm = this.#createInputColorElm("hexGreen", "text", "Green", this.color.hex.g);
        this.hexGreenForm = _hexGreenForm.form;
        this.hexGreenLabel = _hexGreenForm.label;
        this.hexGreenInput = _hexGreenForm.input;
        this.hexGreenInput.onchange = function () {
            _self.color = xcolor.getHex(_self.color.hex.r, this.value, _self.color.hex.b);
            _self.hexWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.updateHexForm();
            _self.updateHexPickers();
        };
        this.hexGreenForm.appendChild(this.hexGreenLabel);
        this.hexGreenForm.appendChild(this.hexGreenInput);
        // blue
        let _hexBlueForm = this.#createInputColorElm("hexBlue", "text", "Blue", this.color.hex.b);
        this.hexBlueForm = _hexBlueForm.form;
        this.hexBlueLabel = _hexBlueForm.label;
        this.hexBlueInput = _hexBlueForm.input;
        this.hexBlueInput.onchange = function () {
            _self.color = xcolor.getHex(_self.color.hex.r, _self.color.hex.g, this.value);
            _self.hexWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.updateHexForm();
            _self.updateHexPickers();
        };
        this.hexBlueForm.appendChild(this.hexBlueLabel);
        this.hexBlueForm.appendChild(this.hexBlueInput);
        // hex
        let _hexHexForm = this.#createInputColorElm("hexHex", "text", "HEX", this.color.getRgbString(), { width: '160px', marginTop: '10px', textAlign: 'left' });
        this.hexHexForm = _hexHexForm.form;
        this.hexHexLabel = _hexHexForm.label;
        this.hexHexInput = _hexHexForm.input;
        this.hexHexInput.onchange = function () {
            _self.color = xcolor.getHexColor(this.value);
            _self.hexWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.updateHexForm();
            _self.updateHexPickers();
        }
        this.copyIconHex = this.#createCopyButton(this.hexHexInput);

        this.hexHexForm.appendChild(this.hexHexLabel);
        this.hexHexForm.appendChild(this.hexHexInput);
        this.hexHexForm.appendChild(this.copyIconHex);
        ////////////////////////////////////////////////////////////////////////////////////////
        /// hsl form
        // hue
        let _hslHueForm = this.#createInputColorElm("hslHue", "number", "Hue", this.color.hsl.h);
        this.hslHueForm = _hslHueForm.form;
        this.hslHueLabel = _hslHueForm.label;
        this.hslHueInput = _hslHueForm.input;
        this.hslHueInput.onchange = function () {
            _self.color = xcolor.getHsl(this.value, _self.color.hsl.s, _self.color.hsl.l);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.hslHueForm.appendChild(this.hslHueLabel);
        this.hslHueForm.appendChild(this.hslHueInput);
        // sat
        let _hslSatForm = this.#createInputColorElm("hslSat", "number", "Sat", this.color.hsl.s);
        this.hslSatForm = _hslSatForm.form;
        this.hslSatLabel = _hslSatForm.label;
        this.hslSatInput = _hslSatForm.input;
        this.hslSatInput.onchange = function () {
            _self.color = xcolor.getHsl(_self.color.hsl.h, this.value, _self.color.hsl.l);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.hslSatForm.appendChild(this.hslSatLabel);
        this.hslSatForm.appendChild(this.hslSatInput);
        // light
        let _hslLightForm = this.#createInputColorElm("hslLight", "number", "Light", this.color.hsl.l);
        this.hslLightForm = _hslLightForm.form;
        this.hslLightLabel = _hslLightForm.label;
        this.hslLightInput = _hslLightForm.input;
        this.hslLightInput.onchange = function () {
            _self.color = xcolor.getHsl(_self.color.hsl.h, _self.color.hsl.s, this.value);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.hslLightForm.appendChild(this.hslLightLabel);
        this.hslLightForm.appendChild(this.hslLightInput);
        // hsl
        let _hslHslForm = this.#createInputColorElm("hslHsl", "text", "HSL", this.color.getRgbString(), { width: '160px', marginTop: '10px', textAlign: 'left' });
        this.hslHslForm = _hslHslForm.form;
        this.hslHslLabel = _hslHslForm.label;
        this.hslHslInput = _hslHslForm.input;
        this.hslHslInput.onchange = function () {
            _self.color = xcolor.getHslColor(this.value);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        }
        this.copyIconHsl = this.#createCopyButton(this.hslHslInput);

        this.hslHslForm.appendChild(this.hslHslLabel);
        this.hslHslForm.appendChild(this.hslHslInput);
        this.hslHslForm.appendChild(this.copyIconHsl);
        ////////////////////////////////////////////////////////////////////////////////////////
        /// hsb form
        // hue
        let _hsbHueForm = this.#createInputColorElm("hsbHue", "number", "Hue", this.color.hsb.h);
        this.hsbHueForm = _hsbHueForm.form;
        this.hsbHueLabel = _hsbHueForm.label;
        this.hsbHueInput = _hsbHueForm.input;
        this.hsbHueInput.onchange = function () {
            _self.color = xcolor.getHsb(this.value, _self.color.hsb.s, _self.color.hsb.b);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.hsbHueForm.appendChild(this.hsbHueLabel);
        this.hsbHueForm.appendChild(this.hsbHueInput);
        // sat
        let _hsbSatForm = this.#createInputColorElm("hsbSat", "number", "Sat", this.color.hsb.s);
        this.hsbSatForm = _hsbSatForm.form;
        this.hsbSatLabel = _hsbSatForm.label;
        this.hsbSatInput = _hsbSatForm.input;
        this.hsbSatInput.onchange = function () {
            _self.color = xcolor.getHsb(_self.color.hsb.h, this.value, _self.color.hsb.b);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.hsbSatForm.appendChild(this.hsbSatLabel);
        this.hsbSatForm.appendChild(this.hsbSatInput);
        // bright
        let _hsbBrightForm = this.#createInputColorElm("hsbBright", "number", "Bright", this.color.hsb.b);
        this.hsbBrightForm = _hsbBrightForm.form;
        this.hsbBrightLabel = _hsbBrightForm.label;
        this.hsbBrightInput = _hsbBrightForm.input;
        this.hsbBrightInput.onchange = function () {
            _self.color = xcolor.getHsb(_self.color.hsb.h, _self.color.hsb.s, this.value);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.hsbBrightForm.appendChild(this.hsbBrightLabel);
        this.hsbBrightForm.appendChild(this.hsbBrightInput);
        // hsb
        let _hsbHsbForm = this.#createInputColorElm("hsbHsb", "text", "HSB", this.color.getRgbString(), { width: '160px', marginTop: '10px', textAlign: 'left' });
        this.hsbHsbForm = _hsbHsbForm.form;
        this.hsbHsbLabel = _hsbHsbForm.label;
        this.hsbHsbInput = _hsbHsbForm.input;
        this.hsbHsbInput.onchange = function () {
            _self.color = xcolor.getHsbColor(this.value);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        }
        this.copyIconHsb = this.#createCopyButton(this.hsbHsbInput);

        this.hsbHsbForm.appendChild(this.hsbHsbLabel);
        this.hsbHsbForm.appendChild(this.hsbHsbInput);
        this.hsbHsbForm.appendChild(this.copyIconHsb);
        ////////////////////////////////////////////////////////////////////////////////////////
    }

    #openTab(evt, tab) {
        for (let i = 0; i < this.tabcontents.length; i++) {
            this.tabcontents[i].style.display = "none";
            this.tablinks[i].style.backgroundColor = "inherit";
            Object.assign(this.tablinks[i].style, this.tabStyle);
        }
        var tabcontent = this.tabcontents.find(element => element.id == tab.tabPanel);
        tabcontent.style.display = "block";
        tab.className += " active";
        Object.assign(tab.style, this.tabActiveStyle);
    }

    #calculateWheelColor(event) {
        var cx = 175;
        var cy = 175;
        var radius = 175;

        var x = event.layerX - cx;
        var y = event.layerY - cy;
        var theta = Math.atan2(y, x);

        var angle = Math.round((theta * 180 / Math.PI + 360) % 360);
        var distance = Math.sqrt(x * x + y * y);

        return { angle: angle, distance: distance };
    }

    #updateRgbForm() {
        this.rgbRedInput.value = this.color.rgb.r;
        this.rgbGreenInput.value = this.color.rgb.g;
        this.rgbBlueInput.value = this.color.rgb.b;

        this.hexRedInput.value = this.color.hex.r.toUpperCase();
        this.hexGreenInput.value = this.color.hex.g.toUpperCase();
        this.hexBlueInput.value = this.color.hex.b.toUpperCase();

        this.rgbRgbInput.value = this.color.getRgbString();
        this.hexHexInput.value = this.color.getHexString().toUpperCase();

        this.rgbFormPanelColor.style.backgroundColor = this.color.getRgbString();
    }

    #updateRgbPickers() {
        let wx = map(this.color.hsb.s, 0, 100, 0, 322);
        let wy = map(this.color.hsb.b, 0, 100, 322, 0);

        this.rgbWheelSliderCircleOut.style.left = wx + "px";
        this.rgbWheelSliderCircleOut.style.top = wy + "px";

        this.rgbWheelPanel.style.backgroundColor = this.color.getRgbString();

        this.rgbHueSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsb.h, 0, 360, 8, 315))) + "px";

        this.rgbSaturationSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsb.s, 0, 100, 8, 315))) + "px";
        this.rgbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";

        this.rgbLightSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsb.b, 0, 100, 8, 315))) + "px";
        this.rgbLightSlider02.style.background = "linear-gradient(to right, rgb(255, 255, 255) 0%, " + this.color.getRgbString() + " 100%)";
    }

    #updateHslForm() {
        this.hslHueInput.value = this.color.hsl.h;
        this.hslSatInput.value = this.color.hsl.s;
        this.hslLightInput.value = this.color.hsl.l;

        this.hslHslInput.value = this.color.getHslString();

        this.hslFormPanelColor.style.backgroundColor = this.color.getRgbString();
    }

    #updateHslPickers() {
        let wangle = this.color.hsl.h;
        let wdistance = map(this.color.hsl.l, 0, 100, 0, 175);

        let cos = Math.cos(wangle * Math.PI / 180);
        let sin = Math.sin(wangle * Math.PI / 180);
        let wx = 175 + (cos * wdistance);
        wx = wx - (12 * (Math.max(wx, 0.01) / 175));
        let wy = 175 + (sin * wdistance);
        wy = wy - (12 * (Math.max(wy, 0.01) / 175));

        this.hslWheelSliderCircleOut.style.left = wx + "px";
        this.hslWheelSliderCircleOut.style.top = wy + "px";

        this.hslSaturationSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsl.s, 0, 100, 8, 315))) + "px";
        this.hslSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hslLightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsl.l, 0, 100, 8, 315))) + "px";
        this.hslLightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.hslLightnessSlider02.style.border = "4px solid " + xcolor.getHsl(0, 0, map(parseInt(this.hslLightnessSliderCircleOut.style.left), 8, 322, 100, 90)).getHexString();
    }

    #updateHsbForm() {
        this.hsbHueInput.value = this.color.hsb.h;
        this.hsbSatInput.value = this.color.hsb.s;
        this.hsbBrightInput.value = this.color.hsb.b;

        this.hsbHsbInput.value = this.color.getHsbString();

        this.hsbFormPanelColor.style.backgroundColor = this.color.getRgbString();
    }

    #updateHsbPickers() {
        let wangle = this.color.hsb.h;
        let wdistance = map(this.color.hsb.b, 0, 100, 0, 175);

        let cos = Math.cos(wangle * Math.PI / 180);
        let sin = Math.sin(wangle * Math.PI / 180);
        let wx = 175 + (cos * wdistance);
        wx = wx - (12 * (Math.max(wx, 0.01) / 175));
        let wy = 175 + (sin * wdistance);
        wy = wy - (12 * (Math.max(wy, 0.01) / 175));

        this.hsbWheelSliderCircleOut.style.left = wx + "px";
        this.hsbWheelSliderCircleOut.style.top = wy + "px";

        this.hsbSaturationSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsb.s, 0, 100, 8, 315))) + "px";
        this.hsbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hsbBrightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, map(this.color.hsb.b, 0, 100, 8, 315))) + "px";
        this.hsbBrightnessSlider02.style.background = "linear-gradient(to right, rgb(255, 255, 255) 0%, " + this.color.getRgbString() + " 100%)";
    }

    #updateHtmlForm() {
        let htmlcolorName = Object.keys(xhtmlColors).find(name => xhtmlColors[name] === this.color.getHexString());
        if (htmlcolorName) {
            this.htmlcolor = { name: htmlcolorName, color: xhtmlColors[htmlcolorName] };
            this.hcformPanelColor.style.backgroundColor = this.htmlcolor.color;
            this.labelhcHtml.innerText = this.htmlcolor.name;
            this.copyIconhcHtml.style.display = "inherit";
        } else {
            this.htmlcolor = { name: '', color: '' };
            this.hcformPanelColor.style.backgroundColor = this.color.getHexString();
            this.labelhcHtml.innerText = "";
            this.copyIconhcHtml.style.display = "none";
        }

        this.hcRgbInput.value = this.color.getRgbString();
        this.hcHexInput.value = this.color.getHexString();
        this.hcHslInput.value = this.color.getHslString();
        this.hcHsbInput.value = this.color.getHsbString();
    }

    /**
     * Creates a color picker panel component
     * @return {HTMLDivElement} the color picker panel element
     */
    #createColorPickerPanel(event) {
        let _self = this;

        this.colorPickerDialog = document.createElement("dialog");
        this.colorPickerDialog.id = "favDialog";
        Object.assign(this.colorPickerDialog.style, {
            width: '672px',
            height: '672px',
            padding: '0px',
            border: '0px'
        });

        this.colorPickerForm = document.createElement("form");
        this.colorPickerForm.method = "dialog";

        this.colorPickerDialog.appendChild(this.colorPickerForm);

        this.colorPickerPanel = document.createElement('div');
        this.colorPickerPanel.id = "colorPickerPanel";
        Object.assign(this.colorPickerPanel.style, {
            position: 'absolute',
            /*left: event.clientX + 'px',
            top: event.clientY + 'px',*/
            width: '650px',
            height: '650px',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            border: '1px solid gray',
            borderRadius: '3px',
            backgroundColor: 'white',
        });
        this.colorPickerForm.appendChild(this.colorPickerPanel);

        this.tabPanel = document.createElement("div");
        this.tabPanel.className = "tab";
        Object.assign(this.tabPanel.style, {
            padding: '0px 0px 0px 0px !important',
            overflow: 'hidden',
            border: '1px solid #ccc',
            backgroundColor: '#f1f1f1',
        });

        this.rgbTab = document.createElement("button");
        this.rgbTab.type = "button";
        this.rgbTab.className = "tablinks active";
        this.rgbTab.tabPanel = "rgbPanel";
        this.rgbTab.innerText = "RGB/HEX";
        Object.assign(this.rgbTab.style, this.tabActiveStyle);
        this.rgbTab.onclick = function (event) {
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
            _self.#openTab(event, this);
        };
        this.tabPanel.appendChild(this.rgbTab);

        this.hslTab = document.createElement("button");
        this.hslTab.type = "button";
        this.hslTab.className = "tablinks";
        this.hslTab.tabPanel = "hslPanel";
        this.hslTab.innerText = "HSL";
        Object.assign(this.hslTab.style, this.tabStyle);
        this.hslTab.onclick = function (event) {
            _self.#updateHslForm();
            _self.#updateHslPickers();
            _self.#openTab(event, this);
        };
        this.tabPanel.appendChild(this.hslTab);

        this.hsbTab = document.createElement("button");
        this.hsbTab.type = "button";
        this.hsbTab.className = "tablinks";
        this.hsbTab.tabPanel = "hsbPanel";
        this.hsbTab.innerText = "HSB";
        Object.assign(this.hsbTab.style, this.tabStyle);
        this.hsbTab.onclick = function (event) {
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
            _self.#openTab(event, this);
        };
        this.tabPanel.appendChild(this.hsbTab);

        this.htmlTab = document.createElement("button");
        this.htmlTab.type = "button";
        this.htmlTab.className = "tablinks";
        this.htmlTab.tabPanel = "htmlPanel";
        this.htmlTab.innerText = "HTML";
        Object.assign(this.htmlTab.style, this.tabStyle);
        this.htmlTab.onclick = function (event) {
            _self.#updateHtmlForm();
            _self.#openTab(event, this);
        };
        this.tabPanel.appendChild(this.htmlTab);

        this.tablinks = [this.rgbTab, this.hslTab, this.hsbTab, this.htmlTab];
        for (var i = 0; i < this.tablinks.length; i++) {
            this.tablinks[i].onmouseover = function () {
                (this.className.indexOf("active") == -1) ? this.style.backgroundColor = "#ddd" : this.style.backgroundColor = "#ccc";
            }

            this.tablinks[i].onmouseout = function () {
                (this.className.indexOf("active") == -1) ? this.style.backgroundColor = "inherit" : this.style.backgroundColor = "#ccc";
            }
        }

        this.closeBtnPanel = document.createElement("div");
        Object.assign(this.closeBtnPanel.style, {
            float: "right",
            width: "24px",
            height: "24px",
            margin: "2px"
        });

        this.closeBtn = document.createElement("button");
        Object.assign(this.closeBtn.style, {
            width: "24px",
            height: "24px",
            padding: "0px",
            fontWeight: "900",
            color: "#353535",
            borderRadius: "3px",
        });
        this.closeBtn.innerText = "X";
        this.closeBtn.onclick = function () {
            _self.colorPickerDialog.close();
        }
        this.closeBtnPanel.appendChild(this.closeBtn);

        this.tabPanel.appendChild(this.closeBtnPanel);

        this.colorPickerPanel.appendChild(this.tabPanel);

        this.tabcontents = [];

        this.colorPickerPanel.appendChild(this.#createRgbPanel(true));
        this.colorPickerPanel.appendChild(this.#createHslPanel(false));
        this.colorPickerPanel.appendChild(this.#createHsbPanel(false));
        this.colorPickerPanel.appendChild(this.#createHtmlPanel(false));

        this.divCmdButtons = document.createElement("div");
        Object.assign(this.divCmdButtons.style, {
            width: "100%",
            height: "50px",
            alignContent: "end"
        });

        this.acceptBtn = document.createElement("button");
        this.acceptBtn.style.float = "right";
        this.acceptBtn.innerText = "Accept";
        this.acceptBtn.onclick = function () {
            _self.colorPickerDialog.returnValue = _self.color.getHexString();
            _self.colorPickerDialog.close();
        }
        this.divCmdButtons.appendChild(this.acceptBtn);
        this.colorPickerPanel.appendChild(this.divCmdButtons);

        return this.colorPickerPanel;
    }

    #createRgbPanel(isActive) {
        let _self = this;

        this.rgbPanel = document.createElement("div");
        this.rgbPanel.id = "rgbPanel";
        this.rgbPanel.className = "tabcontent";
        Object.assign(this.rgbPanel.style, this.tabcontentStyle);
        if (isActive) {
            this.rgbPanel.style.display = "";
            this.rgbTab.style.backgroundColor = "#ccc";
        }

        /// rgb form panel
        this.rgbFormPanel = this.#createFormPanel();
        this.rgbFormPanelColor = this.#createFormPanelColor();
        this.rgbFormPanel.appendChild(this.rgbFormPanelColor);

        ////////////RGB/////////////////////////////////

        this.rgbFormPanel.appendChild(this.rgbRedForm);
        this.rgbFormPanel.appendChild(this.rgbGreenForm);
        this.rgbFormPanel.appendChild(this.rgbBlueForm);
        this.rgbFormPanel.appendChild(this.rgbRgbForm);

        ////////////HEX/////////////////////////////////

        this.rgbFormPanel.appendChild(this.hexRedForm);
        this.rgbFormPanel.appendChild(this.hexGreenForm);
        this.rgbFormPanel.appendChild(this.hexBlueForm);
        this.rgbFormPanel.appendChild(this.hexHexForm);

        // form panel
        this.rgbPanel.appendChild(this.rgbFormPanel);

        ///////////////////////////////////////////////////

        this.rgbWheelPanelContainer = document.createElement("DIV");
        this.rgbWheelPanelContainer.className = "IroColorPicker";
        this.rgbWheelPanelContainer.style.display = "block";

        this.rgbWheelPanel = document.createElement("DIV");
        this.rgbWheelPanel.className = "IroWheel";
        Object.assign(this.rgbWheelPanel.style, {
            width: '350px',
            height: '350px',
            position: 'relative',
            overflow: 'visible',
            display: 'block'
        });
        this.rgbWheelPanel.style.backgroundColor = xcolor.getHsb(this.color.hsb.h, 100, 100).getRgbString();
        this.rgbWheelPanel.onclick = function (event) {
            if (event.target.className == "") return;
            let x = event.layerX - 13;
            let y = event.layerY - 13;

            _self.rgbWheelSliderCircleOut.style.left = x + "px";
            _self.rgbWheelSliderCircleOut.style.top = y + "px";

            _self.rgbSaturationSliderCircleOut.style.left = Math.max(8, Math.min(315, (map(x, 0, 350, 8, 315)))) + "px";
            _self.rgbLightSliderCircleOut.style.left = Math.max(8, Math.min(315, map(y, 0, 350, 315, 8))) + "px";

            _self.color = xcolor.getHsb(_self.color.hsb.h, map(parseInt(_self.rgbSaturationSliderCircleOut.style.left), 8, 315, 0, 100), map(parseInt(_self.rgbLightSliderCircleOut.style.left), 8, 315, 0, 100));
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };

        this.rgbWheelSliderCircleOut = this.#createCircle(250, 161);
        this.rgbWheelSliderCircleOut.style.zIndex = "9000";

        this.rgbWheelPanel.appendChild(this.rgbWheelSliderCircleOut);

        this.rgbWheelLight = document.createElement("DIV");
        this.rgbWheelLight.className = "IroWheelSat";
        Object.assign(this.rgbWheelLight.style, {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            background: 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)'
        });
        this.rgbWheelPanel.appendChild(this.rgbWheelLight);

        this.rgbWheelSat = document.createElement("DIV");
        this.rgbWheelSat.className = "IroWheelSaturation";
        Object.assign(this.rgbWheelSat.style, {
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            background: 'linear-gradient(to bottom, transparent 0%, #000 100%)'
        });
        this.rgbWheelPanel.appendChild(this.rgbWheelSat);

        this.rgbWheelPanelContainer.appendChild(this.rgbWheelPanel);

        let hueSlider = this.#createSlider();
        this.rgbHueSlider01 = hueSlider.slider01;
        this.rgbHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.rgbHueSlider02 = hueSlider.slider02;
        this.rgbHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.rgbHueSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.rgbHueSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsb(map(newleft, 8, 315, 0, 360), _self.color.hsb.s, _self.color.hsb.b);
            _self.rgbWheelPanel.style.backgroundColor = xcolor.getHsb(_self.color.hsb.h, 100, 100).getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        }
        this.rgbHueSlider01.appendChild(this.rgbHueSlider02);

        this.rgbHueSliderCircleOut = this.#createCircle(315, 8);
        this.rgbHueSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.rgbHueSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsb(map(parseInt(this.style.left), 8, 315, 0, 360), _self.color.hsb.s, _self.color.hsb.b);
                _self.rgbWheelPanel.style.backgroundColor = xcolor.getHsb(_self.color.hsb.h, 100, 100).getRgbString();
                _self.#updateRgbForm();
                _self.#updateRgbPickers();
            }
        }
        this.rgbHueSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.rgbHueSlider01.appendChild(this.rgbHueSliderCircleOut);
        this.rgbWheelPanelContainer.appendChild(this.rgbHueSlider01);

        let satSlider = this.#createSlider();
        this.rgbSaturationSlider01 = satSlider.slider01;
        this.rgbSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.rgbSaturationSlider02 = satSlider.slider02;
        this.rgbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.rgbSaturationSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.rgbSaturationSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsb(_self.color.hsb.h, map(newleft, 8, 315, 0, 100), _self.color.hsb.b);
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        }
        this.rgbSaturationSlider01.appendChild(this.rgbSaturationSlider02);

        this.rgbSaturationSliderCircleOut = this.#createCircle(315, 8);
        this.rgbSaturationSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.rgbSaturationSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsb(_self.color.hsb.h, map(parseInt(this.style.left), 8, 315, 0, 100), _self.color.hsb.b);
                _self.#updateRgbForm();
                _self.#updateRgbPickers();
            }
        }
        this.rgbSaturationSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.rgbSaturationSlider01.appendChild(this.rgbSaturationSliderCircleOut);
        this.rgbWheelPanelContainer.appendChild(this.rgbSaturationSlider01);

        let lightSlider = this.#createSlider();
        this.rgbLightSlider01 = lightSlider.slider01;
        this.rgbLightSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.rgbLightSlider02 = lightSlider.slider02;
        this.rgbLightSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.rgbLightSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.rgbLightSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsb(_self.color.hsb.h, _self.color.hsb.s, map(newleft, 8, 315, 0, 100));
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        }
        this.rgbLightSlider01.appendChild(this.rgbLightSlider02);

        this.rgbLightSliderCircleOut = this.#createCircle(315, 8);
        this.rgbLightSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.rgbLightSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsb(_self.color.hsb.h, _self.color.hsb.s, map(parseInt(this.style.left), 8, 315, 0, 100));
                _self.#updateRgbForm();
                _self.#updateRgbPickers();
            }
        }
        this.rgbLightSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.rgbLightSlider01.appendChild(this.rgbLightSliderCircleOut);
        this.rgbWheelPanelContainer.appendChild(this.rgbLightSlider01);
        /////////////////////////////////////////////////////

        this.rgbPanel.appendChild(this.rgbWheelPanelContainer);

        this.tabcontents.push(this.rgbPanel);

        return this.rgbPanel;
    }

    #createHslPanel(isActive) {
        let _self = this;

        this.hslPanel = document.createElement("div");
        this.hslPanel.id = "hslPanel";
        this.hslPanel.className = "tabcontent";
        Object.assign(this.hslPanel.style, this.tabcontentStyle);
        if (isActive) {
            this.hslPanel.style.display = "";
            this.hslTab.style.backgroundColor = "#ccc";
        }

        /// hsl form panel
        this.hslFormPanel = this.#createFormPanel();
        this.hslFormPanelColor = this.#createFormPanelColor();
        this.hslFormPanel.appendChild(this.hslFormPanelColor);

        ////////////HSL/////////////////////////////////

        this.hslFormPanel.appendChild(this.hslHueForm);
        this.hslFormPanel.appendChild(this.hslSatForm);
        this.hslFormPanel.appendChild(this.hslLightForm);
        this.hslFormPanel.appendChild(this.hslHslForm);

        // form panel
        this.hslPanel.appendChild(this.hslFormPanel);

        ///////////////////////////////////////////////////
        this.hslWheelPanelContainer = document.createElement("DIV");
        this.hslWheelPanelContainer.className = "IroColorPicker";
        this.hslWheelPanelContainer.style.display = "block";

        this.hslWheelPanel = document.createElement("DIV");
        this.hslWheelPanel.className = "IroWheel";
        Object.assign(this.hslWheelPanel.style, {
            width: "350px",
            height: "350px",
            position: "relative",
            overflow: "visible",
            display: "block",
        });
        this.hslWheelPanel.onclick = function (event) {
            if (event.target.className == "") return;
            let data = _self.#calculateWheelColor(event);
            _self.hslWheelSliderCircleOut.style.left = event.layerX - 13 + "px";
            _self.hslWheelSliderCircleOut.style.top = event.layerY - 13 + "px";

            _self.hslHueSliderCircleOut.style.left = Math.max(8, Math.min(315, (map(data.angle, 0, 360, 8, 315)))) + "px";
            _self.hslLightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, map(data.distance, 0, 175, 8, 315))) + "px";

            _self.color = xcolor.getHsl(data.angle, _self.color.hsl.s, map(data.distance, 0, 175, 0, 100));
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };

        this.hslWheelSliderCircleOut = this.#createCircle(250, 161);
        this.hslWheelSliderCircleOut.style.zIndex = "9000";

        this.hslWheelPanel.appendChild(this.hslWheelSliderCircleOut);

        this.hslWheelHue = document.createElement("div");
        this.hslWheelHue.className = "IroWheelHue";
        Object.assign(this.hslWheelHue.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxSizing: "border-box",
            transform: "rotateZ(90deg)",
            background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
        });
        this.hslWheelPanel.appendChild(this.hslWheelHue);

        this.hslWheelSat = document.createElement("div");
        this.hslWheelSat.className = "IroWheelSaturation";
        Object.assign(this.hslWheelSat.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxSizing: "border-box",
            background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 40%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%)",
        });
        this.hslWheelPanel.appendChild(this.hslWheelSat);

        this.hslWheelBorder = document.createElement("div");
        this.hslWheelBorder.className = "IroWheelBorder";
        Object.assign(this.hslWheelBorder.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxSizing: "border-box",
            border: "4px solid rgb(255, 255, 255)",
        });
        this.hslWheelPanel.appendChild(this.hslWheelBorder);

        this.hslWheelPanelContainer.appendChild(this.hslWheelPanel);

        let hueSlider = this.#createSlider();
        this.hslHueSlider01 = hueSlider.slider01;
        this.hslHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        
        this.hslHueSlider02 = hueSlider.slider02;
        this.hslHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.hslHueSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.hslHueSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsl(map(newleft, 8, 315, 0, 360), _self.color.hsl.s, _self.color.hsl.l);
            _self.#updateHslForm();
            _self.#updateHslPickers();
        }
        this.hslHueSlider01.appendChild(this.hslHueSlider02);

        this.hslHueSliderCircleOut = this.#createCircle(315, 8);
        this.hslHueSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.hslHueSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsl(map(parseInt(this.style.left), 8, 315, 0, 360), _self.color.hsl.s, _self.color.hsl.l);
                _self.#updateHslForm();
                _self.#updateHslPickers();
            }
        }
        this.hslHueSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hslHueSlider01.appendChild(this.hslHueSliderCircleOut);
        this.hslWheelPanelContainer.appendChild(this.hslHueSlider01);

        let satSlider = this.#createSlider();
        this.hslSaturationSlider01 = satSlider.slider01;
        this.hslSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hslSaturationSlider02 = satSlider.slider02;
        this.hslSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hslSaturationSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.hslSaturationSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsl(_self.color.hsl.h, map(newleft, 8, 315, 0, 100), _self.color.hsl.l);
            _self.#updateHslForm();
            _self.#updateHslPickers();
        }
        this.hslSaturationSlider01.appendChild(this.hslSaturationSlider02);

        this.hslSaturationSliderCircleOut = this.#createCircle(315, 8);
        this.hslSaturationSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.hslSaturationSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsl(_self.color.hsl.h, map(parseInt(this.style.left), 8, 315, 0, 100), _self.color.hsl.l);
                _self.#updateHslForm();
                _self.#updateHslPickers();
            }
        }
        this.hslSaturationSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hslSaturationSlider01.appendChild(this.hslSaturationSliderCircleOut);
        this.hslWheelPanelContainer.appendChild(this.hslSaturationSlider01);

        let lightSlider = this.#createSlider();
        this.hslLightnessSlider01 = lightSlider.slider01;
        this.hslLightnessSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hslLightnessSlider02 = lightSlider.slider02;
        this.hslLightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.hslLightnessSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.hslLightnessSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsl(_self.color.hsl.h, _self.color.hsl.s, map(newleft, 8, 315, 0, 100));
            _self.#updateHslForm();
            _self.#updateHslPickers();
        }
        this.hslLightnessSlider01.appendChild(this.hslLightnessSlider02);

        this.hslLightnessSliderCircleOut = this.#createCircle(154, 8);
        this.hslLightnessSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.hslLightnessSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsl(_self.color.hsl.h, _self.color.hsl.s, map(parseInt(this.style.left), 8, 315, 0, 100));
                _self.#updateHslForm();
                _self.#updateHslPickers();
            }
        }
        this.hslLightnessSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hslLightnessSlider01.appendChild(this.hslLightnessSliderCircleOut);
        this.hslWheelPanelContainer.appendChild(this.hslLightnessSlider01);
        /////////////////////////////////////////////////////

        this.hslPanel.appendChild(this.hslWheelPanelContainer);

        this.tabcontents.push(this.hslPanel);

        return this.hslPanel;
    }

    #createHsbPanel(isActive) {
        let _self = this;

        this.hsbPanel = document.createElement("div");
        this.hsbPanel.id = "hsbPanel";
        this.hsbPanel.className = "tabcontent";
        Object.assign(this.hsbPanel.style, this.tabcontentStyle);
        if (isActive) {
            this.style.display = "";
            this.hsbTab.style.backgroundColor = "#ccc";
        }

        /// hsl form panel
        this.hsbFormPanel = this.#createFormPanel();
        this.hsbFormPanelColor = this.#createFormPanelColor();
        this.hsbFormPanel.appendChild(this.hsbFormPanelColor);

        ////////////HSL/////////////////////////////////

        this.hsbFormPanel.appendChild(this.hsbHueForm);
        this.hsbFormPanel.appendChild(this.hsbSatForm);
        this.hsbFormPanel.appendChild(this.hsbBrightForm);
        this.hsbFormPanel.appendChild(this.hsbHsbForm);

        // form panel
        this.hsbPanel.appendChild(this.hsbFormPanel);

        ///////////////////////////////////////////////////

        this.hsbWheelPanelContainer = document.createElement("div");
        this.hsbWheelPanelContainer.className = "IroColorPicker";
        this.hsbWheelPanelContainer.style.display = "block";

        this.hsbWheelPanel = document.createElement("div");
        this.hsbWheelPanel.className = "IroWheel";
        Object.assign(this.hsbWheelPanel.style, {
            width: "350px",
            height: "350px",
            position: "relative",
            overflow: "visible",
            display: "block"
        });
        this.hsbWheelPanel.onclick = function (event) {
            if (event.target.className == "") return;
            let data = _self.#calculateWheelColor(event);
            _self.hsbWheelSliderCircleOut.style.left = event.layerX - 13 + "px";
            _self.hsbWheelSliderCircleOut.style.top = event.layerY - 13 + "px";

            _self.hsbHueSliderCircleOut.style.left = Math.max(8, Math.min(315, (map(data.angle, 0, 360, 8, 315)))) + "px";
            _self.hsbBrightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, map(data.distance, 0, 175, 8, 315))) + "px";

            _self.color = xcolor.getHsl(data.angle, _self.color.hsb.s, map(data.distance, 0, 175, 0, 100));
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };

        this.hsbWheelSliderCircleOut = this.#createCircle(250, 161);
        this.hsbWheelSliderCircleOut.style.zIndex = "9000";

        this.hsbWheelPanel.appendChild(this.hsbWheelSliderCircleOut);

        this.hsbWheelHue = document.createElement("div");
        this.hsbWheelHue.className = "IroWheelHue";
        Object.assign(this.hsbWheelHue.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxSizing: "border-box",
            transform: "rotateZ(90deg)",
            background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
        });
        this.hsbWheelPanel.appendChild(this.hsbWheelHue);

        this.hsbWheelSat = document.createElement("div");
        this.hsbWheelSat.className = "IroWheelSaturation";
        Object.assign(this.hsbWheelSat.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxSizing: "border-box",
            background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 40%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%)"
        });
        this.hsbWheelPanel.appendChild(this.hsbWheelSat);

        this.hsbWheelBorder = document.createElement("div");
        this.hsbWheelBorder.className = "IroWheelBorder";
        Object.assign(this.hsbWheelBorder.style, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxSizing: "border-box",
            border: "4px solid rgb(255, 255, 255)"
        });
        this.hsbWheelPanel.appendChild(this.hsbWheelBorder);

        this.hsbWheelPanelContainer.appendChild(this.hsbWheelPanel);

        let hueSlider = this.#createSlider();
        this.hsbHueSlider01 = hueSlider.slider01;
        this.hsbHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hsbHueSlider02 = hueSlider.slider02;
        this.hsbHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.hsbHueSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.hsbHueSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsb(map(newleft, 8, 315, 0, 360), _self.color.hsb.s, _self.color.hsb.b);
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        }
        this.hsbHueSlider01.appendChild(this.hsbHueSlider02);

        this.hsbHueSliderCircleOut = this.#createCircle(315, 8);
        this.hsbHueSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.hsbHueSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsb(map(parseInt(this.style.left), 8, 315, 0, 360), _self.color.hsb.s, _self.color.hsb.b);
                _self.#updateHsbForm();
                _self.#updateHsbPickers();
            }
        }
        this.hsbHueSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hsbHueSlider01.appendChild(this.hsbHueSliderCircleOut);
        this.hsbWheelPanelContainer.appendChild(this.hsbHueSlider01);

        let satSlider = this.#createSlider();
        this.hsbSaturationSlider01 = satSlider.slider01;
        this.hsbSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hsbSaturationSlider02 = satSlider.slider02;
        this.hsbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hsbSaturationSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.hsbSaturationSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsb(_self.color.hsb.h, map(newleft, 8, 315, 0, 100), _self.color.hsb.b);
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        }
        this.hsbSaturationSlider01.appendChild(this.hsbSaturationSlider02);

        this.hsbSaturationSliderCircleOut = this.#createCircle(315, 8);
        this.hsbSaturationSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.hsbSaturationSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsb(_self.color.hsb.h, map(parseInt(this.style.left), 8, 315, 0, 100), _self.color.hsb.b);
                _self.#updateHsbForm();
                _self.#updateHsbPickers();
            }
        }
        this.hsbSaturationSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hsbSaturationSlider01.appendChild(this.hsbSaturationSliderCircleOut);
        this.hsbWheelPanelContainer.appendChild(this.hsbSaturationSlider01);

        let brightSlider = this.#createSlider();
        this.hsbBrightnessSlider01 = brightSlider.slider01;
        this.hsbBrightnessSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hsbBrightnessSlider02 = brightSlider.slider02;
        this.hsbBrightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.hsbBrightnessSlider02.onclick = function (e) {
            let newleft = e.layerX - 13;
            _self.hsbBrightnessSliderCircleOut.style.left = newleft + "px";
            _self.color = xcolor.getHsb(_self.color.hsb.h, _self.color.hsb.s, map(newleft, 8, 315, 0, 100));
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        }
        this.hsbBrightnessSlider01.appendChild(this.hsbBrightnessSlider02);

        this.hsbBrightnessSliderCircleOut = this.#createCircle(315, 8);
        this.hsbBrightnessSliderCircleOut.onmousedown = function (e) {
            this.isDragging = true;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        };
        this.hsbBrightnessSliderCircleOut.onmousemove = function (e) {
            if (this.isDragging) {
                let newleft = (e.clientX > this.initDragPosition.x) ? this.initialPosition.x + (e.clientX - this.initDragPosition.x) : this.initialPosition.x - (this.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                this.style.left = newleft + "px";

                _self.color = xcolor.getHsb(_self.color.hsb.h, _self.color.hsb.s, map(parseInt(this.style.left), 8, 315, 0, 100));
                _self.#updateHsbForm();
                _self.#updateHsbPickers();
            }
        }
        this.hsbBrightnessSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hsbBrightnessSlider01.appendChild(this.hsbBrightnessSliderCircleOut);
        this.hsbWheelPanelContainer.appendChild(this.hsbBrightnessSlider01);
        /////////////////////////////////////////////////////

        this.hsbPanel.appendChild(this.hsbWheelPanelContainer);

        this.tabcontents.push(this.hsbPanel);

        return this.hsbPanel;
    }

    #createHtmlPanel(isActive) {
        let _self = this;
        this.htmlPanel = document.createElement("div");
        this.htmlPanel.id = "htmlPanel";
        this.htmlPanel.className = "tabcontent";
        Object.assign(this.htmlPanel.style, this.tabcontentStyle);
        if (isActive) {
            this.htmlPanel.style.display = "";
            this.htmlTab.style.backgroundColor = "#ccc";
        }

        /// rgb form panel
        this.hcFormPanel = this.#createFormPanel();
        this.hcformPanelColor = this.#createFormPanelColor();
        this.hcFormPanel.appendChild(this.hcformPanelColor);

        this.hcformHTML = document.createElement("div");
        Object.assign(this.hcformHTML.style, {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '18px',
            fontFamily: 'monospace'
        });

        this.labelhcHtml = document.createElement("label");
        this.labelhcHtml.for = "rgbStr";
        this.labelhcHtml.innerText = "RGB";
        Object.assign(this.labelhcHtml.style, {
            fontFamily: 'monospace',
            fontSize: '1.2em'
        });
        this.labelhcHtml.innerText = this.htmlcolor != null ? this.htmlcolor.value : "";

        this.hcformHTML.appendChild(this.labelhcHtml);

        this.copyIconhcHtml = document.createElement('button');
        this.copyIconhcHtml.type = 'button';
        Object.assign(this.copyIconhcHtml.style, {
            width: '24px',
            height: '24px',
            padding: '0px'
        })
        this.copyIconhcHtml.innerHTML = this.#copyIcon;
        this.copyIconhcHtml.onclick = function () { navigator.clipboard.writeText(_self.labelhcHtml.innerText); }
        this.hcformHTML.appendChild(this.copyIconhcHtml);

        this.hcFormPanel.appendChild(this.hcformHTML);

        this.hcRgbForm = (function(){let _rgbRgbForm = this.rgbRgbForm.cloneNode(true); _rgbRgbForm.childNodes[1].disabled = true; _rgbRgbForm.childNodes[1].style.backgroundColor='white'; return _rgbRgbForm;}).call(this);
        this.hcHexForm = (function(){let _hexHexForm = this.hexHexForm.cloneNode(true); _hexHexForm.childNodes[1].disabled = true; _hexHexForm.childNodes[1].style.backgroundColor='white'; return _hexHexForm;}).call(this);
        this.hcHslForm = (function(){let _hslHslForm = this.hslHslForm.cloneNode(true); _hslHslForm.childNodes[1].disabled = true; _hslHslForm.childNodes[1].style.backgroundColor='white'; return _hslHslForm;}).call(this);
        this.hcHsbForm = (function(){let _hsbHsbForm = this.hsbHsbForm.cloneNode(true); _hsbHsbForm.childNodes[1].disabled = true; _hsbHsbForm.childNodes[1].style.backgroundColor='white'; return _hsbHsbForm;}).call(this);

        this.hcRgbInput = this.hcRgbForm.childNodes[1];
        this.hcHexInput = this.hcHexForm.childNodes[1];
        this.hcHslInput = this.hcHslForm.childNodes[1];
        this.hcHsbInput = this.hcHsbForm.childNodes[1];

        this.hcFormPanel.appendChild(this.hcRgbForm);
        this.hcFormPanel.appendChild(this.hcHexForm);
        this.hcFormPanel.appendChild(this.hcHslForm);
        this.hcFormPanel.appendChild(this.hcHsbForm);

        this.htmlPanel.appendChild(this.hcFormPanel);

        /////////////////HTML COLORS///////////////////////

        this.htmlBoardPanel = document.createElement("div");
        Object.assign(this.htmlBoardPanel.style, {
            padding: '5px',
            float: "left",
            width: "300px",
            height: "520px",
            backgroundColor: "rgb(241, 241, 241)",
            border: "1px solid #ccc",
            borderRadius: "4px"
        });

        this.htmlSectionPanel = document.createElement("section");
        Object.assign(this.htmlSectionPanel.style, {
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(14, 1fr)'
        });

        this.htmlBoardPanel.appendChild(this.htmlSectionPanel);

        for (let i = 0; i < Object.keys(xhtmlColors).length; i++) {
            let htmlBoxPanel = document.createElement("div");
            htmlBoxPanel.title = (Object.keys(xhtmlColors)[i]);
            Object.assign(htmlBoxPanel.style, {
                backgroundColor: xhtmlColors[(Object.keys(xhtmlColors)[i])],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '30px'
            });
            htmlBoxPanel.onclick = function () {
                _self.color = xcolor.getXcolor(this.style.backgroundColor);
                _self.htmlcolor = { name: this.title, color: this.style.backgroundColor };
                _self.#updateHtmlForm();
                _self.#updateRgbForm();
                _self.#updateRgbPickers();
                _self.#updateHslForm();
                _self.#updateHslPickers();
                _self.#updateHsbForm();
                _self.#updateHsbPickers();
            };
            this.htmlSectionPanel.appendChild(htmlBoxPanel);
        }

        this.htmlPanel.appendChild(this.htmlBoardPanel);

        this.tabcontents.push(this.htmlPanel);

        return this.htmlPanel;
    }

}