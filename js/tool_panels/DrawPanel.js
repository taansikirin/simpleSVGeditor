var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DrawPanel = (function (_super) {
    __extends(DrawPanel, _super);
    function DrawPanel(_editor) {
        _super.call(this, _editor);
    }
    DrawPanel.prototype.createBtns = function () {
        this.circleBtn = this.appendComponent(new Button(this._editor.createNewCircle.bind(this._editor), "Create new circle", BtnType.small_draw, "", "css/assets/addCircle.png"));
        this.rectBtn = this.appendComponent(new Button(this._editor.createNewRectangle.bind(this._editor), "Create new rectangle", BtnType.small_draw, "", "css/assets/addRect.png"));
        this.polygBtn = this.appendComponent(new Button(this._editor.createNewPolygon.bind(this._editor), "Create new polygon", BtnType.small_draw, "", "css/assets/addPolyg.png"));
        this.polylineBtn = this.appendComponent(new Button(this._editor.createNewPolyline.bind(this._editor), "Create new polyline", BtnType.small_draw, "", "css/assets/addPolyline.png"));
        // this.appendBtn = <Button>this.appendComponent(new Button(this._editor.appendToActualShape.bind(this._editor), "Append last type of shape to the last elements group", BtnType.small_edit, "A"));
    };
    return DrawPanel;
})(PanelBase);
//# sourceMappingURL=DrawPanel.js.map