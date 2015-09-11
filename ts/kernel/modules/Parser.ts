class SVGParser{
    
    private _mockParent:HTMLElement = document.createElement("div");
    private _text:string = '';
    private _tabs:Array<string> = [];
    private _firstCall:boolean = true;
    public popup:PopUpBase;
    
    constructor(){
        this.popup = new PopUpCode("SVG structure");
    }
    
    public showCode(element:Node, idToRemove?:string):void{
        this.clear();
        this.popup.showPopUp(this.parse(element, idToRemove));
    }
    
    private clear():void{
        this._text = '';
        this._firstCall = true;
    }
    
    public parse(element:Node, idToRemove?:string):string {
        if ((<HTMLElement>element).id == idToRemove) { //removing control points stores from SVG structure dump
            element.parentNode.removeChild(element);
            return '';
        } else {
            var elementClone:HTMLElement = <HTMLElement>element.cloneNode(false);
            this._mockParent.appendChild(elementClone);
            
            var elementType:string = element.nodeName.toLowerCase();
            if(elementType != 'g' || (<HTMLElement>element).id != "") { //removing (not writing) of element's parent 'g' elements
                if (!this._firstCall) {
                    this._tabs.push("\t");
                    this._text += "\n" + this._tabs.join('') + this._mockParent.innerHTML.substring(0, this._mockParent.innerHTML.indexOf("</"+elementType+">"));
                } else {
                    this._firstCall = false;
                    this._text += this._tabs.join('') + this._mockParent.innerHTML.substring(0, this._mockParent.innerHTML.indexOf("</"+elementType+">"));
                    this._text += "\n\t<title>Created by taansikirin's Free SVG Editor<title>";
                }
            }
            
            this._mockParent.removeChild(elementClone);
            
            if (element.childNodes.length) {
                for(var i=0; i<element.childNodes.length; i++){
                    this.parse(element.childNodes.item(i), idToRemove);
                }
            } else {
                this._text += "</"+elementType+">";
                this._tabs.pop();
                return this._text;
            }
        }
        if (elementType != 'g' || (<HTMLElement>element).id != "") { //removing (not writing) of element's parent 'g' elements
            this._text += "\n" + this._tabs.join('')+"</"+elementType+">";
            this._tabs.pop();
        }
        
        return this._text;
    }
}