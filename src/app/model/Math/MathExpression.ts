import { FracElement } from "./FracElement";
import { MathExpressionElement } from "./MathExpressionElement";
import { Separator } from "./Separator";
import { SQRTElement } from "./SQRTElement";

export class MathExpression {

    elements : Array<MathExpressionElement>;

    constructor(){
        this.elements = new Array<MathExpressionElement>();
    }

    public static getTestingMathExpression(): MathExpression{
        let result = MathExpression.getTestingMathExpressionWithoutFrac();

        let op = new MathExpressionElement()
        op.katex = "+"
        let frac = new FracElement();
        frac.nominator = MathExpression.getTestingMathExpressionWithoutSQRT();
        frac.denominator = MathExpression.getTestingMathExpressionWithoutSQRT();

        result.elements.push(op)
        result.elements.push(frac)

        return result;
    }

    public static getTestingMathExpressionWithoutFrac(): MathExpression{

        let result = MathExpression.getTestingMathExpressionWithoutSQRT();
        let op = new MathExpressionElement()
        op.katex = "+"
        result.elements.push(op)
        result.elements.push(new Separator)

        let sqrt = new SQRTElement()
        sqrt.expression = new MathExpression();
        let tmp = ["x", "+", "y^2"];
        sqrt.expression.elements.push(new Separator());
        for (let i = 0; i < tmp.length; i++) {
            let toAdd = new MathExpressionElement();
            toAdd.katex = tmp[i];
            sqrt.expression.elements.push(toAdd);
            sqrt.expression.elements.push(new Separator());
        }

        result.elements.push(new Separator())
        result.elements.push(sqrt)
        result.elements.push(new Separator())

        return result;

    }

    public static getTestingMathExpressionWithoutSQRT(): MathExpression{

        let result = new MathExpression();

        let tmp = ["a", "+", "b^2", "·", "c"];
        result.elements.push(new Separator());
        for (let i = 0; i < tmp.length; i++) {
            let toAdd = new MathExpressionElement();
            toAdd.katex = tmp[i];
            result.elements.push(toAdd);
            result.elements.push(new Separator());
        }
    
        return result;

    }

}
