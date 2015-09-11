var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ElementPropertyPanel = (function (_super) {
    __extends(ElementPropertyPanel, _super);
    function ElementPropertyPanel(_editor) {
        _super.call(this, _editor);
    }
    ElementPropertyPanel.prototype.createBtns = function () {
        this.fillBtn = this.appendComponent(new Input(this.changeHandler.bind(this), '# fill color.', 'Fill color', '#F2FF4F'));
        this.strokeColorBtn = this.appendComponent(new Input(this.changeHandler.bind(this), '# stroke color.', 'Stroke color', '#2465FF'));
        this.strokeWidthStepper = this.appendComponent(new Stepper(this.changeHandler.bind(this), 'Stroke width', 1, 1, 0));
        this.strokeWidthStepper.component.style.width = "65px";
        this.opacityStepper = this.appendComponent(new Stepper(this.changeHandler.bind(this), 'Opacity', 0.6, 0.1, 0, 1));
        this.opacityStepper.component.style.width = "65px";
    };
    ElementPropertyPanel.prototype.changeHandler = function () {
        var prop = {
            fill: this.fillBtn.value,
            stroke: this.strokeColorBtn.value,
            width: this.strokeWidthStepper.value,
            opacity: this.opacityStepper.value
        };
        this._editor.changeColor(prop);
    };
    return ElementPropertyPanel;
})(PanelBase);
//# sourceMappingURL=ElementPropertyPanel.js.map