import { TestUtils } from "../test/TestUtils";
import { FracElement } from "./FracElement";
import { MathExpressionElement } from "./MathExpressionElement";
import { Separator } from "./Separator";
import { SQRTElement } from "./SQRTElement";

export class MathExpression {

    elements : Array<MathExpressionElement> = new Array<MathExpressionElement>();
    separators : Array<Separator> = new Array<Separator>();

    constructor(){

    }
    
    public static generateMathExpression(elements : Array<MathExpressionElement>) : MathExpression {
        let result : MathExpression = new MathExpression();

        
        var last = new Separator();
        result.elements.push(last);
        result.separators.push(last);

        for(var element of elements){
            // add the item to the elements list
            result.elements.push(element);

            // connect with last
            last.right = element;
            element.left = last;

            // create a separator to element's right side
            let sep = new Separator();

            // connect the separator with the element
            element.right = sep;
            sep.left = element;

            // add the separator element
            result.elements.push(sep);
            result.separators.push(sep);

            // set separator as last
            last = sep;

            if(element instanceof SQRTElement){
                for(var sqrtsep of (element as SQRTElement).expression.separators){
                    result.separators.push(sqrtsep);
                }
            }

            if(element instanceof FracElement){
                for(var fracsep of (element as FracElement).nominator.separators){
                    result.separators.push(fracsep);
                }

                for(var fracsep of (element as FracElement).denominator.separators){
                    result.separators.push(fracsep);
                }
            }

        }

        return result;
    }

}
