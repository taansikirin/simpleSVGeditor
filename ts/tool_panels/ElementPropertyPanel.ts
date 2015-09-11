interface IProp{
    fill: string;
    stroke: string;
    width: number;
    opacity: number;
}

class ElementPropertyPanel extends PanelBase{
    public fillBtn:Input;
    public strokeColorBtn: Input;
    public strokeWidthStepper:Stepper;
    public opacityStepper:Stepper; 
    
    constructor(_editor:SVGEditor){
        super(_editor);
    }
    
    public createBtns():void{
        this.fillBtn = <Input>this.appendComponent(new Input(this.changeHandler.bind(this), '# fill color.', 'Fill color', '#F2FF4F'));
        this.strokeColorBtn = <Input>this.appendComponent(new Input(this.changeHandler.bind(this), '# stroke color.', 'Stroke color', '#2465FF'));
        this.strokeWidthStepper = <Stepper>this.appendComponent(new Stepper(this.changeHandler.bind(this), 'Stroke width', 1, 1, 0));
        this.strokeWidthStepper.component.style.width = "65px";
        this.opacityStepper = <Stepper>this.appendComponent(new Stepper(this.changeHandler.bind(this), 'Opacity', 0.6, 0.1, 0, 1));
        this.opacityStepper.component.style.width = "65px";
    }
    
    private changeHandler():void{
        var prop:IProp = {
            fill: this.fillBtn.value,
            stroke: this.strokeColorBtn.value,
            width: this.strokeWidthStepper.value,
            opacity: this.opacityStepper.value
        }
        
        this._editor.changeColor(prop);
    }
}