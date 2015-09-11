class EditPanel extends PanelBase{
    public remCP:Button;
    
    constructor(_editor:SVGEditor){
        super(_editor);
    }
    
    public createBtns():void{
        this.remCP = <Button>this.appendComponent(new Button(this._editor.removeSelectedCp.bind(this._editor), "Remove selected control points", BtnType.small_edit, "", "css/assets/removeCP.png"));
        this.disable();
    }
}