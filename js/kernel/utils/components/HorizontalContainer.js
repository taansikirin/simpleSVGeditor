var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HorizontalContainer = (function (_super) {
    __extends(HorizontalContainer, _super);
    function HorizontalContainer(label, component) {
        _super.call(this);
        this.component = document.createElement("div");
        this.component.className = 'horizontal-container';
        var labelElement = document.createElement("div");
        labelElement.className = 'horizontal-container-label';
        labelElement.innerHTML = label;
        component.component.style.cssFloat = "right";
        this.component.appendChild(labelElement);
        this.component.appendChild(component.component);
    }
    return HorizontalContainer;
})(ComponentBase);
//# sourceMappingURL=HorizontalContainer.js.map