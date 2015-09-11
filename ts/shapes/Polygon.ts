class Polygon extends ElementBase {

    private _polygon: SVGPolygonElement;
    
    constructor(id?:string) {
        super();
        
        this._polygon = <SVGPolygonElement>document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        if(id != undefined){
            this._polygon.id = id;
        }
        this._element = this._polygon; //TODO mozna by to mohlo byt primo vytvarene do elementu predka a this._polygon plne nahradit this._element (pozor na nastaveni stylu v editON/OFF)
        this.type = ElementType.polygon;
        // this.gElement.appendChild(this._polygon);
        this.setStyle('lightblue', 0.5, 1, '#73ffff');
    }

    public controlPointMoved(e: CustomEvent): void {
        this.setCoordinates(this._controlPointStore.elementsList);
    }

    public setCoordinates(coords:Array<Point>, finished:boolean = false):void{
        super.setCoordinates(coords, finished);
        this._polygon.setAttribute("points", Utils.convertPointListToString(coords));
    }
}