import { MathExpression } from "./MathExpression";
import { MathExpressionElement } from "./MathExpressionElement";

export class FracElement extends MathExpressionElement {
    
    nominator : MathExpression
    denominator : MathExpression

    constructor(nominator : MathExpression  = null, denominator : MathExpression = null){
        super();
        this.nominator = nominator;
        this.denominator = denominator;
    }

}
