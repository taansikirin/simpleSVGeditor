var SVGEditor = (function () {
    function SVGEditor() {
        this._parent = document.getElementById("stage");
        this._topDock = document.getElementById("topDock");
        this._leftDock = document.getElementById("leftDock");
        this._layerList = LayerList.instance;
        this._svgStage = SVGStage.instance;
        this._c = 0;
        this._svgStage.initSVGStage(this._parent, this); //inicializace svgStage musi probehnout az v dobe, kdy je parent v DOM
        this.createPanels();
        this._svgParser = new SVGParser();
        this._layerList.init(this._svgParser);
        this._animation = new Animation(this);
        // this._parent.addEventListener("keypress", this.svgStageKeyPressHandler.bind(this));
    }
    SVGEditor.prototype.createPanels = function () {
        this._drawPanel = new DrawPanel(this);
        this._editPanel = new EditPanel(this);
        this._deletePanel = new DeletePanel(this);
        this._mixPanel = new MixPanel(this);
        this._elementPropPanel = new ElementPropertyPanel(this);
        this._drawPanel.dockTo(this._leftDock, null);
        this._editPanel.dockTo(this._leftDock, EPanelOrientation.VERTICAL);
        this._deletePanel.dockTo(this._leftDock, EPanelOrientation.VERTICAL);
        this._mixPanel.dockTo(this._topDock, EPanelOrientation.HORIZONTAL);
        this._elementPropPanel.dockTo(this._topDock, EPanelOrientation.HORIZONTAL);
    };
    SVGEditor.prototype.enableEditBtn = function () {
        this._editPanel.enable();
    };
    SVGEditor.prototype.disableEditBtn = function () {
        this._editPanel.disable();
    };
    SVGEditor.prototype.enableAllBtn = function () {
        this._drawPanel.enable();
        this._deletePanel.enable();
        this._editPanel.enable();
    };
    SVGEditor.prototype.disableAllBtn = function () {
        this._drawPanel.disable();
        this._deletePanel.disable();
        this._editPanel.disable();
    };
    // private svgStageKeyPressHandler(e: KeyboardEvent): void {
    //     console.log("key press: " + e.charCode + ", " + String.fromCharCode(e.charCode));
    //     if (e.charCode == 101) { //e ~ end
    //         
    //     } else if (e.charCode == 99) {// c ~ clear
    //         this.removeAllPolygons();
    //     } else if (e.charCode == 97) {// a ~ add polygon in existing (last) g element
    //         this.appendToActualShape();
    //     } else if (e.charCode == 100) { //d ~ delete selected
    //         this.removeSelectedPolygons();
    //     } else if (e.charCode == 112) { //p ~ new polygon
    //         this.createNewPolygon();
    //     } else if (e.charCode == 114) { //r ~ new rectangle
    //         this.createNewRectangle();
    //     } else if (e.charCode == 107) { //k ~ new circle
    //         this.createNewCircle();
    //     }
    // }
    SVGEditor.prototype.createNewPolygon = function () {
        this._actualType = ElementType.polygon;
        this.tmpShape = new Polygon();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    };
    SVGEditor.prototype.createNewRectangle = function () {
        this._actualType = ElementType.rectangle;
        this.tmpShape = new Rectangle();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    };
    SVGEditor.prototype.createNewCircle = function () {
        this._actualType = ElementType.circle;
        this.tmpShape = new Circle();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    };
    SVGEditor.prototype.createNewPolyline = function () {
        this._actualType = ElementType.polyline;
        this.tmpShape = new Polyline();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    };
    SVGEditor.prototype.finishActual = function (finalPoints) {
        this._svgStage.removeFromStage(this.tmpShape.element);
        // console.log("finish actualLayer id: "+LayerList.instance.actualLayer.layerElement.id);
        this.tmpShape.setCoordinates(finalPoints, true);
        LayerList.instance.actualLayer.addElement(this.tmpShape);
        if (this._svgParser.popup.open)
            this.showSVGcode();
    };
    // public appendToActualShape():void{
    //     switch(this._actualType){
    //             case ElementType.polygon:
    //                 this._actualLayer.addPolygon();
    //                 break;
    //             case ElementType.rectangle:
    //                 this._actualLayer.addRectangle();
    //                 break;
    //             case ElementType.circle:
    //                 this._actualLayer.addCircle();
    //                 break;
    //             default:
    //                 break;        
    //         }
    //         this._svgStage.canClick = true;
    // }
    SVGEditor.prototype.removeSelectedCp = function () {
        if (this._svgStage.editedShape)
            this._svgStage.editedShape.removeControlPoints();
        if (this._svgParser.popup.open)
            this.showSVGcode();
    };
    SVGEditor.prototype.removeSelectedPolygons = function () {
        this._layerList.removeElements(ERemove.remove_selected);
    };
    SVGEditor.prototype.removeAllPolygons = function () {
        this._layerList.removeElements(ERemove.remove_all);
        this.enableAllBtn();
    };
    SVGEditor.prototype.showSVGcode = function () {
        this._svgParser.showCode(SVGStage.instance.mainStage.cloneNode(true), 'cpstore');
    };
    SVGEditor.prototype.changeColor = function (props) {
        this._layerList.getSelectedElements().forEach(function (selEl) { selEl.setStyle(props.fill, props.opacity, props.width, props.stroke, true); });
    };
    SVGEditor.prototype.setAnimation = function () {
        this._animation.showAnimEditor();
    };
    SVGEditor.DISABLE_CREATE_BTNS = "disableCreateBtns";
    SVGEditor.DISABLE_EDIT_BTNS = "disableEditBtns";
    SVGEditor.ENABLE_BTNS = "enableBtns";
    return SVGEditor;
})();
//# sourceMappingURL=SVGEditor.js.map