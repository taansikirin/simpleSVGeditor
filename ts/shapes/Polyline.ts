class Polyline extends ElementBase{
	
	private _polyline: SVGPolylineElement;
    
    constructor(id?:string) {
        super();
        
        this._polyline = <SVGPolylineElement>document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        this._polyline.setAttribute("class",'polyline');
        if(id != undefined){
            this._polyline.id = id;
        }
        this._element = this._polyline; //TODO mozna by to mohlo byt primo vytvarene do elementu predka a this._polygon plne nahradit this._element (pozor na nastaveni stylu v editON/OFF)
        this.type = ElementType.polyline;
        // this.gElement.appendChild(this._polyline);
        this._fill = 'none';
        this.setStyle('none', 0.5, 1, '#73ffff');
    }

    public controlPointMoved(e: CustomEvent): void {
        this.setCoordinates(this._controlPointStore.elementsList);
    }

    public setCoordinates(coords:Array<Point>, finished:boolean = false):void{
        super.setCoordinates(coords, finished);
        this._polyline.setAttribute("points", Utils.convertPointListToString(coords));
    }
    
    public editModeOn(): void {
        super.editModeOn();
        this.setStyle('', 0.5, 3, '#73ffff');
    }
}