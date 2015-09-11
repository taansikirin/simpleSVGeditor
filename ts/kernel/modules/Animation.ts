interface IAnim{
    id?:string;
    begin:string;
    beginExtend:string;
    attribut:string;
    fromValue:string;
    toValue:string;
    duration:number;
    repeatCount:string;
    fill:string;
}

class Animation{
    
    private _animationList: Array<IAnim> = [];
    
    constructor(private _editor:SVGEditor){}
    
    public showAnimEditor():void{
        var animEditor:PopUpAnim = new PopUpAnim("Animation Editor");
        animEditor.popup.addEventListener(PopUpBase.POPUP_SAVE, this.popupCloseHandler.bind(this));
        animEditor.showPopUp();
    }
    
    public addAnimation(params:IAnim):void{
        // console.log("add animation");
        // console.log(params);
        LayerList.instance.getSelectedElements().forEach(selEl => {
            var anim:any = document.createElementNS('http://www.w3.org/2000/svg',"animate");
            anim.setAttribute("attributeName", params.attribut);
            anim.setAttribute("from", params.fromValue);
            anim.setAttribute("to", params.toValue);
            anim.setAttribute("dur", params.duration+"s");
            anim.setAttribute("repeatCount", params.repeatCount);
            if (params.fill) anim.setAttribute("fill", params.fill);
            if (params.id) anim.setAttribute("id", params.id);
            
            if (params.begin == 'animation id start' || params.begin == 'animation id end') {
                var beginOrEnd:string = "begin";
                if (params.begin == 'animation id end') {
                    beginOrEnd = "end";
                }
                
                if (params.beginExtend.indexOf(" ") != -1){
                    var extedtedParts:Array<string> = params.beginExtend.split(" ");
                    anim.setAttribute("begin",extedtedParts[0]+"."+beginOrEnd+"+"+extedtedParts[1]);
                } else {
                    anim.setAttribute("begin",params.beginExtend+"."+beginOrEnd);
                }
            } else if (params.beginExtend){
                anim.setAttribute("begin",params.begin+"+"+params.beginExtend);
            } else {
                anim.setAttribute("begin",params.begin);
            }
            if(!Utils.detectFirefox()) anim.beginElement();
            selEl.element.appendChild(anim);
        });
        LayerList.instance.getSelectedElements().forEach(selEl => {
            selEl.deselect();
            selEl.removeClickHandles(); //to prevent animation start and element select collision
        });
    }
    
    private popupCloseHandler(e:CustomEvent):void{
        this.addAnimation(e.detail);
    }
}