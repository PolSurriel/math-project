import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class SQRTElement extends MathExpressionElement{

    expression : MathExpression

    isSQRT : boolean = true;

    constructor(){
        super();
        this.expression = new MathExpression();
    }

}
