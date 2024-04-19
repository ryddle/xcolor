const xcolorPickermap = function (value, x1, y1, x2, y2) {
    const nv = Math.round((value - x1) * (y2 - x2) / (y1 - x1) + x2);
    return (x2 > y2) ? Math.min(Math.max(nv, y2), x2) : Math.max(Math.min(nv, y2), x2);
}

class xcolorPicker {

    constructor(event, colorCode) {
        this.color = xcolor.getXcolor('#ff0000');
        if (colorCode !== undefined) {
            this.color = xcolor.getXcolor(colorCode);
        }

        this.tabcontentStyle = {
            display: 'none',
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderTop: 'none'
        };

        this.createColorPickerPanel(event);

        this.updateHslForm();
        this.updateHslPickers();
        this.updateHsbForm();
        this.updateHsbPickers();


        return this.colorPickerPanel;
    }

    openTab(evt, tab) {
        var i, tabcontent;
        for (i = 0; i < this.tabcontents.length; i++) {
            this.tabcontents[i].style.display = "none";
        }
        for (i = 0; i < this.tablinks.length; i++) {
            this.tablinks[i].style.backgroundColor = "inherit";
        }
        tabcontent = this.tabcontents.find(element => element.id == tab.tabPanel);
        tabcontent.style.display = "block";
        tab.className += " active";
        tab.style.backgroundColor = "#ccc";
    }

    calculateWheelColor(event) {
        var cx = 175;
        var cy = 175;
        var radius = 175;

        var x = event.layerX - cx;
        var y = event.layerY - cy;
        var theta = Math.atan2(y, x);

        var angle = Math.round((theta * 180 / Math.PI + 360) % 360);
        var distance = Math.sqrt(x * x + y * y);
        //console.log(angle, distance);
        return { angle: angle, distance: distance };
    }

    updateHslForm() {
        //this.color = xcolor.getXcolor('hsl(' + this.hslHue + ', ' + this.hslSat + '%, ' + this.hslLight + '%)');

        this.inputHslHue.value = this.color.hsl.h;
        this.inputHslSat.value = this.color.hsl.s;
        this.inputHslLightness.value = this.color.hsl.l;

        this.inputHsl.value = this.color.getHslString();//'hsl(' + this.hslHue + ', ' + this.hslSat + '%, ' + this.hslLight + '%)';

        this.hslformHslColor.style.backgroundColor = this.color.getRgbString();
    }

    updateHslPickers() {
        let wangle = this.color.hsl.h;
        let wdistance = xcolorPickermap(this.color.hsl.l, 0, 100, 0, 175);

        let cos = Math.cos(wangle * Math.PI / 180);
        let sin = Math.sin(wangle * Math.PI / 180);
        let wx = 175 + (cos * wdistance)// + ((cos>0)?(24*-1):0);
        wx = wx - (12 * (Math.max(wx, 0.01) / 175));
        let wy = 175 + (sin * wdistance);// + ((sin>0)?(24*-1):0);
        wy = wy - (12 * (Math.max(wy, 0.01) / 175));

        this.hslWheelSliderCircleOut.style.left = wx + "px";
        this.hslWheelSliderCircleOut.style.top = wy + "px";

        this.hslSaturationSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(this.color.hsl.s, 0, 100, 8, 315))) + "px";
        this.hslSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hslLightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(this.color.hsl.l, 0, 100, 8, 315))) + "px";
        this.hslLightnessSlider02.style.background = "linear-gradient(to right, rgb(255, 255, 255) 0%, " + this.color.getRgbString() + " 100%)";
    }

    updateHsbForm() {
        //this.color = xcolor.getXcolor('hsb(' + this.hsbHue + ', ' + this.hsbSat + '%, ' + this.hsbBright + '%)');

        this.inputHsbHue.value = this.color.hsb.h;
        this.inputHsbSat.value = this.color.hsb.s;
        this.inputHsbBrightness.value = this.color.hsb.b;

        this.inputHsb.value = this.color.getHsbString();//'hsb(' + this.hsbHue + ', ' + this.hsbSat + '%, ' + this.hsbBright + '%)';

        this.hsbformHsbColor.style.backgroundColor = this.color.getRgbString();
    }

    updateHsbPickers() {
        let wangle = this.color.hsb.h;
        let wdistance = xcolorPickermap(this.color.hsb.b, 0, 100, 0, 175);

        let cos = Math.cos(wangle * Math.PI / 180);
        let sin = Math.sin(wangle * Math.PI / 180);
        let wx = 175 + (cos * wdistance)// + ((cos>0)?(24*-1):0);
        wx = wx - (12 * (Math.max(wx, 0.01) / 175));
        let wy = 175 + (sin * wdistance);// + ((sin>0)?(24*-1):0);
        wy = wy - (12 * (Math.max(wy, 0.01) / 175));

        this.hsbWheelSliderCircleOut.style.left = wx + "px";
        this.hsbWheelSliderCircleOut.style.top = wy + "px";

        this.hsbSaturationSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(this.color.hsb.s, 0, 100, 8, 315))) + "px";
        this.hsbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hsbBrightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(this.color.hsb.b, 0, 100, 8, 315))) + "px";
        this.hsbBrightnessSlider02.style.background = "linear-gradient(to right, rgb(255, 255, 255) 0%, " + this.color.getRgbString() + " 100%)";
    }

    /**
     * Creates a color picker panel component
     * @return {HTMLDivElement} the color picker panel element
     */
    createColorPickerPanel(event) {
        let _self = this;

        this.colorPickerPanel = document.createElement('div');
        this.colorPickerPanel.id = "colorPickerPanel";
        Object.assign(this.colorPickerPanel.style, {
            position: 'absolute',
            left: event.clientX + 'px',
            top: event.clientY + 'px',
            width: '650px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            border: '1px solid gray',
            borderRadius: '3px',
            backgroundColor: 'white',
        });

        this.tabPanel = document.createElement("div");
        this.tabPanel.className = "tab";
        Object.assign(this.tabPanel.style, {
            padding: '0px 0px 0px 0px !important',
            overflow: 'hidden',
            border: '1px solid #ccc',
            backgroundColor: '#f1f1f1',
        });

        const tablinksStyle = {
            backgroundColor: 'inherit',
            float: 'left',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            padding: '14px 16px',
            transition: '0.3s',
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#444'
        }

        this.rgbTab = document.createElement("button");
        this.rgbTab.className = "tablinks active";
        this.rgbTab.tabPanel = "rgbPanel";
        this.rgbTab.innerText = "RGB";
        Object.assign(this.rgbTab.style, tablinksStyle);
        this.rgbTab.onclick = function (event) { _self.openTab(event, this); };
        this.tabPanel.appendChild(this.rgbTab);

        this.hexTab = document.createElement("button");
        this.hexTab.className = "tablinks";
        this.hexTab.tabPanel = "hexPanel";
        this.hexTab.innerText = "HEX";
        Object.assign(this.hexTab.style, tablinksStyle);
        this.hexTab.onclick = function (event) { _self.openTab(event, this); };
        this.tabPanel.appendChild(this.hexTab);

        this.hslTab = document.createElement("button");
        this.hslTab.className = "tablinks";
        this.hslTab.tabPanel = "hslPanel";
        this.hslTab.innerText = "HSL";
        Object.assign(this.hslTab.style, tablinksStyle);
        this.hslTab.onclick = function (event) {
            _self.updateHslForm();
            _self.updateHslPickers();
            _self.openTab(event, this);
        };
        this.tabPanel.appendChild(this.hslTab);

        this.hsbTab = document.createElement("button");
        this.hsbTab.className = "tablinks";
        this.hsbTab.tabPanel = "hsbPanel";
        this.hsbTab.innerText = "HSB";
        Object.assign(this.hsbTab.style, tablinksStyle);
        this.hsbTab.onclick = function (event) { _self.openTab(event, this); };
        this.tabPanel.appendChild(this.hsbTab);

        this.tablinks = [this.rgbTab, this.hexTab, this.hslTab, this.hsbTab];
        for (var i = 0; i < this.tablinks.length; i++) {
            this.tablinks[i].onmouseover = function () {
                (this.className.indexOf("active") == -1) ? this.style.backgroundColor = "#ddd" : this.style.backgroundColor = "#ccc";
            }

            this.tablinks[i].onmouseout = function () {
                (this.className.indexOf("active") == -1) ? this.style.backgroundColor = "inherit" : this.style.backgroundColor = "#ccc";
            }
        }

        this.closeBtnPanel = document.createElement("div");
        this.closeBtnPanel.style.float = "right";
        this.closeBtnPanel.style.width = "24px";
        this.closeBtnPanel.style.height = "24px";
        this.closeBtnPanel.style.margin = "2px";

        this.closeBtn = document.createElement("button");
        this.closeBtn.style.width = "24px";
        this.closeBtn.style.height = "24px";
        this.closeBtn.style.padding = "0px";
        this.closeBtn.style.fontWeight = "900";
        this.closeBtn.style.color = "#353535";
        this.closeBtn.style.borderRadius = "3px";
        this.closeBtn.innerText = "X";
        this.closeBtn.onclick = function () {
            colorPickerPanel.remove();
        }
        this.closeBtnPanel.appendChild(this.closeBtn);

        this.tabPanel.appendChild(this.closeBtnPanel);

        this.colorPickerPanel.appendChild(this.tabPanel);

        this.tabcontents = [];

        this.colorPickerPanel.appendChild(this.createRgbPanel(true));

        this.colorPickerPanel.appendChild(this.createHexPanel(false));

        this.colorPickerPanel.appendChild(this.createHslPanel(false));

        this.colorPickerPanel.appendChild(this.createHsbPanel(false));

        return this.colorPickerPanel;
    }

    createRgbPanel(isActive) {
        let _self = this;

        this.rgbPanel = document.createElement("div");
        this.rgbPanel.id = "rgbPanel";
        this.rgbPanel.className = "tabcontent";
        Object.assign(this.rgbPanel.style, this.tabcontentStyle);
        //this.rgbPanel.innerText = "RGB";
        if (isActive) {
            this.rgbPanel.style.display = "";
            this.rgbTab.style.backgroundColor = "#ccc";
        }

        /// rgb form panel
        this.rgbFormPanel = document.createElement("div");
        Object.assign(this.rgbFormPanel.style, {
            padding: '5px',
            float: "right",
            width: "220px",
            height: "520px",
            backgroundColor: "rgb(241, 241, 241)",
            border: "1px solid #ccc",
            borderRadius: "4px"
        });

        this.rgbformRgbColor = document.createElement("div");
        this.rgbformRgbColor.style.display = 'flex';
        this.rgbformRgbColor.style.flexDirection = 'row';
        this.rgbformRgbColor.style.backgroundColor = this.color.getRgbString();
        this.rgbformRgbColor.style.height = "50px";
        this.rgbformRgbColor.style.width = "100%";
        this.rgbformRgbColor.style.border = "1px solid #ccc";
        this.rgbformRgbColor.style.borderRadius = "4px";
        this.rgbformRgbColor.style.marginBottom = "10px";
        this.rgbFormPanel.appendChild(this.rgbformRgbColor);

        const labelsStyle = {
            fontFamily: 'monospace',
            fontSize: '1.2em'
        };

        const inputsStyle = {
            width: "60px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginBottom: '10px'
        };

        this.rgbformRed = document.createElement("div");
        this.rgbformRed.style.display = 'flex';
        this.rgbformRed.style.flexDirection = 'row';
        this.rgbformRed.style.alignItems = 'center';
        this.rgbformRed.style.justifyContent = 'space-between';
        this.rgbFormPanel.appendChild(this.rgbformRed);

        this.labelRgbRed = document.createElement("label");
        this.labelRgbRed.for = "rgbRed";
        this.labelRgbRed.innerText = "Red";
        Object.assign(this.labelRgbRed.style, labelsStyle);
        this.rgbformRed.appendChild(this.labelRgbRed);

        this.inputRgbRed = document.createElement("input");
        this.inputRgbRed.id = "rgbRed";
        this.inputRgbRed.type = "number";
        this.inputRgbRed.min = "0";
        this.inputRgbRed.max = "360";
        this.inputRgbRed.value = this.color.rgb.r;
        Object.assign(this.inputRgbRed.style, inputsStyle);
        this.inputRgbRed.onchange = function () {
            _self.rgbRed = this.value;
            _self.updateRgbForm();
            _self.updateRgbPickers();
        }
        this.rgbformRed.appendChild(this.inputRgbRed);

        this.rgbformGreen = document.createElement("div");
        this.rgbformGreen.style.display = 'flex';
        this.rgbformGreen.style.flexDirection = 'row';
        this.rgbformGreen.style.alignItems = 'center';
        this.rgbformGreen.style.justifyContent = 'space-between';
        this.rgbFormPanel.appendChild(this.rgbformGreen);

        this.labelRgbGreen = document.createElement("label");
        this.labelRgbGreen.for = "rgbGreen";
        this.labelRgbGreen.innerText = "Green";
        Object.assign(this.labelRgbGreen.style, labelsStyle);
        this.rgbformGreen.appendChild(this.labelRgbGreen);

        this.inputRgbGreen = document.createElement("input");
        this.inputRgbGreen.id = "rgbGreen";
        this.inputRgbGreen.type = "number";
        this.inputRgbGreen.value = this.color.rgb.g;
        this.inputRgbGreen.min = "0";
        this.inputRgbGreen.max = "100";
        Object.assign(this.inputRgbGreen.style, inputsStyle);
        this.inputRgbGreen.onchange = function () {
            _self.rgbGreen = this.value;
            _self.updateRgbForm();
            _self.updateRgbPickers();
        }
        this.rgbformGreen.appendChild(this.inputRgbGreen);

        this.rgbformBlue = document.createElement("div");
        this.rgbformBlue.style.display = 'flex';
        this.rgbformBlue.style.flexDirection = 'row';
        this.rgbformBlue.style.alignItems = 'center';
        this.rgbformBlue.style.justifyContent = 'space-between';
        this.rgbFormPanel.appendChild(this.rgbformBlue);

        this.labelRgbBlue = document.createElement("label");
        this.labelRgbBlue.for = "rgbBlue";
        this.labelRgbBlue.innerText = "Blue";
        Object.assign(this.labelRgbBlue.style, labelsStyle);
        this.rgbformBlue.appendChild(this.labelRgbBlue);

        this.inputRgbBlue = document.createElement("input");
        this.inputRgbBlue.id = "rgbBlue";
        this.inputRgbBlue.type = "number";
        this.inputRgbBlue.value = this.color.rgb.b;
        this.inputRgbBlue.min = "0";
        this.inputRgbBlue.max = "100";
        Object.assign(this.inputRgbBlue.style, inputsStyle);
        this.inputRgbBlue.onchange = function () {
            _self.rgbBlue = this.value;
            _self.updateRgbForm();
            _self.updateRgbPickers();
        }
        this.rgbformBlue.appendChild(this.inputRgbBlue);

        this.rgbformRGB = document.createElement("div");
        this.rgbformRGB.style.display = 'flex';
        this.rgbformRGB.style.flexDirection = 'row';
        this.rgbformRGB.style.alignItems = 'center';
        this.rgbformRGB.style.justifyContent = 'space-between';
        this.rgbFormPanel.appendChild(this.rgbformRGB);

        this.labelRgb = document.createElement("label");
        this.labelRgb.for = "rgbStr";
        this.labelRgb.innerText = "RGB";
        Object.assign(this.labelRgb.style, labelsStyle);
        this.rgbformRGB.appendChild(this.labelRgb);

        this.inputRgb = document.createElement("input");
        this.inputRgb.id = "rgbStr";
        this.inputRgb.type = "text";
        this.inputRgb.value = this.color.getRgbString();
        Object.assign(this.inputRgb.style, {
            width: "160px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginTop: '10px',
            marginBottom: '10px'
        });
        this.inputRgb.onchange = function () {
            let rgbColor = xcolor.getXcolor(this.value);
            _self.rgbRed = rgbColor.rgb.r;
            _self.rgbGreen = rgbColor.rgb.g;
            _self.rgbBlue = rgbColor.rgb.b;
            _self.updateRgbPickers();
            _self.updateRgbForm();
        }
        this.rgbformRGB.appendChild(this.inputRgb);

        this.copyIconRgb = document.createElement('button');
        Object.assign(this.copyIconRgb.style, {
            width: '24px',
            height: '24px',
            padding: '0px'
        })
        this.copyIconRgb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#454545"></path> </g></svg>';
        this.copyIconRgb.onclick = function () { navigator.clipboard.writeText(_self.inputRgb.value); }
        this.rgbformRGB.appendChild(this.copyIconRgb);

        this.rgbPanel.appendChild(this.rgbFormPanel);

        ///////////////////////////////////////////////////

        this.rgbWheelPanelContainer = document.createElement("DIV");
        this.rgbWheelPanelContainer.className = "IroColorPicker";
        this.rgbWheelPanelContainer.style.display = "block";

        this.rgbWheelPanel = document.createElement("DIV");
        this.rgbWheelPanel.className = "IroWheel";
        this.rgbWheelPanel.style.width = "350px";
        this.rgbWheelPanel.style.height = "350px";
        this.rgbWheelPanel.style.position = "relative";
        this.rgbWheelPanel.style.overflow = "visible";
        this.rgbWheelPanel.style.display = "block";
        this.rgbWheelPanel.style.backgroundColor = this.color.getRgbString();
        this.rgbWheelPanel.onclick = function (event) {
            if (event.target.className == "") return;
            //console.log(event);
            //let data = _self.calculateWheelColor(event);
            _self.rgbWheelSliderCircleOut.style.left = event.layerX - 13 + "px";
            _self.rgbWheelSliderCircleOut.style.top = event.layerY - 13 + "px";

            _self.rgbSatSliderCircleOut.style.left = Math.max(8, Math.min(315, (xcolorPickermap(data.angle, 0, 360, 8, 315)))) + "px";

            _self.rgbLightSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(data.distance, 0, 175, 8, 315))) + "px";


            _self.rgbRed = data.angle;
            _self.rgbBlue = xcolorPickermap(data.distance, 0, 175, 0, 100);
            _self.updateRgbForm();
            _self.updateRgbPickers();
        };

        this.rgbWheelSliderCircleOut = document.createElement("div");
        this.rgbWheelSliderCircleOut.style.border = "2px solid #444";
        this.rgbWheelSliderCircleOut.style.borderRadius = "13px";
        this.rgbWheelSliderCircleOut.style.willChange = "transform";
        this.rgbWheelSliderCircleOut.style.top = "161px";
        this.rgbWheelSliderCircleOut.style.left = "250px";
        this.rgbWheelSliderCircleOut.style.width = "24px";
        this.rgbWheelSliderCircleOut.style.height = "24px";
        this.rgbWheelSliderCircleOut.style.position = "absolute";
        this.rgbWheelSliderCircleOut.style.overflow = "visible";
        this.rgbWheelSliderCircleOut.style.zIndex = "9000";

        this.rgbWheelSliderCircleIn = document.createElement("div");
        this.rgbWheelSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.rgbWheelSliderCircleIn.style.borderRadius = "12px";
        this.rgbWheelSliderCircleIn.style.top = "-0px";
        this.rgbWheelSliderCircleIn.style.left = "-0px";
        this.rgbWheelSliderCircleIn.style.width = "20px";
        this.rgbWheelSliderCircleIn.style.height = "20px";
        this.rgbWheelSliderCircleIn.style.position = "absolute";
        this.rgbWheelSliderCircleIn.style.overflow = "visible";
        this.rgbWheelSliderCircleOut.appendChild(this.rgbWheelSliderCircleIn);

        this.rgbWheelPanel.appendChild(this.rgbWheelSliderCircleOut);

        this.rgbWheelLight = document.createElement("DIV");
        this.rgbWheelLight.className = "IroWheelSat";
        this.rgbWheelLight.style.position = "absolute";
        this.rgbWheelLight.style.top = "0px";
        this.rgbWheelLight.style.left = "0px";
        this.rgbWheelLight.style.width = "100%";
        this.rgbWheelLight.style.height = "100%";
        this.rgbWheelLight.style.boxSizing = "border-box";
        this.rgbWheelLight.style.background = "linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%)";
        this.rgbWheelPanel.appendChild(this.rgbWheelLight);

        this.rgbWheelSat = document.createElement("DIV");
        this.rgbWheelSat.className = "IroWheelSaturation";
        this.rgbWheelSat.style.position = "absolute";
        this.rgbWheelSat.style.top = "0px";
        this.rgbWheelSat.style.left = "0px";
        this.rgbWheelSat.style.width = "100%";
        this.rgbWheelSat.style.height = "100%";
        this.rgbWheelSat.style.boxSizing = "border-box";
        this.rgbWheelSat.style.background = "linear-gradient(to bottom, transparent 0%, #000 100%)";
        this.rgbWheelPanel.appendChild(this.rgbWheelSat);

        /* this.rgbWheelBorder = document.createElement("DIV");
        this.rgbWheelBorder.className = "IroWheelBorder";
        this.rgbWheelBorder.style.position = "absolute";
        this.rgbWheelBorder.style.top = "0px";
        this.rgbWheelBorder.style.left = "0px";
        this.rgbWheelBorder.style.width = "100%";
        this.rgbWheelBorder.style.height = "100%";
        this.rgbWheelBorder.style.borderRadius = "50%";
        this.rgbWheelBorder.style.boxSizing = "border-box";
        this.rgbWheelBorder.style.border = "4px solid rgb(255, 255, 255)";
        this.rgbWheelPanel.appendChild(this.rgbWheelBorder); */

        this.rgbWheelPanelContainer.appendChild(this.rgbWheelPanel);

        this.rgbRedSlider01 = document.createElement("DIV");
        this.rgbRedSlider01.className = "IroSlider";
        this.rgbRedSlider01.style.position = "relative";
        this.rgbRedSlider01.style.width = "350px";
        this.rgbRedSlider01.style.height = "44px";
        this.rgbRedSlider01.style.borderRadius = "22px";
        this.rgbRedSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.rgbRedSlider01.style.overflow = "visible";
        this.rgbRedSlider01.style.display = "block";
        this.rgbRedSlider01.style.marginTop = "12px";

        this.rgbRedSlider02 = document.createElement("DIV");
        this.rgbRedSlider02.className = "IroSliderGradient";
        this.rgbRedSlider02.style.position = "absolute";
        this.rgbRedSlider02.style.top = "0px";
        this.rgbRedSlider02.style.left = "0px";
        this.rgbRedSlider02.style.width = "100%";
        this.rgbRedSlider02.style.height = "100%";
        this.rgbRedSlider02.style.borderRadius = "22px";
        this.rgbRedSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.rgbRedSlider02.style.boxSizing = "border-box";
        this.rgbRedSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.rgbRedSlider01.appendChild(this.rgbRedSlider02);

        this.rgbRedSliderCircleOut = document.createElement("div");
        this.rgbRedSliderCircleOut.style.border = "2px solid #444";
        this.rgbRedSliderCircleOut.style.borderRadius = "13px";
        this.rgbRedSliderCircleOut.style.willChange = "transform";
        this.rgbRedSliderCircleOut.style.top = "8px";
        this.rgbRedSliderCircleOut.style.left = "315px";
        this.rgbRedSliderCircleOut.style.width = "24px";
        this.rgbRedSliderCircleOut.style.height = "24px";
        this.rgbRedSliderCircleOut.style.position = "absolute";
        this.rgbRedSliderCircleOut.style.overflow = "visible";

        this.rgbRedSliderCircleIn = document.createElement("div");
        this.rgbRedSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.rgbRedSliderCircleIn.style.borderRadius = "12px";
        this.rgbRedSliderCircleIn.style.top = "-0px";
        this.rgbRedSliderCircleIn.style.left = "-0px";
        this.rgbRedSliderCircleIn.style.width = "20px";
        this.rgbRedSliderCircleIn.style.height = "20px";
        this.rgbRedSliderCircleIn.style.position = "absolute";
        this.rgbRedSliderCircleIn.style.overflow = "visible";
        this.rgbRedSliderCircleOut.appendChild(this.rgbRedSliderCircleIn);

        this.rgbRedSlider01.appendChild(this.rgbRedSliderCircleOut);
        this.rgbWheelPanelContainer.appendChild(this.rgbRedSlider01);

        this.rgbSaturationSlider01 = document.createElement("DIV");
        this.rgbSaturationSlider01.className = "IroSlider";
        this.rgbSaturationSlider01.style.position = "relative";
        this.rgbSaturationSlider01.style.width = "350px";
        this.rgbSaturationSlider01.style.height = "44px";
        this.rgbSaturationSlider01.style.borderRadius = "22px";
        this.rgbSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.rgbSaturationSlider01.style.overflow = "visible";
        this.rgbSaturationSlider01.style.display = "block";
        this.rgbSaturationSlider01.style.marginTop = "12px";

        this.rgbSaturationSlider02 = document.createElement("DIV");
        this.rgbSaturationSlider02.className = "IroSliderGradient";
        this.rgbSaturationSlider02.style.position = "absolute";
        this.rgbSaturationSlider02.style.top = "0px";
        this.rgbSaturationSlider02.style.left = "0px";
        this.rgbSaturationSlider02.style.width = "100%";
        this.rgbSaturationSlider02.style.height = "100%";
        this.rgbSaturationSlider02.style.borderRadius = "22px";
        this.rgbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";//"linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(160, 255, 158) 100%)";
        this.rgbSaturationSlider02.style.boxSizing = "border-box";
        this.rgbSaturationSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.rgbSaturationSlider01.appendChild(this.rgbSaturationSlider02);

        this.rgbSaturationSliderCircleOut = document.createElement("div");
        this.rgbSaturationSliderCircleOut.style.border = "2px solid #444";
        this.rgbSaturationSliderCircleOut.style.borderRadius = "13px";
        this.rgbSaturationSliderCircleOut.style.willChange = "transform";
        this.rgbSaturationSliderCircleOut.style.top = "8px";
        this.rgbSaturationSliderCircleOut.style.left = "315px";
        this.rgbSaturationSliderCircleOut.style.width = "24px";
        this.rgbSaturationSliderCircleOut.style.height = "24px";
        this.rgbSaturationSliderCircleOut.style.position = "absolute";
        this.rgbSaturationSliderCircleOut.style.overflow = "visible";
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

                _self.rgbGreen = xcolorPickermap(parseInt(this.style.left), 0, 315, 0, 100);
                _self.updateRgbForm();
            }
        }
        this.rgbSaturationSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.rgbSaturationSliderCircleIn = document.createElement("div");
        this.rgbSaturationSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.rgbSaturationSliderCircleIn.style.borderRadius = "12px";
        this.rgbSaturationSliderCircleIn.style.top = "-0px";
        this.rgbSaturationSliderCircleIn.style.left = "-0px";
        this.rgbSaturationSliderCircleIn.style.width = "20px";
        this.rgbSaturationSliderCircleIn.style.height = "20px";
        this.rgbSaturationSliderCircleIn.style.position = "absolute";
        this.rgbSaturationSliderCircleIn.style.overflow = "visible";
        this.rgbSaturationSliderCircleOut.appendChild(this.rgbSaturationSliderCircleIn);

        this.rgbSaturationSlider01.appendChild(this.rgbSaturationSliderCircleOut);
        this.rgbWheelPanelContainer.appendChild(this.rgbSaturationSlider01);

        this.rgbLightSlider01 = document.createElement("DIV");
        this.rgbLightSlider01.className = "IroSlider";
        this.rgbLightSlider01.style.position = "relative";
        this.rgbLightSlider01.style.width = "350px";
        this.rgbLightSlider01.style.height = "44px";
        this.rgbLightSlider01.style.borderRadius = "22px";
        this.rgbLightSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.rgbLightSlider01.style.overflow = "visible";
        this.rgbLightSlider01.style.display = "block";
        this.rgbLightSlider01.style.marginTop = "12px";

        this.rgbLightSlider02 = document.createElement("DIV");
        this.rgbLightSlider02.className = "IroSliderGradient";
        this.rgbLightSlider02.style.position = "absolute";
        this.rgbLightSlider02.style.top = "0px";
        this.rgbLightSlider02.style.left = "0px";
        this.rgbLightSlider02.style.width = "100%";
        this.rgbLightSlider02.style.height = "100%";
        this.rgbLightSlider02.style.borderRadius = "22px";
        this.rgbLightSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";//"linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(4, 255, 0) 100%)";
        this.rgbLightSlider02.style.boxSizing = "border-box";
        this.rgbLightSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.rgbLightSlider01.appendChild(this.rgbLightSlider02);

        this.rgbLightSliderCircleOut = document.createElement("div");
        this.rgbLightSliderCircleOut.style.border = "2px solid #444";
        this.rgbLightSliderCircleOut.style.borderRadius = "13px";
        this.rgbLightSliderCircleOut.style.willChange = "transform";
        this.rgbLightSliderCircleOut.style.top = "8px";
        this.rgbLightSliderCircleOut.style.left = "154px";
        this.rgbLightSliderCircleOut.style.width = "24px";
        this.rgbLightSliderCircleOut.style.height = "24px";
        this.rgbLightSliderCircleOut.style.position = "absolute";
        this.rgbLightSliderCircleOut.style.overflow = "visible";

        this.rgbLightSliderCircleIn = document.createElement("div");
        this.rgbLightSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.rgbLightSliderCircleIn.style.borderRadius = "12px";
        this.rgbLightSliderCircleIn.style.top = "-0px";
        this.rgbLightSliderCircleIn.style.left = "-0px";
        this.rgbLightSliderCircleIn.style.width = "20px";
        this.rgbLightSliderCircleIn.style.height = "20px";
        this.rgbLightSliderCircleIn.style.position = "absolute";
        this.rgbLightSliderCircleIn.style.overflow = "visible";
        this.rgbLightSliderCircleOut.appendChild(this.rgbLightSliderCircleIn);

        this.rgbLightSlider01.appendChild(this.rgbLightSliderCircleOut);
        this.rgbWheelPanelContainer.appendChild(this.rgbLightSlider01);
        /////////////////////////////////////////////////////

        this.rgbPanel.appendChild(this.rgbWheelPanelContainer);

        this.tabcontents.push(this.rgbPanel);

        return this.rgbPanel;
    }

    createHexPanel(isActive) {
        this.hexPanel = document.createElement("div");
        this.hexPanel.id = "hexPanel";
        this.hexPanel.className = "tabcontent";
        Object.assign(this.hexPanel.style, this.tabcontentStyle);
        this.hexPanel.innerText = "HEX";
        if (isActive) {
            this.hexPanel.style.display = "";
            this.hexTab.style.backgroundColor = "#ccc";
        }

        this.tabcontents.push(this.hexPanel);

        return this.hexPanel;
    }

    createHslPanel(isActive) {
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
        this.hslFormPanel = document.createElement("div");
        Object.assign(this.hslFormPanel.style, {
            padding: '5px',
            float: "right",
            width: "220px",
            height: "520px",
            backgroundColor: "rgb(241, 241, 241)",
            border: "1px solid #ccc",
            borderRadius: "4px"
        });

        this.hslformHslColor = document.createElement("div");
        this.hslformHslColor.style.display = 'flex';
        this.hslformHslColor.style.flexDirection = 'row';
        this.hslformHslColor.style.backgroundColor = this.color.getRgbString();
        this.hslformHslColor.style.height = "50px";
        this.hslformHslColor.style.width = "100%";
        this.hslformHslColor.style.border = "1px solid #ccc";
        this.hslformHslColor.style.borderRadius = "4px";
        this.hslformHslColor.style.marginBottom = "10px";
        this.hslFormPanel.appendChild(this.hslformHslColor);

        const labelsStyle = {
            fontFamily: 'monospace',
            fontSize: '1.2em'
        };

        const inputsStyle = {
            width: "60px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginBottom: '10px'
        };

        this.hslformHue = document.createElement("div");
        this.hslformHue.style.display = 'flex';
        this.hslformHue.style.flexDirection = 'row';
        this.hslformHue.style.alignItems = 'center';
        this.hslformHue.style.justifyContent = 'space-between';
        this.hslFormPanel.appendChild(this.hslformHue);

        this.labelHslHue = document.createElement("label");
        this.labelHslHue.for = "hslHue";
        this.labelHslHue.innerText = "Hue";
        Object.assign(this.labelHslHue.style, labelsStyle);
        this.hslformHue.appendChild(this.labelHslHue);

        this.inputHslHue = document.createElement("input");
        this.inputHslHue.id = "hslHue";
        this.inputHslHue.type = "number";
        this.inputHslHue.min = "0";
        this.inputHslHue.max = "360";
        this.inputHslHue.value = this.color.hslH;
        Object.assign(this.inputHslHue.style, inputsStyle);
        this.inputHslHue.onchange = function () {
            _self.color = xcolor.getHsl(this.value, _self.color.hsl.s, _self.color.hsl.l);//xcolor.getHsl(' + this.value + ', ' + _self.color.hsl.s + '%, ' + _self.color.hsl.l + '%)');//xcolor.getXcolor('hsl(' + this.value + ', ' + _self.color.hsl.s + '%, ' + _self.color.hsl.l + '%)');
            _self.updateHslForm();
            _self.updateHslPickers();
        }
        this.hslformHue.appendChild(this.inputHslHue);

        this.hslformSat = document.createElement("div");
        this.hslformSat.style.display = 'flex';
        this.hslformSat.style.flexDirection = 'row';
        this.hslformSat.style.alignItems = 'center';
        this.hslformSat.style.justifyContent = 'space-between';
        this.hslFormPanel.appendChild(this.hslformSat);

        this.labelHslSat = document.createElement("label");
        this.labelHslSat.for = "hslSat";
        this.labelHslSat.innerText = "Saturation";
        Object.assign(this.labelHslSat.style, labelsStyle);
        this.hslformSat.appendChild(this.labelHslSat);

        this.inputHslSat = document.createElement("input");
        this.inputHslSat.id = "hslSat";
        this.inputHslSat.type = "number";
        this.inputHslSat.value = this.color.hsl.s;
        this.inputHslSat.min = "0";
        this.inputHslSat.max = "100";
        Object.assign(this.inputHslSat.style, inputsStyle);
        this.inputHslSat.onchange = function () {
            //_self.hslSat = this.value;
            _self.color = xcolor.getHsl(_self.color.hsl.h , this.value, _self.color.hsl.l); //xcolor.getXcolor('hsl(' + _self.color.hsl.h + ', ' + this.value + '%, ' + _self.color.hsl.l + '%)');
            _self.updateHslForm();
            _self.updateHslPickers();
        }
        this.hslformSat.appendChild(this.inputHslSat);

        this.hslformLight = document.createElement("div");
        this.hslformLight.style.display = 'flex';
        this.hslformLight.style.flexDirection = 'row';
        this.hslformLight.style.alignItems = 'center';
        this.hslformLight.style.justifyContent = 'space-between';
        this.hslFormPanel.appendChild(this.hslformLight);

        this.labelHslLightness = document.createElement("label");
        this.labelHslLightness.for = "hslLight";
        this.labelHslLightness.innerText = "Lightness";
        Object.assign(this.labelHslLightness.style, labelsStyle);
        this.hslformLight.appendChild(this.labelHslLightness);

        this.inputHslLightness = document.createElement("input");
        this.inputHslLightness.id = "hslLight";
        this.inputHslLightness.type = "number";
        this.inputHslLightness.value = this.color.hsl.l;
        this.inputHslLightness.min = "0";
        this.inputHslLightness.max = "100";
        Object.assign(this.inputHslLightness.style, inputsStyle);
        this.inputHslLightness.onchange = function () {
            //_self.hslLight = this.value;
            _self.color = xcolor.getHsl(_self.color.hsl.h , _self.color.hsl.s, this.value); //xcolor.getXcolor('hsl(' + _self.color.hsl.h + ', ' + _self.color.hsl.s + '%, ' + this.value + '%)');
            _self.updateHslForm();
            _self.updateHslPickers();
        }
        this.hslformLight.appendChild(this.inputHslLightness);

        this.hslformHSL = document.createElement("div");
        this.hslformHSL.style.display = 'flex';
        this.hslformHSL.style.flexDirection = 'row';
        this.hslformHSL.style.alignItems = 'center';
        this.hslformHSL.style.justifyContent = 'space-between';
        this.hslFormPanel.appendChild(this.hslformHSL);

        this.labelHsl = document.createElement("label");
        this.labelHsl.for = "hslStr";
        this.labelHsl.innerText = "HSL";
        Object.assign(this.labelHsl.style, labelsStyle);
        this.hslformHSL.appendChild(this.labelHsl);

        this.inputHsl = document.createElement("input");
        this.inputHsl.id = "hslStr";
        this.inputHsl.type = "text";
        this.inputHsl.value = this.color.getHslString();
        Object.assign(this.inputHsl.style, {
            width: "160px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginTop: '10px',
            marginBottom: '10px'
        });
        this.inputHsl.onchange = function () {
            let hslColor = xcolor.getColor(this.value);
            //_self.hslHue = hslColor.hslH;
            //_self.hslSat = hslColor.hslS;
           // _self.hslLight = hslColor.hslL;
            _self.updateHslPickers();
            _self.updateHslForm();
        }
        this.hslformHSL.appendChild(this.inputHsl);

        this.copyIconHsl = document.createElement('button');
        Object.assign(this.copyIconHsl.style, {
            width: '24px',
            height: '24px',
            padding: '0px'
        })
        this.copyIconHsl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#454545"></path> </g></svg>';
        this.copyIconHsl.onclick = function () { navigator.clipboard.writeText(_self.inputHsl.value); }
        this.hslformHSL.appendChild(this.copyIconHsl);

        this.hslPanel.appendChild(this.hslFormPanel);

        ///////////////////////////////////////////////////

        this.hslWheelPanelContainer = document.createElement("DIV");
        this.hslWheelPanelContainer.className = "IroColorPicker";
        this.hslWheelPanelContainer.style.display = "block";

        this.hslWheelPanel = document.createElement("DIV");
        this.hslWheelPanel.className = "IroWheel";
        this.hslWheelPanel.style.width = "350px";
        this.hslWheelPanel.style.height = "350px";
        this.hslWheelPanel.style.position = "relative";
        this.hslWheelPanel.style.overflow = "visible";
        this.hslWheelPanel.style.display = "block";
        this.hslWheelPanel.onclick = function (event) {
            if (event.target.className == "") return;
            //console.log(event);
            let data = _self.calculateWheelColor(event);
            _self.hslWheelSliderCircleOut.style.left = event.layerX - 13 + "px";
            _self.hslWheelSliderCircleOut.style.top = event.layerY - 13 + "px";

            _self.hslHueSliderCircleOut.style.left = Math.max(8, Math.min(315, (xcolorPickermap(data.angle, 0, 360, 8, 315)))) + "px";

            _self.hslLightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(data.distance, 0, 175, 8, 315))) + "px";


            //_self.hslHue = data.angle;
            //_self.hslLight = xcolorPickermap(data.distance, 0, 175, 0, 100);
            _self.color = xcolor.getHsl(data.angle, _self.color.hsl.s, xcolorPickermap(data.distance, 0, 175, 0, 100)); //xcolor.getXcolor('hsl(' + data.angle + ', ' + _self.color.hsl.s + '%, ' + xcolorPickermap(data.distance, 0, 175, 0, 100) + '%)');
            _self.updateHslForm();
            _self.updateHslPickers();
        };

        this.hslWheelSliderCircleOut = document.createElement("div");
        this.hslWheelSliderCircleOut.style.border = "2px solid #444";
        this.hslWheelSliderCircleOut.style.borderRadius = "13px";
        this.hslWheelSliderCircleOut.style.willChange = "transform";
        this.hslWheelSliderCircleOut.style.top = "161px";
        this.hslWheelSliderCircleOut.style.left = "250px";
        this.hslWheelSliderCircleOut.style.width = "24px";
        this.hslWheelSliderCircleOut.style.height = "24px";
        this.hslWheelSliderCircleOut.style.position = "absolute";
        this.hslWheelSliderCircleOut.style.overflow = "visible";
        this.hslWheelSliderCircleOut.style.zIndex = "9000";

        this.hslWheelSliderCircleIn = document.createElement("div");
        this.hslWheelSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hslWheelSliderCircleIn.style.borderRadius = "12px";
        this.hslWheelSliderCircleIn.style.top = "-0px";
        this.hslWheelSliderCircleIn.style.left = "-0px";
        this.hslWheelSliderCircleIn.style.width = "20px";
        this.hslWheelSliderCircleIn.style.height = "20px";
        this.hslWheelSliderCircleIn.style.position = "absolute";
        this.hslWheelSliderCircleIn.style.overflow = "visible";
        this.hslWheelSliderCircleOut.appendChild(this.hslWheelSliderCircleIn);

        this.hslWheelPanel.appendChild(this.hslWheelSliderCircleOut);


        this.hslWheelHue = document.createElement("DIV");
        this.hslWheelHue.className = "IroWheelHue";
        this.hslWheelHue.style.position = "absolute";
        this.hslWheelHue.style.top = "0px";
        this.hslWheelHue.style.left = "0px";
        this.hslWheelHue.style.width = "100%";
        this.hslWheelHue.style.height = "100%";
        this.hslWheelHue.style.borderRadius = "50%";
        this.hslWheelHue.style.boxSizing = "border-box";
        this.hslWheelHue.style.transform = "rotateZ(90deg)";
        this.hslWheelHue.style.background = "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)";//"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)";
        this.hslWheelPanel.appendChild(this.hslWheelHue);

        this.hslWheelSat = document.createElement("DIV");
        this.hslWheelSat.className = "IroWheelSaturation";
        this.hslWheelSat.style.position = "absolute";
        this.hslWheelSat.style.top = "0px";
        this.hslWheelSat.style.left = "0px";
        this.hslWheelSat.style.width = "100%";
        this.hslWheelSat.style.height = "100%";
        this.hslWheelSat.style.borderRadius = "50%";
        this.hslWheelSat.style.boxSizing = "border-box";
        this.hslWheelSat.style.background = "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 40%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%)";////"radial-gradient(circle closest-side, rgb(255, 255, 255), transparent)";
        this.hslWheelPanel.appendChild(this.hslWheelSat);

        this.hslWheelBorder = document.createElement("DIV");
        this.hslWheelBorder.className = "IroWheelBorder";
        this.hslWheelBorder.style.position = "absolute";
        this.hslWheelBorder.style.top = "0px";
        this.hslWheelBorder.style.left = "0px";
        this.hslWheelBorder.style.width = "100%";
        this.hslWheelBorder.style.height = "100%";
        this.hslWheelBorder.style.borderRadius = "50%";
        this.hslWheelBorder.style.boxSizing = "border-box";
        this.hslWheelBorder.style.border = "4px solid rgb(255, 255, 255)";
        this.hslWheelPanel.appendChild(this.hslWheelBorder);

        this.hslWheelPanelContainer.appendChild(this.hslWheelPanel);

        this.hslHueSlider01 = document.createElement("DIV");
        this.hslHueSlider01.className = "IroSlider";
        this.hslHueSlider01.style.position = "relative";
        this.hslHueSlider01.style.width = "350px";
        this.hslHueSlider01.style.height = "44px";
        this.hslHueSlider01.style.borderRadius = "22px";
        this.hslHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.hslHueSlider01.style.overflow = "visible";
        this.hslHueSlider01.style.display = "block";
        this.hslHueSlider01.style.marginTop = "12px";

        this.hslHueSlider02 = document.createElement("DIV");
        this.hslHueSlider02.className = "IroSliderGradient";
        this.hslHueSlider02.style.position = "absolute";
        this.hslHueSlider02.style.top = "0px";
        this.hslHueSlider02.style.left = "0px";
        this.hslHueSlider02.style.width = "100%";
        this.hslHueSlider02.style.height = "100%";
        this.hslHueSlider02.style.borderRadius = "22px";
        this.hslHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.hslHueSlider02.style.boxSizing = "border-box";
        this.hslHueSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.hslHueSlider01.appendChild(this.hslHueSlider02);

        this.hslHueSliderCircleOut = document.createElement("div");
        this.hslHueSliderCircleOut.style.border = "2px solid #444";
        this.hslHueSliderCircleOut.style.borderRadius = "13px";
        this.hslHueSliderCircleOut.style.willChange = "transform";
        this.hslHueSliderCircleOut.style.top = "8px";
        this.hslHueSliderCircleOut.style.left = "315px";
        this.hslHueSliderCircleOut.style.width = "24px";
        this.hslHueSliderCircleOut.style.height = "24px";
        this.hslHueSliderCircleOut.style.position = "absolute";
        this.hslHueSliderCircleOut.style.overflow = "visible";

        this.hslHueSliderCircleIn = document.createElement("div");
        this.hslHueSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hslHueSliderCircleIn.style.borderRadius = "12px";
        this.hslHueSliderCircleIn.style.top = "-0px";
        this.hslHueSliderCircleIn.style.left = "-0px";
        this.hslHueSliderCircleIn.style.width = "20px";
        this.hslHueSliderCircleIn.style.height = "20px";
        this.hslHueSliderCircleIn.style.position = "absolute";
        this.hslHueSliderCircleIn.style.overflow = "visible";
        this.hslHueSliderCircleOut.appendChild(this.hslHueSliderCircleIn);

        this.hslHueSlider01.appendChild(this.hslHueSliderCircleOut);
        this.hslWheelPanelContainer.appendChild(this.hslHueSlider01);

        this.hslSaturationSlider01 = document.createElement("DIV");
        this.hslSaturationSlider01.className = "IroSlider";
        this.hslSaturationSlider01.style.position = "relative";
        this.hslSaturationSlider01.style.width = "350px";
        this.hslSaturationSlider01.style.height = "44px";
        this.hslSaturationSlider01.style.borderRadius = "22px";
        this.hslSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.hslSaturationSlider01.style.overflow = "visible";
        this.hslSaturationSlider01.style.display = "block";
        this.hslSaturationSlider01.style.marginTop = "12px";

        this.hslSaturationSlider02 = document.createElement("DIV");
        this.hslSaturationSlider02.className = "IroSliderGradient";
        this.hslSaturationSlider02.style.position = "absolute";
        this.hslSaturationSlider02.style.top = "0px";
        this.hslSaturationSlider02.style.left = "0px";
        this.hslSaturationSlider02.style.width = "100%";
        this.hslSaturationSlider02.style.height = "100%";
        this.hslSaturationSlider02.style.borderRadius = "22px";
        this.hslSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";//"linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(160, 255, 158) 100%)";
        this.hslSaturationSlider02.style.boxSizing = "border-box";
        this.hslSaturationSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.hslSaturationSlider01.appendChild(this.hslSaturationSlider02);

        this.hslSaturationSliderCircleOut = document.createElement("div");
        this.hslSaturationSliderCircleOut.style.border = "2px solid #444";
        this.hslSaturationSliderCircleOut.style.borderRadius = "13px";
        this.hslSaturationSliderCircleOut.style.willChange = "transform";
        this.hslSaturationSliderCircleOut.style.top = "8px";
        this.hslSaturationSliderCircleOut.style.left = "315px";
        this.hslSaturationSliderCircleOut.style.width = "24px";
        this.hslSaturationSliderCircleOut.style.height = "24px";
        this.hslSaturationSliderCircleOut.style.position = "absolute";
        this.hslSaturationSliderCircleOut.style.overflow = "visible";
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

                //_self.hslSat = xcolorPickermap(parseInt(this.style.left), 0, 315, 0, 100);
                _self.color = xcolor.getHsl(_self.color.hsl.h, xcolorPickermap(parseInt(this.style.left), 8, 315, 0, 100), _self.color.hsl.l); //xcolor.getXcolor("hsl(" + _self.color.hsl.h + ", " + xcolorPickermap(parseInt(this.style.left), 0, 315, 0, 100) + "%, " + _self.color.hsl.l + "%)");
                _self.updateHslForm();
            }
        }
        this.hslSaturationSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hslSaturationSliderCircleIn = document.createElement("div");
        this.hslSaturationSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hslSaturationSliderCircleIn.style.borderRadius = "12px";
        this.hslSaturationSliderCircleIn.style.top = "-0px";
        this.hslSaturationSliderCircleIn.style.left = "-0px";
        this.hslSaturationSliderCircleIn.style.width = "20px";
        this.hslSaturationSliderCircleIn.style.height = "20px";
        this.hslSaturationSliderCircleIn.style.position = "absolute";
        this.hslSaturationSliderCircleIn.style.overflow = "visible";
        this.hslSaturationSliderCircleOut.appendChild(this.hslSaturationSliderCircleIn);

        this.hslSaturationSlider01.appendChild(this.hslSaturationSliderCircleOut);
        this.hslWheelPanelContainer.appendChild(this.hslSaturationSlider01);

        this.hslLightnessSlider01 = document.createElement("DIV");
        this.hslLightnessSlider01.className = "IroSlider";
        this.hslLightnessSlider01.style.position = "relative";
        this.hslLightnessSlider01.style.width = "350px";
        this.hslLightnessSlider01.style.height = "44px";
        this.hslLightnessSlider01.style.borderRadius = "22px";
        this.hslLightnessSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.hslLightnessSlider01.style.overflow = "visible";
        this.hslLightnessSlider01.style.display = "block";
        this.hslLightnessSlider01.style.marginTop = "12px";

        this.hslLightnessSlider02 = document.createElement("DIV");
        this.hslLightnessSlider02.className = "IroSliderGradient";
        this.hslLightnessSlider02.style.position = "absolute";
        this.hslLightnessSlider02.style.top = "0px";
        this.hslLightnessSlider02.style.left = "0px";
        this.hslLightnessSlider02.style.width = "100%";
        this.hslLightnessSlider02.style.height = "100%";
        this.hslLightnessSlider02.style.borderRadius = "22px";
        this.hslLightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";//"linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(4, 255, 0) 100%)";
        this.hslLightnessSlider02.style.boxSizing = "border-box";
        this.hslLightnessSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.hslLightnessSlider01.appendChild(this.hslLightnessSlider02);

        this.hslLightnessSliderCircleOut = document.createElement("div");
        this.hslLightnessSliderCircleOut.style.border = "2px solid #444";
        this.hslLightnessSliderCircleOut.style.borderRadius = "13px";
        this.hslLightnessSliderCircleOut.style.willChange = "transform";
        this.hslLightnessSliderCircleOut.style.top = "8px";
        this.hslLightnessSliderCircleOut.style.left = "154px";
        this.hslLightnessSliderCircleOut.style.width = "24px";
        this.hslLightnessSliderCircleOut.style.height = "24px";
        this.hslLightnessSliderCircleOut.style.position = "absolute";
        this.hslLightnessSliderCircleOut.style.overflow = "visible";

        this.hslLightnessSliderCircleIn = document.createElement("div");
        this.hslLightnessSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hslLightnessSliderCircleIn.style.borderRadius = "12px";
        this.hslLightnessSliderCircleIn.style.top = "-0px";
        this.hslLightnessSliderCircleIn.style.left = "-0px";
        this.hslLightnessSliderCircleIn.style.width = "20px";
        this.hslLightnessSliderCircleIn.style.height = "20px";
        this.hslLightnessSliderCircleIn.style.position = "absolute";
        this.hslLightnessSliderCircleIn.style.overflow = "visible";
        this.hslLightnessSliderCircleOut.appendChild(this.hslLightnessSliderCircleIn);

        this.hslLightnessSlider01.appendChild(this.hslLightnessSliderCircleOut);
        this.hslWheelPanelContainer.appendChild(this.hslLightnessSlider01);
        /////////////////////////////////////////////////////

        this.hslPanel.appendChild(this.hslWheelPanelContainer);

        this.tabcontents.push(this.hslPanel);

        return this.hslPanel;
    }

    createHsbPanel(isActive) {
        let _self = this;

        this.hsbPanel = document.createElement("div");
        this.hsbPanel.id = "hsbPanel";
        this.hsbPanel.className = "tabcontent";
        //this.hsbPanel.innerText = "HSB";
        Object.assign(this.hsbPanel.style, this.tabcontentStyle);
        if (isActive) {
            this.style.display = "";
            this.hsbTab.style.backgroundColor = "#ccc";
        }

        /// hsb form panel
        this.hsbFormPanel = document.createElement("div");
        Object.assign(this.hsbFormPanel.style, {
            padding: '5px',
            float: "right",
            width: "220px",
            height: "520px",
            backgroundColor: "rgb(241, 241, 241)",
            border: "1px solid #ccc",
            borderRadius: "4px"
        });

        this.hsbformHsbColor = document.createElement("div");
        this.hsbformHsbColor.style.display = 'flex';
        this.hsbformHsbColor.style.flexDirection = 'row';
        this.hsbformHsbColor.style.backgroundColor = this.color.getRgbString();
        this.hsbformHsbColor.style.height = "50px";
        this.hsbformHsbColor.style.width = "100%";
        this.hsbformHsbColor.style.border = "1px solid #ccc";
        this.hsbformHsbColor.style.borderRadius = "4px";
        this.hsbformHsbColor.style.marginBottom = "10px";
        this.hsbFormPanel.appendChild(this.hsbformHsbColor);

        const labelsStyle = {
            fontFamily: 'monospace',
            fontSize: '1.2em'
        };

        const inputsStyle = {
            width: "60px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginBottom: '10px'
        };

        this.hsbformHue = document.createElement("div");
        this.hsbformHue.style.display = 'flex';
        this.hsbformHue.style.flexDirection = 'row';
        this.hsbformHue.style.alignItems = 'center';
        this.hsbformHue.style.justifyContent = 'space-between';
        this.hsbFormPanel.appendChild(this.hsbformHue);

        this.labelHsbHue = document.createElement("label");
        this.labelHsbHue.for = "hsbHue";
        this.labelHsbHue.innerText = "Hue";
        Object.assign(this.labelHsbHue.style, labelsStyle);
        this.hsbformHue.appendChild(this.labelHsbHue);

        this.inputHsbHue = document.createElement("input");
        this.inputHsbHue.id = "hsbHue";
        this.inputHsbHue.type = "number";
        this.inputHsbHue.min = "0";
        this.inputHsbHue.max = "360";
        this.inputHsbHue.value = this.color.hsb.h;
        Object.assign(this.inputHsbHue.style, inputsStyle);
        this.inputHsbHue.onchange = function () {
            _self.hsbHue = this.value;
            _self.updateHsbForm();
            _self.updateHsbPickers();
        }
        this.hsbformHue.appendChild(this.inputHsbHue);

        this.hsbformSat = document.createElement("div");
        this.hsbformSat.style.display = 'flex';
        this.hsbformSat.style.flexDirection = 'row';
        this.hsbformSat.style.alignItems = 'center';
        this.hsbformSat.style.justifyContent = 'space-between';
        this.hsbFormPanel.appendChild(this.hsbformSat);

        this.labelHsbSat = document.createElement("label");
        this.labelHsbSat.for = "hsbSat";
        this.labelHsbSat.innerText = "Saturation";
        Object.assign(this.labelHsbSat.style, labelsStyle);
        this.hsbformSat.appendChild(this.labelHsbSat);

        this.inputHsbSat = document.createElement("input");
        this.inputHsbSat.id = "hsbSat";
        this.inputHsbSat.type = "number";
        this.inputHsbSat.value = this.color.hsb.s;
        this.inputHsbSat.min = "0";
        this.inputHsbSat.max = "100";
        Object.assign(this.inputHsbSat.style, inputsStyle);
        this.inputHsbSat.onchange = function () {
            _self.hsbSat = this.value;
            _self.updateHsbForm();
            _self.updateHsbPickers();
        }
        this.hsbformSat.appendChild(this.inputHsbSat);

        this.hsbformBright = document.createElement("div");
        this.hsbformBright.style.display = 'flex';
        this.hsbformBright.style.flexDirection = 'row';
        this.hsbformBright.style.alignItems = 'center';
        this.hsbformBright.style.justifyContent = 'space-between';
        this.hsbFormPanel.appendChild(this.hsbformBright);

        this.labelHsbBrightness = document.createElement("label");
        this.labelHsbBrightness.for = "hsbBright";
        this.labelHsbBrightness.innerText = "Brightness";
        Object.assign(this.labelHsbBrightness.style, labelsStyle);
        this.hsbformBright.appendChild(this.labelHsbBrightness);

        this.inputHsbBrightness = document.createElement("input");
        this.inputHsbBrightness.id = "hsbBright";
        this.inputHsbBrightness.type = "number";
        this.inputHsbBrightness.value = this.color.hsb.b;
        this.inputHsbBrightness.min = "0";
        this.inputHsbBrightness.max = "100";
        Object.assign(this.inputHsbBrightness.style, inputsStyle);
        this.inputHsbBrightness.onchange = function () {
            _self.hsbBright = this.value;
            _self.updateHsbForm();
            _self.updateHsbPickers();
        }
        this.hsbformBright.appendChild(this.inputHsbBrightness);

        this.hsbformHSB = document.createElement("div");
        this.hsbformHSB.style.display = 'flex';
        this.hsbformHSB.style.flexDirection = 'row';
        this.hsbformHSB.style.alignItems = 'center';
        this.hsbformHSB.style.justifyContent = 'space-between';
        this.hsbFormPanel.appendChild(this.hsbformHSB);

        this.labelHsb = document.createElement("label");
        this.labelHsb.for = "hsbStr";
        this.labelHsb.innerText = "HSB";
        Object.assign(this.labelHsb.style, labelsStyle);
        this.hsbformHSB.appendChild(this.labelHsb);

        this.inputHsb = document.createElement("input");
        this.inputHsb.id = "hsbStr";
        this.inputHsb.type = "text";
        this.inputHsb.value = this.color.getHsbString();
        Object.assign(this.inputHsb.style, {
            width: "160px",
            fontFamily: 'monospace',
            fontSize: '1.2em',
            marginTop: '10px',
            marginBottom: '10px'
        });
        this.inputHsb.onchange = function () {
            let hsbColor = xcolor.getColor(this.value);
            _self.updateHsbPickers();
            _self.updateHsbForm();
        }
        this.hsbformHSB.appendChild(this.inputHsb);

        this.copyIconHsb = document.createElement('button');
        Object.assign(this.copyIconHsb.style, {
            width: '24px',
            height: '24px',
            padding: '0px'
        })
        this.copyIconHsb.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#454545"></path> </g></svg>';
        this.copyIconHsb.onclick = function () { navigator.clipboard.writeText(_self.inputHsb.value); }
        this.hsbformHSB.appendChild(this.copyIconHsb);

        this.hsbPanel.appendChild(this.hsbFormPanel);

        ///////////////////////////////////////////////////

        this.hsbWheelPanelContainer = document.createElement("DIV");
        this.hsbWheelPanelContainer.className = "IroColorPicker";
        this.hsbWheelPanelContainer.style.display = "block";

        this.hsbWheelPanel = document.createElement("DIV");
        this.hsbWheelPanel.className = "IroWheel";
        this.hsbWheelPanel.style.width = "350px";
        this.hsbWheelPanel.style.height = "350px";
        this.hsbWheelPanel.style.position = "relative";
        this.hsbWheelPanel.style.overflow = "visible";
        this.hsbWheelPanel.style.display = "block";
        this.hsbWheelPanel.onclick = function (event) {
            if (event.target.className == "") return;
            //console.log(event);
            let data = _self.calculateWheelColor(event);
            _self.hsbWheelSliderCircleOut.style.left = event.layerX - 13 + "px";
            _self.hsbWheelSliderCircleOut.style.top = event.layerY - 13 + "px";

            _self.hsbHueSliderCircleOut.style.left = Math.max(8, Math.min(315, (xcolorPickermap(data.angle, 0, 360, 8, 315)))) + "px";

            _self.hsbBrightnessSliderCircleOut.style.left = Math.max(8, Math.min(315, xcolorPickermap(data.distance, 0, 175, 8, 315))) + "px";


            //_self.hsbHue = data.angle;
            //_self.hsbBright = xcolorPickermap(data.distance, 0, 175, 0, 100);
            _self.color = xcolor.getHsl(data.angle, _self.color.hsb.s, xcolorPickermap(data.distance, 0, 175, 0, 100)) //xcolor.getXcolor("hsb(" + data.angle + ", " + _self.color.hsb.s + "%, " + xcolorPickermap(data.distance, 0, 175, 0, 100) + "%)");
            _self.updateHsbForm();
            _self.updateHsbPickers();
        };

        this.hsbWheelSliderCircleOut = document.createElement("div");
        this.hsbWheelSliderCircleOut.style.border = "2px solid #444";
        this.hsbWheelSliderCircleOut.style.borderRadius = "13px";
        this.hsbWheelSliderCircleOut.style.willChange = "transform";
        this.hsbWheelSliderCircleOut.style.top = "161px";
        this.hsbWheelSliderCircleOut.style.left = "250px";
        this.hsbWheelSliderCircleOut.style.width = "24px";
        this.hsbWheelSliderCircleOut.style.height = "24px";
        this.hsbWheelSliderCircleOut.style.position = "absolute";
        this.hsbWheelSliderCircleOut.style.overflow = "visible";
        this.hsbWheelSliderCircleOut.style.zIndex = "9000";

        this.hsbWheelSliderCircleIn = document.createElement("div");
        this.hsbWheelSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hsbWheelSliderCircleIn.style.borderRadius = "12px";
        this.hsbWheelSliderCircleIn.style.top = "-0px";
        this.hsbWheelSliderCircleIn.style.left = "-0px";
        this.hsbWheelSliderCircleIn.style.width = "20px";
        this.hsbWheelSliderCircleIn.style.height = "20px";
        this.hsbWheelSliderCircleIn.style.position = "absolute";
        this.hsbWheelSliderCircleIn.style.overflow = "visible";
        this.hsbWheelSliderCircleOut.appendChild(this.hsbWheelSliderCircleIn);

        this.hsbWheelPanel.appendChild(this.hsbWheelSliderCircleOut);

        this.hsbWheelHue = document.createElement("DIV");
        this.hsbWheelHue.className = "IroWheelHue";
        this.hsbWheelHue.style.position = "absolute";
        this.hsbWheelHue.style.top = "0px";
        this.hsbWheelHue.style.left = "0px";
        this.hsbWheelHue.style.width = "100%";
        this.hsbWheelHue.style.height = "100%";
        this.hsbWheelHue.style.borderRadius = "50%";
        this.hsbWheelHue.style.boxSizing = "border-box";
        this.hsbWheelHue.style.transform = "rotateZ(90deg)";
        this.hsbWheelHue.style.background = "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)";//"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)";
        this.hsbWheelPanel.appendChild(this.hsbWheelHue);

        this.hsbWheelSat = document.createElement("DIV");
        this.hsbWheelSat.className = "IroWheelSaturation";
        this.hsbWheelSat.style.position = "absolute";
        this.hsbWheelSat.style.top = "0px";
        this.hsbWheelSat.style.left = "0px";
        this.hsbWheelSat.style.width = "100%";
        this.hsbWheelSat.style.height = "100%";
        this.hsbWheelSat.style.borderRadius = "50%";
        this.hsbWheelSat.style.boxSizing = "border-box";
        this.hsbWheelSat.style.background = "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 40%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%)";////"radial-gradient(circle closest-side, rgb(255, 255, 255), transparent)";
        this.hsbWheelPanel.appendChild(this.hsbWheelSat);

        this.hsbWheelBorder = document.createElement("DIV");
        this.hsbWheelBorder.className = "IroWheelBorder";
        this.hsbWheelBorder.style.position = "absolute";
        this.hsbWheelBorder.style.top = "0px";
        this.hsbWheelBorder.style.left = "0px";
        this.hsbWheelBorder.style.width = "100%";
        this.hsbWheelBorder.style.height = "100%";
        this.hsbWheelBorder.style.borderRadius = "50%";
        this.hsbWheelBorder.style.boxSizing = "border-box";
        this.hsbWheelBorder.style.border = "4px solid rgb(255, 255, 255)";
        this.hsbWheelPanel.appendChild(this.hsbWheelBorder);

        this.hsbWheelPanelContainer.appendChild(this.hsbWheelPanel);

        this.hsbHueSlider01 = document.createElement("DIV");
        this.hsbHueSlider01.className = "IroSlider";
        this.hsbHueSlider01.style.position = "relative";
        this.hsbHueSlider01.style.width = "350px";
        this.hsbHueSlider01.style.height = "44px";
        this.hsbHueSlider01.style.borderRadius = "22px";
        this.hsbHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.hsbHueSlider01.style.overflow = "visible";
        this.hsbHueSlider01.style.display = "block";
        this.hsbHueSlider01.style.marginTop = "12px";

        this.hsbHueSlider02 = document.createElement("DIV");
        this.hsbHueSlider02.className = "IroSliderGradient";
        this.hsbHueSlider02.style.position = "absolute";
        this.hsbHueSlider02.style.top = "0px";
        this.hsbHueSlider02.style.left = "0px";
        this.hsbHueSlider02.style.width = "100%";
        this.hsbHueSlider02.style.height = "100%";
        this.hsbHueSlider02.style.borderRadius = "22px";
        this.hsbHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.hsbHueSlider02.style.boxSizing = "border-box";
        this.hsbHueSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.hsbHueSlider01.appendChild(this.hsbHueSlider02);

        this.hsbHueSliderCircleOut = document.createElement("div");
        this.hsbHueSliderCircleOut.style.border = "2px solid #444";
        this.hsbHueSliderCircleOut.style.borderRadius = "13px";
        this.hsbHueSliderCircleOut.style.willChange = "transform";
        this.hsbHueSliderCircleOut.style.top = "8px";
        this.hsbHueSliderCircleOut.style.left = "315px";
        this.hsbHueSliderCircleOut.style.width = "24px";
        this.hsbHueSliderCircleOut.style.height = "24px";
        this.hsbHueSliderCircleOut.style.position = "absolute";
        this.hsbHueSliderCircleOut.style.overflow = "visible";

        this.hsbHueSliderCircleIn = document.createElement("div");
        this.hsbHueSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hsbHueSliderCircleIn.style.borderRadius = "12px";
        this.hsbHueSliderCircleIn.style.top = "-0px";
        this.hsbHueSliderCircleIn.style.left = "-0px";
        this.hsbHueSliderCircleIn.style.width = "20px";
        this.hsbHueSliderCircleIn.style.height = "20px";
        this.hsbHueSliderCircleIn.style.position = "absolute";
        this.hsbHueSliderCircleIn.style.overflow = "visible";
        this.hsbHueSliderCircleOut.appendChild(this.hsbHueSliderCircleIn);

        this.hsbHueSlider01.appendChild(this.hsbHueSliderCircleOut);
        this.hsbWheelPanelContainer.appendChild(this.hsbHueSlider01);

        this.hsbSaturationSlider01 = document.createElement("DIV");
        this.hsbSaturationSlider01.className = "IroSlider";
        this.hsbSaturationSlider01.style.position = "relative";
        this.hsbSaturationSlider01.style.width = "350px";
        this.hsbSaturationSlider01.style.height = "44px";
        this.hsbSaturationSlider01.style.borderRadius = "22px";
        this.hsbSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.hsbSaturationSlider01.style.overflow = "visible";
        this.hsbSaturationSlider01.style.display = "block";
        this.hsbSaturationSlider01.style.marginTop = "12px";

        this.hsbSaturationSlider02 = document.createElement("DIV");
        this.hsbSaturationSlider02.className = "IroSliderGradient";
        this.hsbSaturationSlider02.style.position = "absolute";
        this.hsbSaturationSlider02.style.top = "0px";
        this.hsbSaturationSlider02.style.left = "0px";
        this.hsbSaturationSlider02.style.width = "100%";
        this.hsbSaturationSlider02.style.height = "100%";
        this.hsbSaturationSlider02.style.borderRadius = "22px";
        this.hsbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";//"linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(160, 255, 158) 100%)";
        this.hsbSaturationSlider02.style.boxSizing = "border-box";
        this.hsbSaturationSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.hsbSaturationSlider01.appendChild(this.hsbSaturationSlider02);

        this.hsbSaturationSliderCircleOut = document.createElement("div");
        this.hsbSaturationSliderCircleOut.style.border = "2px solid #444";
        this.hsbSaturationSliderCircleOut.style.borderRadius = "13px";
        this.hsbSaturationSliderCircleOut.style.willChange = "transform";
        this.hsbSaturationSliderCircleOut.style.top = "8px";
        this.hsbSaturationSliderCircleOut.style.left = "315px";
        this.hsbSaturationSliderCircleOut.style.width = "24px";
        this.hsbSaturationSliderCircleOut.style.height = "24px";
        this.hsbSaturationSliderCircleOut.style.position = "absolute";
        this.hsbSaturationSliderCircleOut.style.overflow = "visible";
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

                //_self.hsbSat = xcolorPickermap(parseInt(this.style.left), 0, 315, 0, 100);
                _self.color = xcolor.getHsl(_self.color.hsb.h, xcolorPickermap(parseInt(this.style.left), 0, 315, 0, 100), _self.color.hsb.b); //xcolor.getXcolor("hsb(" + _self.color.hsb.h + ", " + xcolorPickermap(parseInt(this.style.left), 0, 315, 0, 100) + "%, " + _self.color.hsb.b + "%)");
                _self.updateHsbForm();
            }
        }
        this.hsbSaturationSliderCircleOut.onmouseup = function (e) {
            this.isDragging = false;
            this.initialPosition = { x: parseInt(this.style.left), y: parseInt(this.style.top) };
        };

        this.hsbSaturationSliderCircleIn = document.createElement("div");
        this.hsbSaturationSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hsbSaturationSliderCircleIn.style.borderRadius = "12px";
        this.hsbSaturationSliderCircleIn.style.top = "-0px";
        this.hsbSaturationSliderCircleIn.style.left = "-0px";
        this.hsbSaturationSliderCircleIn.style.width = "20px";
        this.hsbSaturationSliderCircleIn.style.height = "20px";
        this.hsbSaturationSliderCircleIn.style.position = "absolute";
        this.hsbSaturationSliderCircleIn.style.overflow = "visible";
        this.hsbSaturationSliderCircleOut.appendChild(this.hsbSaturationSliderCircleIn);

        this.hsbSaturationSlider01.appendChild(this.hsbSaturationSliderCircleOut);
        this.hsbWheelPanelContainer.appendChild(this.hsbSaturationSlider01);

        this.hsbBrightnessSlider01 = document.createElement("DIV");
        this.hsbBrightnessSlider01.className = "IroSlider";
        this.hsbBrightnessSlider01.style.position = "relative";
        this.hsbBrightnessSlider01.style.width = "350px";
        this.hsbBrightnessSlider01.style.height = "44px";
        this.hsbBrightnessSlider01.style.borderRadius = "22px";
        this.hsbBrightnessSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";
        this.hsbBrightnessSlider01.style.overflow = "visible";
        this.hsbBrightnessSlider01.style.display = "block";
        this.hsbBrightnessSlider01.style.marginTop = "12px";

        this.hsbBrightnessSlider02 = document.createElement("DIV");
        this.hsbBrightnessSlider02.className = "IroSliderGradient";
        this.hsbBrightnessSlider02.style.position = "absolute";
        this.hsbBrightnessSlider02.style.top = "0px";
        this.hsbBrightnessSlider02.style.left = "0px";
        this.hsbBrightnessSlider02.style.width = "100%";
        this.hsbBrightnessSlider02.style.height = "100%";
        this.hsbBrightnessSlider02.style.borderRadius = "22px";
        this.hsbBrightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";//"linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(4, 255, 0) 100%)";
        this.hsbBrightnessSlider02.style.boxSizing = "border-box";
        this.hsbBrightnessSlider02.style.border = "4px solid rgb(255, 255, 255)";
        this.hsbBrightnessSlider01.appendChild(this.hsbBrightnessSlider02);

        this.hsbBrightnessSliderCircleOut = document.createElement("div");
        this.hsbBrightnessSliderCircleOut.style.border = "2px solid #444";
        this.hsbBrightnessSliderCircleOut.style.borderRadius = "13px";
        this.hsbBrightnessSliderCircleOut.style.willChange = "transform";
        this.hsbBrightnessSliderCircleOut.style.top = "8px";
        this.hsbBrightnessSliderCircleOut.style.left = "154px";
        this.hsbBrightnessSliderCircleOut.style.width = "24px";
        this.hsbBrightnessSliderCircleOut.style.height = "24px";
        this.hsbBrightnessSliderCircleOut.style.position = "absolute";
        this.hsbBrightnessSliderCircleOut.style.overflow = "visible";

        this.hsbBrightnessSliderCircleIn = document.createElement("div");
        this.hsbBrightnessSliderCircleIn.style.border = "2px solid rgb(255, 255, 255)";
        this.hsbBrightnessSliderCircleIn.style.borderRadius = "12px";
        this.hsbBrightnessSliderCircleIn.style.top = "-0px";
        this.hsbBrightnessSliderCircleIn.style.left = "-0px";
        this.hsbBrightnessSliderCircleIn.style.width = "20px";
        this.hsbBrightnessSliderCircleIn.style.height = "20px";
        this.hsbBrightnessSliderCircleIn.style.position = "absolute";
        this.hsbBrightnessSliderCircleIn.style.overflow = "visible";
        this.hsbBrightnessSliderCircleOut.appendChild(this.hsbBrightnessSliderCircleIn);

        this.hsbBrightnessSlider01.appendChild(this.hsbBrightnessSliderCircleOut);
        this.hsbWheelPanelContainer.appendChild(this.hsbBrightnessSlider01);
        /////////////////////////////////////////////////////

        this.hsbPanel.appendChild(this.hsbWheelPanelContainer);

        this.tabcontents.push(this.hsbPanel);

        return this.hsbPanel;
    }

}

module.exports = xcolorPicker;