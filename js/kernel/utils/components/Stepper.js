var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Stepper = (function (_super) {
    __extends(Stepper, _super);
    function Stepper(_handler, title, defaultValue, step, min, max) {
        if (title === void 0) { title = ''; }
        _super.call(this);
        this._handler = _handler;
        this.component = document.createElement("input");
        this.component.type = "number";
        this.component.className = 'stepper';
        if (this._handler)
            this.component.addEventListener("input", this._handler);
        if (title != undefined || title != '')
            this.component.title = title;
        if (defaultValue != undefined)
            this.component.value = String(defaultValue);
        if (step != undefined)
            this.component.step = String(step);
        if (min != undefined)
            this.component.min = String(min);
        if (max != undefined)
            this.component.max = String(max);
    }
    Stepper.prototype.enable = function () {
        this.component.removeEventListener("input", this._handler);
        if (this._handler)
            this.component.addEventListener("input", this._handler);
        this.component.removeAttribute("disabled");
        this.component.style.opacity = '1';
    };
    Stepper.prototype.disable = function () {
        this.component.removeEventListener("input", this._handler);
        this.component.setAttribute("disabled", "disabled");
        this.component.style.opacity = '0.5';
    };
    Object.defineProperty(Stepper.prototype, "value", {
        get: function () {
            return Number(this.component.value);
        },
        enumerable: true,
        configurable: true
    });
    return Stepper;
})(ComponentBase);
//# sourceMappingURL=Stepper.js.map