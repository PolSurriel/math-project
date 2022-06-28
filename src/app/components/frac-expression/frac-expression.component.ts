import { Component, Input, OnInit } from '@angular/core';
import { MathExpression } from '../../model/Math/MathExpression';
import { MathExpressionComponent } from '../math-expression/math-expression.component';

@Component({
  selector: 'frac-expression',
  templateUrl: './frac-expression.component.html',
  styleUrls: ['./frac-expression.component.css']
})
export class FracExpressionComponent implements OnInit {

  @Input() nominator : MathExpression
  @Input() denominator : MathExpression
  @Input() root : MathExpressionComponent;

  constructor() { }

  ngOnInit() {
  }

}
