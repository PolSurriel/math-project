import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class ParenthesisElement extends MathExpressionElement{

    expression : MathExpression

    isParenthesis : boolean = true;

    constructor(expression : MathExpression = null){
        super();
        this.expression = expression;
    }

}
