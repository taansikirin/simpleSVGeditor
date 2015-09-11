class SVGEditor {
    
    public static DISABLE_CREATE_BTNS: string = "disableCreateBtns";
    public static DISABLE_EDIT_BTNS: string = "disableEditBtns";
    public static ENABLE_BTNS: string = "enableBtns";
    
    private _parent: HTMLElement = document.getElementById("stage");
    private _topDock:HTMLElement = document.getElementById("topDock");
    private _leftDock:HTMLElement = document.getElementById("leftDock");
    
    private _drawPanel:PanelBase;
    private _editPanel:PanelBase;
    private _deletePanel:PanelBase;
    private _mixPanel:PanelBase;
    private _elementPropPanel:PanelBase;
    
    private _layerList:LayerList = LayerList.instance;
    private _svgStage: SVGStage = SVGStage.instance;
    private _svgParser:SVGParser;
    private _animation:Animation;
    private _c: number = 0;
    
    private _actualLayer: Layer;
    private _actualType: ElementType;
    public tmpShape: ElementBase;

    constructor() {
        this._svgStage.initSVGStage(this._parent, this); //inicializace svgStage musi probehnout az v dobe, kdy je parent v DOM
        this.createPanels();

        this._svgParser = new SVGParser();
        this._layerList.init(this._svgParser);
        this._animation = new Animation(this);
        // this._parent.addEventListener("keypress", this.svgStageKeyPressHandler.bind(this));
    }
    
    private createPanels():void{
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
    }
    
    public enableEditBtn():void{
        this._editPanel.enable();
    }
    
    public disableEditBtn():void{
        this._editPanel.disable();
    }
    
    public enableAllBtn():void{
        this._drawPanel.enable();
        this._deletePanel.enable();
        this._editPanel.enable();
    }
    
    public disableAllBtn():void{
        this._drawPanel.disable();
        this._deletePanel.disable();
        this._editPanel.disable();
    }


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

    public createNewPolygon(): void {
        this._actualType = ElementType.polygon;
        this.tmpShape = new Polygon();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    }
    
    public createNewRectangle(): void {
        this._actualType = ElementType.rectangle;
        this.tmpShape = new Rectangle();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    }
    
    public createNewCircle(): void {
        this._actualType = ElementType.circle;
        this.tmpShape = new Circle();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    }
    
    public createNewPolyline(): void {
        this._actualType = ElementType.polyline;
        this.tmpShape = new Polyline();
        this._svgStage.appedToSVGStage(this.tmpShape.element);
    }
    
    public finishActual(finalPoints:Array<Point>):void{
        this._svgStage.removeFromStage(this.tmpShape.element);
        // console.log("finish actualLayer id: "+LayerList.instance.actualLayer.layerElement.id);
        this.tmpShape.setCoordinates(finalPoints, true);
        LayerList.instance.actualLayer.addElement(this.tmpShape);
        if(this._svgParser.popup.open) this.showSVGcode();
    }
    
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
    
    public removeSelectedCp():void{
        if(this._svgStage.editedShape) this._svgStage.editedShape.removeControlPoints();
        if(this._svgParser.popup.open) this.showSVGcode();
    }
    
    public removeSelectedPolygons(): void {
        this._layerList.removeElements(ERemove.remove_selected);
    }

    public removeAllPolygons(): void {
        this._layerList.removeElements(ERemove.remove_all);
        this.enableAllBtn();
    }

    public showSVGcode():void{
        this._svgParser.showCode(<SVGElement>SVGStage.instance.mainStage.cloneNode(true), 'cpstore');
    }
    
    public changeColor(props:IProp):void{
        this._layerList.getSelectedElements().forEach(selEl => {selEl.setStyle(props.fill, props.opacity, props.width, props.stroke, true)});
    }
    
    public setAnimation():void{
        this._animation.showAnimEditor();
    }
}