class PopUpCode extends PopUpBase {
	private _codeSheet:HTMLTextAreaElement;
	
	constructor(titleText:string = '', initWidth:number = 800, initHeight:number = 400, top:number = 150, left:number = 100){
		super(titleText, initWidth, initHeight, top, left);
        
        this._codeSheet = document.createElement("textarea");
        this._codeSheet.id = "codeSheet";
        this._codeSheet.className = "popup-text-area";
        this._content.appendChild(this._codeSheet);
	}
	
	public showPopUp(content:string){
		super.showPopUp();
		if(!this.open){
            this._codeSheet.value = content;
        } else {
            this._codeSheet.value = content;
        }
	}
}