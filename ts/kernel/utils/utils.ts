enum ERemove {
    remove_all,
    remove_selected
}

class Utils{
    public static detectFirefox():boolean {
        if(window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ){
            return true;
        }else{
            return false;
        } 
    }
    
    public static convertPointListToString(points: Array<Point>): string {
        var pointString: string = "";
        points.forEach(function (point: Point) {
            pointString += point.x + "," + point.y + " ";
        });
        pointString = pointString.trim();
        return pointString;
    }
    
    public static dispatchEditingStop(details:any = null):void{
        var createNewEnd:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        createNewEnd.initCustomEvent(SVGStage.EDITING_STOP, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewEnd);
    }
    
    public static dispatchEditingStart(details:any = null):void{
        var createNewStart:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        createNewStart.initCustomEvent(SVGStage.EDITING_START, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewStart);
    }
    
    public static dispatchCreatingEnd(details:any = null):void{
        var createNewEnd:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        createNewEnd.initCustomEvent(SVGStage.CREATING_END, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewEnd);
    }
    
    public static dispatchCreatingStart(details:any = null):void{
        var createNewStart:CustomEvent = <CustomEvent>document.createEvent('CustomEvent');
        createNewStart.initCustomEvent(SVGStage.CREATING_START, true, true, details);
        SVGStage.instance.mainStage.dispatchEvent(createNewStart);
    }
    
    // public static forceRedraw(element:Node):void{
    //     var parent:Node = element.parentNode;
    //     var clone:Node = element.cloneNode(true);
    //     
    //     parent.removeChild(element);
    //     
    //     console.log(clone);
    //     setTimeout(function() {
    //         parent.appendChild(clone); //TODO nezachova listenery
    //         SVGStage.instance.mainStage.appendChild(clone);
    //     }, 1000);
    // }
}