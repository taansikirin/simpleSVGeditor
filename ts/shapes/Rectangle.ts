class Rectangle extends ElementBase {
	
	private _rect:SVGRectElement;
	
	constructor(id?:string){
		super();
		
		this._rect = <SVGRectElement>document.createElementNS("http://www.w3.org/2000/svg","rect");
		if(id != undefined){
			this._rect.id = id;
		}
		this._element = this._rect;
		this.type = ElementType.rectangle;
		// this.gElement.appendChild(this._rect);
		this.setStyle('lightblue', 0.5, 1, '#73ffff');
	}
	
	public controlPointMoved(e: CustomEvent): void {
		this._vertexes = [];
		this._vertexes = this._controlPointStore.elementsList;
        this.setDimensions();
    }
	
	private setDimensions():void{
		var first:Point = this._vertexes[0];
		var second:Point = this._vertexes[1];
		
		if(first.x - second.x > 0 && first.y - second.y > 0){
			//x+, y+
			this.x = this._vertexes[1].x;
			this.y = this._vertexes[1].y;
		} else if (first.x - second.x > 0 && first.y - second.y < 0){
			//x+, y-
			this.x = this._vertexes[1].x;
			this.y = this._vertexes[0].y;
		} else if (first.x - second.x < 0 && first.y - second.y > 0){
			//x-, y+
			this.x = this._vertexes[0].x;
			this.y = this._vertexes[1].y;
		} else if (first.x - second.x == 0 || first.y - second.y == 0){
			// console.log("crverec o delce hrany 0px je nesmysl.");
		} else{
			//x-, y-
			this.x = this._vertexes[0].x;
			this.y = this._vertexes[0].y;
		}
		
		this.width = Math.abs(second.x - first.x);
		this.height = Math.abs(second.y - first.y);
	}
	
	private set x(value:number){
		this._rect.setAttribute("x", String(value));
	}
	
	private set y(value:number){
		this._rect.setAttribute("y", String(value));
	}
	
	private set width(value:number){
		this._rect.setAttribute("width", String(value));
	}
	
	private set height(value:number){
		this._rect.setAttribute("height", String(value));
	}
	
	public setCoordinates(coords:Array<Point>, finished:boolean = false):void{
        super.setCoordinates(coords.slice(0,2), finished);
		this.setDimensions();
    }
}