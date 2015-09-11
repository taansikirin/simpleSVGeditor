var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Combo = (function (_super) {
    __extends(Combo, _super);
    function Combo(_handler, listId, valueList, placeHolder, title, defaultValue) {
        if (title === void 0) { title = ''; }
        _super.call(this);
        this._handler = _handler;
        this.component = document.createElement("div");
        var dataList = document.createElement("datalist");
        dataList.id = listId;
        valueList.forEach(function (value) {
            var option = document.createElement("option");
            option.value = value;
            dataList.appendChild(option);
        });
        this._combo = document.createElement("input");
        this._combo.type = "text";
        // this._combo.list = dataList; //does not work
        this._combo.setAttribute("list", dataList.id);
        this._combo.className = 'input';
        this._combo.style.width = "100%";
        if (this._handler)
            this._combo.addEventListener("input", this._handler);
        this._combo.placeholder = placeHolder;
        if (title != undefined || title != '')
            this._combo.title = title;
        if (defaultValue)
            this._combo.defaultValue = defaultValue;
        this.component.appendChild(this._combo);
        this.component.appendChild(dataList);
    }
    Combo.prototype.enable = function () {
        this._combo.removeEventListener("input", this._handler);
        if (this._handler)
            this._combo.addEventListener("input", this._handler);
        this._combo.removeAttribute("disabled");
        this._combo.style.opacity = '1';
    };
    Combo.prototype.disable = function () {
        this._combo.removeEventListener("input", this._handler);
        this._combo.setAttribute("disabled", "disabled");
        this._combo.style.opacity = '0.5';
    };
    Object.defineProperty(Combo.prototype, "value", {
        get: function () {
            return this._combo.value;
        },
        enumerable: true,
        configurable: true
    });
    return Combo;
})(ComponentBase);
//# sourceMappingURL=Combo.js.map