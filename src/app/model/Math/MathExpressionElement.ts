export class MathExpressionElement {
    
    protected grabbable : boolean;
    public katex : string; 

    get isGrabbable (){
        return this.grabbable;
    }

}