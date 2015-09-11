var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Input = (function (_super) {
    __extends(Input, _super);
    function Input(_handler, placeHolder, title, defaultValue) {
        if (title === void 0) { title = ''; }
        _super.call(this);
        this._handler = _handler;
        this.component = document.createElement("input");
        this.component.type = "text";
        this.component.className = 'input';
        if (this._handler)
            this.component.addEventListener("input", this._handler);
        this.component.placeholder = placeHolder;
        if (title != undefined || title != '')
            this.component.title = title;
        if (defaultValue)
            this.component.defaultValue = defaultValue;
    }
    Input.prototype.enable = function () {
        this.component.removeEventListener("input", this._handler);
        if (this._handler)
            this.component.addEventListener("input", this._handler);
        this.component.removeAttribute("disabled");
        this.component.style.opacity = '1';
    };
    Input.prototype.disable = function () {
        this.component.removeEventListener("input", this._handler);
        this.component.setAttribute("disabled", "disabled");
        this.component.style.opacity = '0.5';
    };
    Object.defineProperty(Input.prototype, "value", {
        get: function () {
            return this.component.value;
        },
        enumerable: true,
        configurable: true
    });
    return Input;
})(ComponentBase);
//# sourceMappingURL=Input.js.map