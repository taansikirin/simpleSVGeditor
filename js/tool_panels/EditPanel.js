var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EditPanel = (function (_super) {
    __extends(EditPanel, _super);
    function EditPanel(_editor) {
        _super.call(this, _editor);
    }
    EditPanel.prototype.createBtns = function () {
        this.remCP = this.appendComponent(new Button(this._editor.removeSelectedCp.bind(this._editor), "Remove selected control points", BtnType.small_edit, "", "css/assets/removeCP.png"));
        this.disable();
    };
    return EditPanel;
})(PanelBase);
//# sourceMappingURL=EditPanel.js.map