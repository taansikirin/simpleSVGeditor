enum ElementType {
    polygon,
    rectangle,
    circle,
    polyline
}

class Layer {
    public static DESELECT:string = "deselectLayer";
    public layerSelected: boolean = false;

    private _layerElement: SVGGElement;
    private _actualShape: ElementBase;
    private _elements: Array<ElementBase> = [];
    public layerItem:LayerItem;
    
    constructor(public id: string, elementType?: ElementType) {
        this._layerElement = <SVGGElement>document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._layerElement.id = this.id;
        
        SVGStage.instance.appedToSVGStage(this._layerElement);
        SVGStage.instance.addChildClass(this);
        
        this.layerItem = new LayerItem(this);
        this.select();
    }

    public addPolygon(): void {
        this._actualShape = new Polygon();
        this.addActual();
    }
    
    public addRectangle():void{
        this._actualShape = new Rectangle();
        this.addActual();
    }
    
    public addCircle():void{
        this._actualShape = new Circle();
        this.addActual();
    }
    
    private addPolyline():void{
        this._actualShape = new Polyline();
        this.addActual();
    }
    
    private addActual():void{
        this._elements.push(this._actualShape);
        this._layerElement.appendChild(this._actualShape.gElement);
        this._actualShape.layer = this;
    }
    
    public addElement(element:ElementBase):void{
        this._elements.push(element);
        this._layerElement.appendChild(element.gElement);
        element.gElement.insertBefore(element.element,element.gElement.childNodes[0]);
        element.layer = this;
        element.treeItem = this.layerItem.addTreeItem(element);
    }
    
    public removeElement(toRemove: ElementBase, callRemoveLayer:boolean = true): void {
        // console.log("remove element");
        this._layerElement.removeChild(toRemove.gElement);
        this._elements.splice(this.elementsList.indexOf(toRemove), 1);
        this._actualShape = undefined;
        if (!this._elements.length && callRemoveLayer) { //pokud byl smazan posledni element ve vrstve, tak se smaze i vrstva sama (pokud neni posledni)
            LayerList.instance.removeLayer(this.id);
        }
    }
    
    public onLayerRemove():void{
        this.layerItem.body.parentElement.removeChild(this.layerItem.body);
        this.layerItem = null;
    }
    
    public setCoordinates(coords:Array<Point>, finished?:boolean):void{
        this._actualShape.setCoordinates(coords, finished);
    }
    
    public layerSelectHandler(): void {
        this.layerSelected = !this.layerSelected;
        // console.log("layerSelected: " + this.layerSelected);

        var fillColor: string = null;
        var stroke:string = null;
        var strokeWidth:number = null;
        if (this.layerSelected) {
            LayerList.instance.actualLayer = this;
            fillColor = '#fa734b';
            strokeWidth = 3;
        }
        
        var self=this;
        this._elements.forEach(function (pol: ElementBase) {
            pol.selected = self.layerSelected;
            if (pol.type == ElementType.polyline){
               pol.setStyle('none', 1, strokeWidth, stroke); 
            } else {
                pol.setStyle(fillColor);
            }
        });
    }

    private select(): void {
        this.layerSelected = true;
        this._elements.forEach(function (pol: ElementBase) {
            if (pol.type == ElementType.polyline){
               pol.setStyle('none', 1, 3, '#fa734'); 
            } else {
                pol.setStyle('#fa734b');
            }
        });
    }
    
    public deselect(drawNew:boolean = false): void {
        // console.log("deselect method");
        this.layerSelected = false;
        if(!drawNew) this.layerItem.body.style.backgroundColor = 'transparent';
        this.elementsList.forEach(function (pol: ElementBase) {
            pol.deselect();
            pol.setStyle();
        });
    }

    public get elementsList(): Array<ElementBase> {
        return this._elements;
    }

    public enable(): void {
        this.deselect(true);
        this.elementsList.forEach(function (pol: ElementBase) {
            pol.enable();
        });
    }
    public disable(): void {
        this.deselect(true);
        this.elementsList.forEach(function (pol: ElementBase) {
            pol.disable();
        });
    }
    
    public show(): void {
        this._layerElement.style.visibility = "visible";
    }

    public hide(): void {
        this._layerElement.style.visibility = "hidden";
        var self=this;
        this.elementsList.forEach(p => {
            if (self.layerSelected) {
                p.elementClickHandler(null);
            } else if (p.editMode) {
                p.polygonDblClickHandler(null);
            }
        });
    }
    
    public get layerElement():SVGGElement{
        return this._layerElement;
    }
}



