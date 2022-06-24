import { MathExpressionElement } from "./MathExpressionElement";
import { Separator } from "./Separator";

export class MathExpression {

    elements : Array<MathExpressionElement>;

    constructor(){
        this.elements = new Array<MathExpressionElement>();
        
        let tmp = ["a", "+", "b^2", "·", "c"];
        for (let i = 0; i < tmp.length; i++) {
            let toAdd = new MathExpressionElement();
            toAdd.katex = tmp[i];
            this.elements.push(new Separator());
            this.elements.push(toAdd);
            this.elements.push(new Separator());
            
        }

    }


}
