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

  @Input() expression : MathExpression

  constructor() { }

  ngOnInit() {
    
  }

  public extractSQRTExpression(element :MathExpressionElement):MathExpression{
    return (element as SQRTElement).expression;
  }

  public isSQRT(element : MathExpressionElement):boolean{
    return element instanceof SQRTElement; 
  }

}
