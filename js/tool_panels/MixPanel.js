var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MixPanel = (function (_super) {
    __extends(MixPanel, _super);
    function MixPanel(_editor) {
        _super.call(this, _editor);
    }
    MixPanel.prototype.createBtns = function () {
        this.showCodeBtn = this.appendComponent(new Button(this._editor.showSVGcode.bind(this._editor), "Show SVG code", BtnType.long, "Show code"));
        this.animateBtn = this.appendComponent(new Button(this._editor.setAnimation.bind(this._editor), "Add animation to selected elements.", BtnType.long, "Animate"));
    };
    return MixPanel;
})(PanelBase);
//# sourceMappingURL=MixPanel.js.map