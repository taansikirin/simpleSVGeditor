var LayerTreeItem = (function () {
    function LayerTreeItem(_layer, _element) {
        this._layer = _layer;
        this._element = _element;
        this.clickHandler = this.treeItemClickHandler.bind(this);
        this.dblClickHandler = this.treeItemDblClickHandler.bind(this);
        this.body = document.createElement("div");
        this.body.style.cssText = "width:103px;height:15px;margin-left:30px;box-sizing:border-box;float:left;margin-top:5px;";
        this._typeIcon = document.createElement("div");
        this._typeIcon.className = 'tree-item';
        var icon = '';
        var elName = '';
        switch (this._element.type) {
            case ElementType.circle:
                icon = "addCircle.png";
                elName = "circle";
                break;
            case ElementType.rectangle:
                icon = "addRect.png";
                elName = "rectangle";
                break;
            case ElementType.polyline:
                icon = "addPolyline.png";
                elName = "polyline";
                break;
            default:
                icon = "addPolyg.png";
                elName = "polygon";
                break;
        }
        this._typeIcon.style.backgroundImage = "url(css/assets/" + icon + ")";
        this._typeIcon.style.backgroundSize = "cover";
        this._typeIcon.style.backgroundRepeat = "no-repeat";
        this.body.appendChild(this._typeIcon);
        this._elementName = document.createElement("input");
        this._elementName.type = "text";
        this._elementName.addEventListener("change", this.elementNameChanged.bind(this));
        this._elementName.value = elName;
        this._elementName.className = 'tree-item';
        this._elementName.style.cssText = "width:68px;padding:0px 0px 0px 5px;height:15px;overflow:hidden;border:none;background-color:transparent;font-size:13px;";
        if (Utils.detectFirefox()) {
            this._elementName.style.cssText += "font-weight:bold;";
        }
        this.elementNameChanged();
        this.body.appendChild(this._elementName);
        this._deleteBtn = new Button(this.deleteTreeItem.bind(this), "Remove element", BtnType.tree_item, "", "css/assets/remove.png");
        this.body.appendChild(this._deleteBtn.component);
    }
    LayerTreeItem.prototype.deleteTreeItem = function () {
        LayerList.instance.removeElement(this._layer, this._element);
    };
    LayerTreeItem.prototype.treeItemClickHandler = function () {
        this._element.elementClickHandler(null);
    };
    LayerTreeItem.prototype.treeItemDblClickHandler = function () {
        this._element.polygonDblClickHandler(null);
    };
    LayerTreeItem.prototype.elementNameChanged = function () {
        this._element.element.setAttribute('name', this._elementName.value);
    };
    LayerTreeItem.prototype.enable = function () {
        this._typeIcon.addEventListener("click", this.clickHandler);
        if (!this._element.editMode)
            this._typeIcon.addEventListener("dblclick", this.dblClickHandler);
    };
    LayerTreeItem.prototype.disable = function () {
        this._typeIcon.removeEventListener("click", this.clickHandler);
        if (!this._element.editMode)
            this._typeIcon.removeEventListener("dblclick", this.dblClickHandler);
    };
    return LayerTreeItem;
})();
//# sourceMappingURL=LayerTreeItem.js.map