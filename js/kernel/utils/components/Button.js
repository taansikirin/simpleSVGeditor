var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BtnType;
(function (BtnType) {
    BtnType[BtnType["small_draw"] = 0] = "small_draw";
    BtnType[BtnType["small_edit"] = 1] = "small_edit";
    BtnType[BtnType["layer_btn"] = 2] = "layer_btn";
    BtnType[BtnType["layer_item"] = 3] = "layer_item";
    BtnType[BtnType["tree_item"] = 4] = "tree_item";
    BtnType[BtnType["long"] = 5] = "long";
})(BtnType || (BtnType = {}));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(_handler, title, type, label, img) {
        if (title === void 0) { title = ''; }
        if (type === void 0) { type = BtnType.small_draw; }
        if (label === void 0) { label = ''; }
        if (img === void 0) { img = ''; }
        _super.call(this);
        this._handler = _handler;
        this.component = document.createElement("button");
        if (this._handler)
            this.component.addEventListener("click", this._handler);
        if (title != '') {
            this.component.title = title;
        }
        switch (type) {
            case BtnType.tree_item:
                this.component.className = 'tree-btn';
                break;
            case BtnType.layer_item:
                this.component.className = 'layer-item-btn';
                break;
            case BtnType.layer_btn:
                this.component.className = 'layer-btn';
                break;
            case BtnType.small_edit:
                this.component.className = 'small-btn manage-btn';
                break;
            case BtnType.small_draw:
                this.component.className = 'small-btn draw-btn';
                break;
            case BtnType.long:
                this.component.className = 'long-btn';
                break;
            default:
                this.component.className = 'small-btn';
                break;
        }
        this.component.classList.add('btn');
        if (label != '') {
            this.component.innerHTML = label;
        }
        if (img != '') {
            this.component.style.backgroundImage = 'url(' + img + ')';
            this.component.style.backgroundSize = 'cover';
            this.component.style.backgroundRepeat = "norepeat";
        }
    }
    Button.prototype.enable = function () {
        this.component.removeEventListener("click", this._handler);
        if (this._handler)
            this.component.addEventListener("click", this._handler);
        this.component.style.opacity = '1';
    };
    Button.prototype.disable = function () {
        this.component.removeEventListener("click", this._handler);
        this.component.style.opacity = '0.5';
    };
    return Button;
})(ComponentBase);
//# sourceMappingURL=Button.js.map