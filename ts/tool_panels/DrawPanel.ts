class DrawPanel extends PanelBase{
    
    public circleBtn:Button;
    public rectBtn:Button;
    public polygBtn:Button;
    public polylineBtn:Button;
    public appendBtn:Button;
    
    constructor(_editor:SVGEditor){
        super(_editor);
    }
    
    public createBtns():void{
        this.circleBtn = <Button>this.appendComponent(new Button(this._editor.createNewCircle.bind(this._editor), "Create new circle", BtnType.small_draw, "", "css/assets/addCircle.png"));
        this.rectBtn = <Button>this.appendComponent(new Button(this._editor.createNewRectangle.bind(this._editor), "Create new rectangle", BtnType.small_draw, "", "css/assets/addRect.png"));
        this.polygBtn = <Button>this.appendComponent(new Button(this._editor.createNewPolygon.bind(this._editor), "Create new polygon", BtnType.small_draw, "", "css/assets/addPolyg.png"));
        this.polylineBtn = <Button>this.appendComponent(new Button(this._editor.createNewPolyline.bind(this._editor), "Create new polyline", BtnType.small_draw, "", "css/assets/addPolyline.png"));
        // this.appendBtn = <Button>this.appendComponent(new Button(this._editor.appendToActualShape.bind(this._editor), "Append last type of shape to the last elements group", BtnType.small_edit, "A"));
    }
}