var EPanelOrientation;
(function (EPanelOrientation) {
    EPanelOrientation[EPanelOrientation["HORIZONTAL"] = 0] = "HORIZONTAL";
    EPanelOrientation[EPanelOrientation["VERTICAL"] = 1] = "VERTICAL";
})(EPanelOrientation || (EPanelOrientation = {}));
var PanelBase = (function () {
    function PanelBase(_editor) {
        this._editor = _editor;
        this._allComponent = [];
        this.btnContainer = document.createElement("div");
        this.btnContainer.style.cssFloat = "left";
        this.createBtns();
    }
    PanelBase.prototype.createBtns = function () { };
    PanelBase.prototype.appendComponent = function (component) {
        this.btnContainer.appendChild(component.component);
        this._allComponent.push(component);
        return component;
    };
    PanelBase.prototype.dockTo = function (dock, orientation) {
        if (orientation === void 0) { orientation = EPanelOrientation.VERTICAL; }
        if (orientation == EPanelOrientation.VERTICAL)
            this.btnContainer.style.paddingTop = "5px";
        else if (orientation == EPanelOrientation.HORIZONTAL)
            this.btnContainer.style.paddingLeft = "5px";
        dock.appendChild(this.btnContainer);
    };
    PanelBase.prototype.enable = function () {
        this._allComponent.forEach(function (comp) { comp.enable(); });
    };
    PanelBase.prototype.disable = function () {
        this._allComponent.forEach(function (comp) { comp.disable(); });
    };
    return PanelBase;
})();
//# sourceMappingURL=PanelBase.js.map