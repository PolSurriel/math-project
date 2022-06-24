import { Component, Input, OnInit } from '@angular/core';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { MathExpressionElement } from 'src/app/model/Math/MathExpressionElement';
import { SQRTElement } from 'src/app/model/Math/SQRTElement';

@Component({
  selector: 'math-expression',
  templateUrl: './math-expression.component.html',
  styleUrls: ['./math-expression.component.css']
})
export class MathExpressionComponent implements OnInit {

  expression : MathExpression

  constructor() { }

 @Input() tmpAutoGenSQRT : boolean = false;

  ngOnInit() {
    this.expression = new MathExpression();
    if(this.tmpAutoGenSQRT){
      console.log("added")
      this.expression.elements.push(new SQRTElement());
    }
  }

  public isSQRT(element : MathExpressionElement):boolean{
    return element instanceof SQRTElement; 
  }

}
