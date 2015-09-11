class DeletePanel extends PanelBase{
    public remSelPol:Button;
    public remAllPol:Button;
    
    constructor(_editor:SVGEditor){
        super(_editor);
    }
    
    public createBtns():void{
        this.remSelPol = <Button>this.appendComponent(new Button(this._editor.removeSelectedPolygons.bind(this._editor), "Remove selected elements", BtnType.small_edit, "", "css/assets/removeSelectedPolyg.png"));
        this.remAllPol = <Button>this.appendComponent(new Button(this._editor.removeAllPolygons.bind(this._editor), "Remove all elements", BtnType.small_edit, "", "css/assets/removePolyg.png"));
    }
}