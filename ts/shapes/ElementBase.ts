interface IElementBase {
    gElement:SVGGElement;//element sdruzujici veskerou grafiku daneho polygonu (polygon, kontrolni body)
    // type:ElementType;
    enable():void;
    disable():void;
    setCoordinates(coords:Array<Point>):void;
}

class ElementBase implements IElementBase {
    
    public static POLYGON_CLICK: string = "polygonClick";
    public type:ElementType;
    public gElement:SVGGElement;
    protected _element:any;
    protected _vertexes: Array<Point>;
    protected _controlPointStore: ControlPointStore;
    public selected:boolean = false;
    public editMode:boolean = false;
    public layer:Layer;
    public treeItem:LayerTreeItem;
    protected _fill:string = '#F2FF4F';
    protected _stroke:string = '#2465FF';
    protected _strokeWidth:number = 1;
    protected _opacity:number = 0.59;
    
    private _elementClickHandler: any = this.elementClickHandler.bind(this);
    private _dblClickHandler: any = this.polygonDblClickHandler.bind(this);
    private _cpmoveHandler: any = this.controlPointMoved.bind(this);
    private _overHandler:any = this.mouseoverHandler.bind(this);
    private _outHandler:any = this.mouseoutHandler.bind(this);
    
    constructor(){
        this._vertexes = [];
        this.gElement = <SVGGElement>document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        this._controlPointStore = new ControlPointStore();
        this.gElement.appendChild(this._controlPointStore.storeElement);
        
        Utils.dispatchCreatingStart({data:this});
    }
        
    public enable(): void {
        // console.log("element enable");
        this.gElement.addEventListener("click", this._elementClickHandler);
        this._element.addEventListener("mouseover", this._overHandler);
        this._element.addEventListener("mouseout", this._outHandler);
        if (!this.editMode) {
            this._element.addEventListener("dblclick", this._dblClickHandler);
        }
        this.treeItem.enable();
    }

    public disable(): void {
        this.gElement.removeEventListener("click", this._elementClickHandler);
        this._element.removeEventListener("mouseover", this._overHandler);
        this._element.removeEventListener("mouseout", this._outHandler);
        if (!this.editMode) {
            this._element.removeEventListener("dblclick", this._dblClickHandler);
        }
        this.treeItem.disable();
    }
    
    public removeClickHandles():void{
        this.gElement.removeEventListener("click", this._elementClickHandler);
        this._element.removeEventListener("dblclick", this._dblClickHandler);
    }
    
    public addClickHandlers():void{ //TODO po pripadnem smazani animace je mozne handlery opet pridat
        this.gElement.addEventListener("click", this._elementClickHandler);
        this._element.addEventListener("dblclick", this._dblClickHandler);
    }
    
    public elementClickHandler(e: MouseEvent): void {
        // console.log("element click handler");
        this.selected = !this.selected;
        
        var fillColor: string = null;
        var stroke:string = null;
        var strokeWidth:number = null;
        this.treeItem.body.style.backgroundColor = 'transparent';
        if (this.selected) {
            fillColor = '#fa734b';
            stroke = fillColor;
            strokeWidth = 3;
            this.treeItem.body.style.backgroundColor = fillColor;
        }

        if (this.type == ElementType.polyline){
           this.setStyle('none', 1, strokeWidth, stroke); 
        } else {
            this.setStyle(fillColor);
        }
        
        var clickEvent: CustomEvent = <CustomEvent>document.createEvent("CustomEvent");
        clickEvent.initCustomEvent(ElementBase.POLYGON_CLICK, true, true, {});
        this.gElement.parentNode.dispatchEvent(clickEvent);
    }
    
    public polygonDblClickHandler(e: MouseEvent): void {
        this.editMode = !this.editMode;
        // console.log("dbl click handler - edit mode: "+this.editMode);

        if (this.editMode) {
            this.editModeOn();
        } else {
            this.editModeOff();
        }
    }
    
    private mouseoverHandler(e:MouseEvent):void{
        if(!this.selected && !this.editMode && !this.layer.layerSelected){
            this.setStyle('#F2FF4F',1,3);
            // this.element.setAttribute("filter", "url(#f3)");
        }
    }
    
    private mouseoutHandler(e:MouseEvent):void{
        if(!this.selected && !this.editMode && !this.layer.layerSelected){
            this.setStyle();
            // this.element.removeAttribute("filter");
        }
    }
    
    public deselect(): void {
        // console.log("element deselect");
        this.selected = false;
        this.setStyle();
        this.treeItem.body.style.backgroundColor = 'transparent';
    }
    
    public editModeOn(): void {
        Utils.dispatchEditingStart({data:this});
        this.setStyle('lightblue', 0.5, 1, '#73ffff');
        this._element.addEventListener(ControlPoint.CONTROL_POINT_MOVED, this._cpmoveHandler);
        this.displayControlPoints();
    }

    public editModeOff(): void {
        Utils.dispatchEditingStop({data:this});
        
        this.setStyle();
        this.hideControlPoints();
        this._element.removeEventListener(ControlPoint.CONTROL_POINT_MOVED, this._cpmoveHandler)
    }
    
    public setStyle(fill?: string, opacity?: number, strokeWidth?: number, strokeColor?: string, setPermanent:boolean = false): void {
        
        if(this.type != ElementType.polyline){
            if(fill != undefined && fill != '') {
                this._element.style.fill = fill;
                if(setPermanent) this._fill = fill;
            }
            else {this._element.style.fill = this._fill;}
        }else{
            this._element.style.fill = 'none';
        }
        
        if(opacity != undefined) {
            this._element.style.fillOpacity = String(opacity);
            if(setPermanent) this._opacity = opacity;
        }
        else {this._element.style.fillOpacity = String(this._opacity);}
        
        if(strokeWidth != undefined) {
            this._element.style.strokeWidth = strokeWidth + "px";
            if(setPermanent) this._strokeWidth = strokeWidth;
        }
        else{this._element.style.strokeWidth = this._strokeWidth+'px';}
        
        if(strokeColor != undefined && strokeColor != ''){
            this._element.style.stroke = strokeColor;
            if(setPermanent) this._stroke = strokeColor;
        }
        else{this._element.style.stroke = this._stroke;}
        
    }
    
    public controlPointMoved(e: CustomEvent): void {
        
    }
    
    public displayControlPoints(): void {
        this._controlPointStore.showCPoints();
    }

    public hideControlPoints(): void {
        this._controlPointStore.hideCPoints();
    }
    
    public get element():SVGElement{
        return this._element;
    }
    
    public setCoordinates(coords:Array<Point>, finished:boolean = false):void{
        this._vertexes = coords;
        if(finished){
            this._controlPointStore.addPoints(this._vertexes, this._element);
        }
    }
    
    public removeControlPoints(): void {
        this._controlPointStore.removePoints(ERemove.remove_selected);
        if ((this.type == ElementType.polyline && this._controlPointStore.elementsList.length < 2) || (this.type != ElementType.polyline && this._controlPointStore.elementsList.length < 3)) {
            Utils.dispatchEditingStop(this);
            LayerList.instance.removeElement(this.layer,this);
        } else {
            this._cpmoveHandler(null);
        }
    }
}