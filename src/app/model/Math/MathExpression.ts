import { TestUtils } from "../test/TestUtils";
import { FracElement } from "./FracElement";
import { MathExpressionElement } from "./MathExpressionElement";
import { Separator } from "./Separator";
import { SQRTElement } from "./SQRTElement";

export class MathExpression {

    elements : Array<MathExpressionElement> = new Array<MathExpressionElement>();
    separators : Array<Separator> = new Array<Separator>();

    left : MathExpressionElement;
    right : MathExpressionElement;

    constructor(){

    }
    
    public static linkElementsToExpression(expression:MathExpression, root:MathExpression): void{
        let i = 0;
        for(var element of expression.elements) {
            element.root = root;
            element.expression = expression;

            if(element instanceof SQRTElement){
                MathExpression.linkElementsToExpression((element as SQRTElement).expression, root); 
                if(i!= 0){
                    (element as SQRTElement).expression.left = expression.elements[i-1];
                }
                if(i != expression.elements.length-1){
                    (element as SQRTElement).expression.right = expression.elements[i+1];
                }
                
            }else if(element instanceof FracElement){
                MathExpression.linkElementsToExpression((element as FracElement).nominator, root); 
                MathExpression.linkElementsToExpression((element as FracElement).denominator, root); 
                
                if(i != 0){
                    (element as FracElement).nominator.left = expression.elements[i-1];
                    (element as FracElement).denominator.left = expression.elements[i-1];
                }
                if(i != expression.elements.length-1){
                    (element as FracElement).nominator.right = expression.elements[i+1];
                    (element as FracElement).denominator.right = expression.elements[i+1];
                }
            }

            i++;
            
        }

    }

    public static generateMathExpression(elements : Array<MathExpressionElement>) : MathExpression {
        let result : MathExpression = new MathExpression();

        
        var last = new Separator();
        result.elements.push(last);
        result.separators.push(last);

        for(var element of elements){
            element.root = result;
            element.expression = result;

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

         MathExpression.linkElementsToExpression(result, result);

        return result;
    }

}
