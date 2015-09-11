class PopUpAnim extends PopUpBase {
    
    private _animAttrib:Input;//TODO promyslet, zda toto neprehodit na combo s moznosti vstupu
    private _animFrom:Input;
    private _animTo:Input;
    private _animDur:Stepper;
    private _repeat:Input;
    private _fill:Combo;//TODO vytvorit combo bez moznosti vstupu dat od uzivatele
    
    private _animId:Input;
    private _begin:Combo;//TODO vytvorit combo bez moznosti vstupu dat od uzivatele
    private _beginExtend: Input;
    
    private _saveBtn: Button;
    
	constructor(titleText:string = '', initWidth:number = 450, initHeight:number = 510, top:number = 150, left:number = 200){
        super(titleText, initWidth, initHeight, top, left);
        this.popup.classList.add('anim-popup');
        this._animAttrib = <Input>this.addHorizontalContainer("Attribute to animate: ", new Input(this.setFromValue.bind(this),"attribute","Qualified name of attribute to animate"));
        this._animAttrib.component.style.width = "200px";
        this._animFrom = <Input>this.addHorizontalContainer("From value: ", new Input(null, "from value","Starting value"));
        this._animFrom.component.style.width = "200px";
        this._animTo = <Input>this.addHorizontalContainer("To value: ", new Input(null, "to value", "Ending value"));
        this._animTo.component.style.width = "200px";
        this._animDur = <Stepper>this.addHorizontalContainer("Duration [s]: ", new Stepper(null,"Duration of animation", 0, 0.001, 0));
        this._animDur.component.style.width = "200px";
        this._repeat = <Input>this.addHorizontalContainer("Repeat count: ", new Input(this.repeatHandler.bind(this), "repeat count", "Repeat count or 'indefinite'"));
        this._repeat.component.style.width = "200px";
        this._fill = <Combo>this.addHorizontalContainer("Fill: ", new Combo(null, "fills", ['freeze','remove'], "fill type", "Freeze - element will freeze at the last state.\nRemove - element will return to its begining state.", 'freeze'));
        this._fill.component.style.width = "200px";
        this.repeatHandler();
        
        this._animId = <Input>this.addHorizontalContainer("Animation ID: ", new Input(null, "animation id", "Animation id"));
        this._animId.component.style.width = "200px";
        
        this._beginExtend = new Input(null, "delay or id", 
            "Place animation id to bind this animation with or animation delay (like 2s, 500ms). "+
            "If you wish to set delay after start or end of another animation, place "+
            "animation id followed by space and than with delay time");
        this._beginExtend.component.style.width = "100px";
        var bindContainer = new HorizontalContainer("Start animation: ", this._beginExtend);
        this._begin = new Combo(null, "start", ['animation id start','animation id end','click','DOMloaded'], "begin of animation", "Select from a dropdown list or type when animation should begin");
        this._begin.component.style.cssText = "float:right;width:200px";
        bindContainer.component.appendChild(this._begin.component);
        this._content.appendChild(bindContainer.component);
        
        this._saveBtn = new Button(this.save.bind(this), "Save & Close", BtnType.long, "Save & close");
        this._saveBtn.component.style.cssText = "float:right;margin-top:20px;width:100px;";
        this._content.appendChild(this._saveBtn.component);
        
        //TODO tabulka s prehledem animaci -> databaze exitujicich animaci
	}
	
	public showPopUp(content?:any){
		super.showPopUp();
        //TODO pri editaci existujici animace predavat aktualni hodnoty
    }
    
    private setFromValue():void{
        var selEl:ElementBase[] = LayerList.instance.getSelectedElements(); 
        if(selEl.length == 1 && (selEl[0].element.hasAttribute(this._animAttrib.value) || selEl[0].element.hasAttributeNS('http://www.w3.org/2000/svg', this._animAttrib.value))){
            this._animFrom.component.value = selEl[0].element.getAttribute(this._animAttrib.value); 
        }
    }
    
    private repeatHandler():void{
        if(this._repeat.value == "indefinite"){
            this._fill.disable();
        }else{
            this._fill.enable();
        }
    }
    
    protected save():void{
        var fillValue:string;
        if(this._fill.component.getAttribute("disabled")){
            fillValue = null;
        }else{
            fillValue = this._fill.value;
        }
        var animParams:IAnim = {
            attribut:this._animAttrib.value,
            fromValue:this._animFrom.value,
            toValue:this._animTo.value,
            duration:this._animDur.value,
            repeatCount:this._repeat.value,
            fill:fillValue,
            id:this._animId.value,
            begin:this._begin.value,
            beginExtend:this._beginExtend.value
        }
        super.save(animParams);
    }
}