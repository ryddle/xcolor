class xcolorPickerButton extends HTMLElement {

    constructor() {
        super();
        this.dialog = null;
        this.btnWrapper = document.createElement("div");
        this.pickerButton = document.createElement("button");
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value != value) {
            this._value = value;
            if (this.pickerButton !== undefined) {
                this.pickerButton.style.backgroundColor = value;
            }

            try {
                this.onchange();
            } catch (error) {
                //console.log(error);
            }

        }
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });

        if (this.style.backgroundColor !== "") this.style.backgroundColor = "";
        this.style.margin = "5px";

        //wrapper

        this.btnWrapper.style.border = "1px solid #444";
        this.btnWrapper.style.borderRadius = "3px";
        this.btnWrapper.style.display="inline-block";
        this.btnWrapper.style.alignContent="center";
        this.btnWrapper.style.paddingLeft="5px";
        this.btnWrapper.style.paddingRight="5px";
        this.btnWrapper.style.paddingTop="5px";
        this.btnWrapper.style.paddingBottom="3px";
        this.btnWrapper.style.backgroundColor="#eaeaea";
        if (this.btnWrapper.style.width === "") {
            this.btnWrapper.style.width = "43px";
        } else {
            this.btnWrapper.style.width = Math.max(10, parseInt(this.btnWrapper.style.width)) + "px";
        }
        if (this.btnWrapper.style.height === "") {
            this.btnWrapper.style.height = "17px";
        } else {
            this.btnWrapper.style.height = Math.max(15, parseInt(this.btnWrapper.style.height)) + "px";
        }
        this.btnWrapper.style.margin = "";
        this.btnWrapper.onmouseover = (event) => {
            this.btnWrapper.style.backgroundColor = '#ddd';
        };
        this.btnWrapper.onmouseout = (event) => {
            this.btnWrapper.style.backgroundColor = '#eaeaea';
        };

        //picker button
        Object.assign(this.pickerButton.style, {
            backgroundColor: this._value || "#FF0000",
            width:"100%",
            height:"100%",
            cursor:"pointer",
            borderWidth:"1px",
            borderStyle:"solid",
            borderColor:"#444",
            paddingInline: '0px',
            paddingBlock: '0px'
        });
        this.btnWrapper.appendChild(this.pickerButton);

        shadowRoot.appendChild(this.btnWrapper);

        this.pickerButton.onclick = (event) => {
            let _self = this;
            this.dialog = new xcolorPicker(event, this.value);
            document.body.appendChild(this.dialog);

            this.dialog.showModal();

            this.dialog.addEventListener("close", () => {
                if (_self.dialog.returnValue != "") {
                    _self._value = _self.dialog.returnValue;
                    _self.onchange();
                    this.pickerButton.style.backgroundColor = _self.dialog.returnValue;
                }
            });

            this.dialog.addEventListener("click", function (event) {
                if (event.target === _self.dialog) {
                    _self.dialog.close();
                }
            });
        };

    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return ["value", "style"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name == "value") {
                this._value = newValue;
                this.pickerButton.style.backgroundColor = newValue;
                if (oldValue != null) {
                    try {
                        this.onchange();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else if (name == "style") {
                this.btnWrapper.style = newValue;
            }
        }
    }
}

customElements.define('xcolor-picker-btn', xcolorPickerButton);
