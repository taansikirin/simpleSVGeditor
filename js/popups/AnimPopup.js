var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PopUpAnim = (function (_super) {
    __extends(PopUpAnim, _super);
    function PopUpAnim(titleText, initWidth, initHeight, top, left) {
        if (titleText === void 0) { titleText = ''; }
        if (initWidth === void 0) { initWidth = 450; }
        if (initHeight === void 0) { initHeight = 510; }
        if (top === void 0) { top = 150; }
        if (left === void 0) { left = 200; }
        _super.call(this, titleText, initWidth, initHeight, top, left);
        this.popup.classList.add('anim-popup');
        this._animAttrib = this.addHorizontalContainer("Attribute to animate: ", new Input(this.setFromValue.bind(this), "attribute", "Qualified name of attribute to animate"));
        this._animAttrib.component.style.width = "200px";
        this._animFrom = this.addHorizontalContainer("From value: ", new Input(null, "from value", "Starting value"));
        this._animFrom.component.style.width = "200px";
        this._animTo = this.addHorizontalContainer("To value: ", new Input(null, "to value", "Ending value"));
        this._animTo.component.style.width = "200px";
        this._animDur = this.addHorizontalContainer("Duration [s]: ", new Stepper(null, "Duration of animation", 0, 0.001, 0));
        this._animDur.component.style.width = "200px";
        this._repeat = this.addHorizontalContainer("Repeat count: ", new Input(this.repeatHandler.bind(this), "repeat count", "Repeat count or 'indefinite'"));
        this._repeat.component.style.width = "200px";
        this._fill = this.addHorizontalContainer("Fill: ", new Combo(null, "fills", ['freeze', 'remove'], "fill type", "Freeze - element will freeze at the last state.\nRemove - element will return to its begining state.", 'freeze'));
        this._fill.component.style.width = "200px";
        this.repeatHandler();
        this._animId = this.addHorizontalContainer("Animation ID: ", new Input(null, "animation id", "Animation id"));
        this._animId.component.style.width = "200px";
        this._beginExtend = new Input(null, "delay or id", "Place animation id to bind this animation with or animation delay (like 2s, 500ms). " +
            "If you wish to set delay after start or end of another animation, place " +
            "animation id followed by space and than with delay time");
        this._beginExtend.component.style.width = "100px";
        var bindContainer = new HorizontalContainer("Start animation: ", this._beginExtend);
        this._begin = new Combo(null, "start", ['animation id start', 'animation id end', 'click', 'DOMloaded'], "begin of animation", "Select from a dropdown list or type when animation should begin");
        this._begin.component.style.cssText = "float:right;width:200px";
        bindContainer.component.appendChild(this._begin.component);
        this._content.appendChild(bindContainer.component);
        this._saveBtn = new Button(this.save.bind(this), "Save & Close", BtnType.long, "Save & close");
        this._saveBtn.component.style.cssText = "float:right;margin-top:20px;width:100px;";
        this._content.appendChild(this._saveBtn.component);
        //TODO tabulka s prehledem animaci -> databaze exitujicich animaci
    }
    PopUpAnim.prototype.showPopUp = function (content) {
        _super.prototype.showPopUp.call(this);
        //TODO pri editaci existujici animace predavat aktualni hodnoty
    };
    PopUpAnim.prototype.setFromValue = function () {
        var selEl = LayerList.instance.getSelectedElements();
        if (selEl.length == 1 && (selEl[0].element.hasAttribute(this._animAttrib.value) || selEl[0].element.hasAttributeNS('http://www.w3.org/2000/svg', this._animAttrib.value))) {
            this._animFrom.component.value = selEl[0].element.getAttribute(this._animAttrib.value);
        }
    };
    PopUpAnim.prototype.repeatHandler = function () {
        if (this._repeat.value == "indefinite") {
            this._fill.disable();
        }
        else {
            this._fill.enable();
        }
    };
    PopUpAnim.prototype.save = function () {
        var fillValue;
        if (this._fill.component.getAttribute("disabled")) {
            fillValue = null;
        }
        else {
            fillValue = this._fill.value;
        }
        var animParams = {
            attribut: this._animAttrib.value,
            fromValue: this._animFrom.value,
            toValue: this._animTo.value,
            duration: this._animDur.value,
            repeatCount: this._repeat.value,
            fill: fillValue,
            id: this._animId.value,
            begin: this._begin.value,
            beginExtend: this._beginExtend.value
        };
        _super.prototype.save.call(this, animParams);
    };
    return PopUpAnim;
})(PopUpBase);
//# sourceMappingURL=AnimPopup.js.map