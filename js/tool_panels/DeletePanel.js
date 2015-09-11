var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DeletePanel = (function (_super) {
    __extends(DeletePanel, _super);
    function DeletePanel(_editor) {
        _super.call(this, _editor);
    }
    DeletePanel.prototype.createBtns = function () {
        this.remSelPol = this.appendComponent(new Button(this._editor.removeSelectedPolygons.bind(this._editor), "Remove selected elements", BtnType.small_edit, "", "css/assets/removeSelectedPolyg.png"));
        this.remAllPol = this.appendComponent(new Button(this._editor.removeAllPolygons.bind(this._editor), "Remove all elements", BtnType.small_edit, "", "css/assets/removePolyg.png"));
    };
    return DeletePanel;
})(PanelBase);
//# sourceMappingURL=DeletePanel.js.map