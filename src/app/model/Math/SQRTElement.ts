import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class SQRTElement extends MathExpressionElement{

    isSQRT : boolean = true;
    expression : MathExpression;

    constructor(expression : MathExpression = null){
        super();
        this.expression = expression;
    }

}
