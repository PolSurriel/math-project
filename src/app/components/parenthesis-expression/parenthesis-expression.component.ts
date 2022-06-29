import { Component, Input, OnInit } from '@angular/core';
import { MathExpression } from 'src/app/model/Math/MathExpression';
import { MathExpressionComponent } from '../math-expression/math-expression.component';

@Component({
  selector: 'parenthesis-expression',
  templateUrl: './parenthesis-expression.component.html',
  styleUrls: ['./parenthesis-expression.component.css']
})
export class ParenthesisExpressionComponent implements OnInit {

  @Input() expression : MathExpression;
  @Input() root : MathExpressionComponent;


  constructor() { }

  ngOnInit() {
  }

}
