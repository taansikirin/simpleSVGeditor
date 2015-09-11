class MixPanel extends PanelBase{
    public showCodeBtn:Button;
    public animateBtn:Button;
    
    constructor(_editor:SVGEditor){
        super(_editor);
    }
    
    public createBtns():void{
        this.showCodeBtn = <Button>this.appendComponent(new Button(this._editor.showSVGcode.bind(this._editor), "Show SVG code", BtnType.long, "Show code"));
        this.animateBtn = <Button>this.appendComponent(new Button(this._editor.setAnimation.bind(this._editor), "Add animation to selected elements.", BtnType.long, "Animate"));
    }
}